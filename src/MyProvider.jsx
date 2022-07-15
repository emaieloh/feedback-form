import React, { Component } from "react";
import MyContext from "./MyContext";
import axios from "axios";

class MyProvider extends Component {
  logUser = async (email, password) => {
    const { data: user } = await axios.post(
      "http://localhost:8080/users/login",
      {
        email,
        password,
      }
    );
    if (user.error) {
      alert("Invalid email/password");
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      this.setState({
        user,
        isLoggedIn: true,
      });
    }
  };

  logOut = () => {
    localStorage.removeItem("user");
    this.setState({ isLoggedIn: false });
  };

  dateFormat = (date) => {
    const padTo2Digits = (num) => {
      return num.toString().padStart(2, "0");
    };

    const formattedDate = [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("-");

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const midnight = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${padTo2Digits(hours)}:${padTo2Digits(
      minutes
    )} ${midnight}`;

    return `${formattedDate} ${formattedTime}`;
  };

  addFeedback = async ({ user, text, label }) => {
    const newFeedback = await axios.post(
      "http://localhost:8080/feedbacks/add",
      { user, text, label }
    );
    const feedbacks = [newFeedback, ...this.state.feedbacks];
    this.setState({ feedbacks });
  };

  addComment = async ({ feedback_id, user, text }) => {
    const newComment = await axios.post("http://localhost:8080/comments/add", {
      feedback_id,
      user,
      text,
    });
    const feedbacks = [...this.state.feedbacks];
    feedbacks.map((feedback) => {
      if (feedback._id === feedback_id) {
        feedback.comments.push(newComment);
      }
      return feedback;
    });
    this.setState({ feedbacks });
  };

  state = {
    isLoggedIn: localStorage.getItem("user") ? true : false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    feedbacks: [],
    logUser: this.logUser,
    logOut: this.logOut,
    dateFormat: this.dateFormat,
    addFeedback: this.addFeedback,
    addComment: this.addComment,
  };

  async componentDidMount() {
    const { data: feedbacks } = await axios(
      "http://localhost:8080/feedbacks/all"
    );
    this.setState({ feedbacks });
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
