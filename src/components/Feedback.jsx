import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Comments from "./Comments";
import MyContext from "../MyContext";
import "./Feedback.css";

const Feedback = ({ id, label, text, user, comments, createdAt }) => {
  const { dateFormat } = useContext(MyContext);
  const newDate = new Date(createdAt);
  const dateCreated = dateFormat(newDate);

  return (
    <Container className="feedback px-3 py-1 rounded-3 mb-1 w-100">
      <Row className="fst-italic border-bottom border-light py-1">
        <Col className="fw-bold">{user}</Col>
        <Col className="text-end date">{dateCreated}</Col>
      </Row>
      <div className="fs-4 py-1">{text}</div>
      <div className="label text-end fst-italic my-2">{label}</div>
      <Comments feedback_id={id} commentsLength={comments} />
    </Container>
  );
};

export default Feedback;
