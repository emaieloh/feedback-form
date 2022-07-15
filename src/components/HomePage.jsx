import React, { useContext } from "react";
import MyContext from "../MyContext";
import { Navigate, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import FeedbackFilter from "./FeedbackFilter";
import AddFeedback from "./AddFeedback";

const HomePage = () => {
  const { isLoggedIn, user, logOut, feedbacks, addFeedback } = useContext(
    MyContext
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <Container>
      <NavigationBar user={user} logOut={logOut} />
      <Routes>
        <Route path="/*" element={<FeedbackFilter feedbacks={feedbacks} />} />
        <Route
          path="/make-a-feedback"
          element={<AddFeedback user={user} addFeedback={addFeedback} />}
        />
      </Routes>
    </Container>
  );
};

export default HomePage;
