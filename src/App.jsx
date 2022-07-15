import React, { useContext } from "react";
import MyContext from "./MyContext";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  const { logUser } = useContext(MyContext);

  return (
    <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route path="/register" element={<Register logUser={logUser} />} />
      <Route path="/login" element={<Login logUser={logUser} />} />
    </Routes>
  );
}

export default App;
