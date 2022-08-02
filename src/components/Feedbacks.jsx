import React from "react";
import Feedback from "./Feedback";

const Feedbacks = ({ feedbacks }) => {
  const filteredFeedbacks = feedbacks.map((feedback) => {
    const { _id, label, text, user, comments, createdAt } = feedback;
    return (
      <Feedback
        key={_id}
        id={_id}
        label={label}
        text={text}
        user={user}
        comments={comments}
        createdAt={createdAt}
      />
    );
  });
  return <div>{filteredFeedbacks}</div>;
};

export default Feedbacks;
