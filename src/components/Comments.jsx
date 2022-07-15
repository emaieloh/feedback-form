import React, { useState } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import CommentsModal from "./CommentsModal";
import Comment from "./Comment";
import "./Comments.css";

const Comments = ({ feedback_id, comments }) => {
  const [commentsModal, setCommentsModal] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const showModal = () => setCommentsModal(true);
  const hideModal = () => setCommentsModal(false);

  const feedbackComments = comments.map((comment) => {
    const { _id, user, text, createdAt } = comment;
    return <Comment key={_id} user={user} text={text} createdAt={createdAt} />;
  });

  return (
    <Container className="bg-light rounded-3">
      <Row>
        <Col className="fst-italic text-primary">
          Comments: {comments.length}
        </Col>
        <Col
          className="fst-italic text-primary text-end commentsBtn"
          onClick={showModal}
        >
          Add a comment
        </Col>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <span className="fst-italic text-primary">
                Show/Hide comments
              </span>
            </Accordion.Header>
            <Accordion.Body>
              {!comments.length ? "No comments" : feedbackComments}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      <CommentsModal
        commentsModal={commentsModal}
        hideModal={hideModal}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
        feedback_id={feedback_id}
      />
    </Container>
  );
};

export default Comments;
