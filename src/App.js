import React from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Bills from "./Pages/Bills";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/bills" element={<Bills />} />

    </Routes>
  </BrowserRouter>
  );
};
export default App;