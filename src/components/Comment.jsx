import React, { useContext } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import MyContext from "../MyContext";
import "./Comment.css";

const Comment = ({ user, text, createdAt }) => {
  const { dateFormat } = useContext(MyContext);
  const newDate = new Date(createdAt);
  const dateCreated = dateFormat(newDate);

  return (
    <ListGroup>
      <ListGroup.Item>
        <Row className="fst-italic border-bottom border-light">
          <Col className="fw-bold">{user}</Col>
          <Col className="text-end smaller">{dateCreated}</Col>
        </Row>
        <div className="fs-6">{text}</div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Comment;
