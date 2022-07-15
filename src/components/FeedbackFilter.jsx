import React from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { useNavigate, Routes, Route } from "react-router-dom";
import Feedbacks from "./Feedbacks";
import "./FeedbackFilter.css";

const FeedbackFilter = ({ feedbacks }) => {
  const featureRequest = feedbacks.filter((feedback) => {
    return feedback.label === "feature_request";
  });
  const bugReport = feedbacks.filter((feedback) => {
    return feedback.label === "bug_report";
  });
  const navigate = useNavigate();

  return (
    <Container className="mt-5 pt-5 feedback-filter">
      <Row>
        <Col>
          <h2>Feedbacks</h2>
        </Col>
        <Col>
          <Dropdown className="text-end">
            <Dropdown.Toggle id="dropdown-basic">Filter</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/feature_request")}>
                Feature Request
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/bug_report")}>
                Bug Report
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Routes>
        <Route path="/" element={<Feedbacks feedbacks={feedbacks} />} />
        <Route
          path="/feature_request"
          element={<Feedbacks feedbacks={featureRequest} />}
        />
        <Route
          path="/bug_report"
          element={<Feedbacks feedbacks={bugReport} />}
        />
      </Routes>
    </Container>
  );
};

export default FeedbackFilter;
