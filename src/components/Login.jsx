import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ logUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await logUser(email, password);
    navigate("/", { replace: true });
  };

  return (
    <div id="container" className="size bg-primary d-flex align-items-center">
      <Form onSubmit={submitHandler} className="bg-light rounded-3">
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button type="submit" className="my-1">
            Login
          </Button>
        </div>
        <div className="text-center small pb-1">
          Do not have an account yet? Click <Link to="/register">here</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
