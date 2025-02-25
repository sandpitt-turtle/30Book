import { useState, useEffect } from "react";

export default function LoginForm({ isVisible, setIsVisible }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id === "form_pop") setIsVisible(false);
    };
    
    if (isVisible) document.body.addEventListener("click", handleOutsideClick);
    return () => document.body.removeEventListener("click", handleOutsideClick);
  }, [isVisible, setIsVisible]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.success) {
        localStorage.setItem("token", result.token);
        alert("Login successful!");
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isVisible) return null;

  return (
    <div id="form_pop" className="overlay active">
      <div className="popup">
        <span onClick={() => setIsVisible(false)} className="close">&times;</span>
        <div className="login-container">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email:</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
