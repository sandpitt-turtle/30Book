import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"; 
import Books from "./components/AllBooks";
import Login from "./components/Login";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook"; 
import Account from "./components/Account"; 
import './scss/App.scss'; 
// import './index.css';


function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const isAuthenticated = !!token;

  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Navigation 
            isAuthenticated={isAuthenticated} 
            setUser={setUser} 
            setToken={setToken} 
            onSearch={setSearchTerm} 
          />
          <main>
            <Routes>
              <Route path="/" element={<Books isAuthenticated={isAuthenticated} searchTerm={searchTerm} />} />
              <Route path="/books" element={<Books isAuthenticated={isAuthenticated} searchTerm={searchTerm} />} />
              <Route path="/books/:bookId" element={<SingleBook isAuthenticated={isAuthenticated} />} />
              <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
              <Route path="/register" element={<Register setToken={setToken} setUser={setUser} />} />
              <Route path="/account" element={isAuthenticated ? <Account user={user} /> : <Navigate to="/login" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}


export default App;


//