import React, { useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import MyContext from "../MyContext";

const CommentsModal = (props) => {
  const {
    commentsModal,
    hideModal,
    commentContent,
    setCommentContent,
    feedback_id,
  } = props;

  const {
    addComment,
    user: { name },
  } = useContext(MyContext);

  const submitHandler = async () => {
    if (!commentContent) {
      alert("Comment box can't be empty");
    } else {
      const comment = {
        feedback_id,
        text: commentContent,
        user: name,
      };
      await addComment(comment);
      hideModal();
    }
  };

  return (
    <Modal
      show={commentsModal}
      onHide={hideModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Your comment here..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={submitHandler}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentsModal;
