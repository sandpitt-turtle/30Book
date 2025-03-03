import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export default function Register({ setToken, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setError(null);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setToken(result.token);
        setUser(result.user);
        alert("Registration successful! You are now logged in.");

        navigate("/account");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-page">
         <div className="logo-wrapper">
            <Link to="/books" className="lognav-logo">BookBuddy</Link>
          </div>
    <div className="register-container">

    <div className= "my-book">
        <h3>myBookBuddy</h3>
        </div>

    <div className="inner-content">
    <div className="logreg-title">
      <h2> Register </h2>
   
      {error && <p className="error-message">{error}</p>}
      </div>
      <div className= "login-instr">
          <h4>Enter your email and set a password to create your BookBuddy account.</h4>
          </div>



      
      <form className="register-form" onSubmit={handleSubmit}>


        <div className="log-input-group">

       

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />

          <input
            type="password"

            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
   r
            placeholder="Set password"
          />
        </div>
        
        
        <button type="submit" className="reg-button">Register</button>
      </form>
      </div>
    </div>
    </div>
  );
}
