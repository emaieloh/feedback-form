import React, { useState } from "react";
import { Container, Form, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddFeedback = ({ addFeedback, user: { _id } }) => {
  const [text, setText] = useState("");
  const [label, setLabel] = useState("Choose category");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (label === "Choose category") {
      alert("Choose a category");
    } else {
      const feedback = {
        user: _id,
        text,
        label,
      };
      await addFeedback(feedback);
      navigate("/");
    }
  };

  return (
    <Container className="mt-5 pt-5">
      <Form onSubmit={submitHandler}>
        <Form.Group className="text-end">
          <Dropdown className="my-1">
            <Dropdown.Toggle>{label}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setLabel("feature_request")}>
                Feature Request
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setLabel("bug_report")}>
                Bug Report
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Your feedback here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </Form.Group>
        <div className="text-center my-1">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddFeedback;
