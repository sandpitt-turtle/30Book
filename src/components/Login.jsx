import { useState } from "react";

export default function Login({ setToken, setUser }) {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
  
      const data = await response.json();
      console.log("Login API Response:", data); // Debugging
  
      if (!data.token) throw new Error("Login failed: No token received");
  
      localStorage.setItem("token", data.token);
      setToken(data.token);
  
      // Fetch user details using the token
      const userResponse = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const userData = await userResponse.json();
      console.log("Fetched User Data:", userData); // Debugging
  
      if (!userData || !userData.id) throw new Error("Failed to fetch user data");
  
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      alert("Login successful!");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    }
  };
  
  
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className ="login-button">Login</button>
      </form>
    </div>
  );
}
