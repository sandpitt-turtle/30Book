import React, { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Books from "./components/AllBooks";
import Login from "./components/Login";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";  
import './App.css'

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Books />} />  
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<SingleBook />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
