import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckedOutBooks from "./CheckedOutBooks";

export default function Account({ user, setUser }) {
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchCheckedOutBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          navigate("/login");
          return;
        }

        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/${user.id}/checked-out-books`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch checked-out books");

        const data = await response.json();
        setCheckedOutBooks(data.books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchCheckedOutBooks();
  }, [user?.id, navigate, setUser]);

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);  
  
   
    navigate("/books", { replace: true }); 
  };
  

  return (
    <div className="account-container">
      <h2>Account Details</h2>
      <ul>
        <li><b>Username:</b> {user?.username || "N/A"}</li>
        <li><b>Email:</b> {user?.email || "N/A"}</li>
      </ul>

      <button onClick={() => setShowPopup(true)}>View Checked-Out Books</button>

      {showPopup && (
        <CheckedOutBooks
          checkedOutBooks={checkedOutBooks}
          onClose={() => setShowPopup(false)}
        />
      )}

      <button onClick={handleLogout} className="nav-button">Logout</button>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}
