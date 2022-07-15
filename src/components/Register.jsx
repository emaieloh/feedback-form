import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ logUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPasswordError, setMatchPasswordError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMatchPasswordError("Passwords must match");
    } else {
      await axios.post("http://localhost:8080/users/register", {
        name,
        email,
        password,
      });
      await logUser(email, password);
      navigate("/", { replace: true });
    }
  };

  return (
    <div id="container" className="size bg-primary d-flex align-items-center">
      <Form onSubmit={submitHandler} className="bg-light rounded-3">
        <Form.Group>
          <Form.Control
            type="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
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
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Form.Text>{matchPasswordError}</Form.Text>
        </Form.Group>
        <div className="text-center">
          <Button type="submit" className="my-1">
            Register
          </Button>
        </div>
        <div className="text-center small pb-1">
          Already registered? Click <Link to="/login">here</Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
