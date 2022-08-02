import React, { useState, useEffect } from "react";
import MyContext from "./MyContext";
import axios from "axios";

const MyProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );
  const [feedbacks, setFeedbacks] = useState([]);
  const [comments, setComments] = useState([]);

  const logUser = async (email, password) => {
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
      setIsLoggedIn(true);
      setUser(user);
    }
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const dateFormat = (date) => {
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

  const addFeedback = async ({ user, text, label }) => {
    const newFeedback = await axios.post(
      "http://localhost:8080/feedbacks/add",
      { user, text, label }
    );
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  const addComment = async ({ feedback_id, user, text }) => {
    const newComment = await axios.post("http://localhost:8080/comments/add", {
      feedback_id,
      user,
      text,
    });
    setComments([...comments, newComment]);
  };

  const state = {
    isLoggedIn,
    user,
    feedbacks,
    comments,
    setFeedbacks,
    logUser,
    logOut,
    dateFormat,
    addFeedback,
    addComment,
  };

  useEffect(() => {
    const getAllFeedbacks = async () => {
      const { data: allFeedbacks } = await axios(
        "http://localhost:8080/feedbacks/all"
      );
      allFeedbacks.map((feedback) => {
        feedback.user = feedback.user.name;
        feedback.comments = feedback.comments.length;
        return allFeedbacks;
      });
      setFeedbacks([...allFeedbacks]);
    };
    const getAllComments = async () => {
      const { data: allComments } = await axios(
        "http://localhost:8080/comments/all"
      );
      setComments([...allComments]);
    };
    getAllFeedbacks();
    getAllComments();
  }, [feedbacks.length, comments.length]);

  return (
    <MyContext.Provider value={state}>{props.children}</MyContext.Provider>
  );
};

export default MyProvider;
