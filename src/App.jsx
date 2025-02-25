import React, { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Books from "./components/AllBooks";
import Login from "./components/Login";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook"; 
import Account from "./components/Account"; 
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
        <Route path="/account" element={<Account setToken={setToken}/> } />
      </Routes>
    </Router>
  );
}

export default App;
