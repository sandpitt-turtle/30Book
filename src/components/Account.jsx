import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckedOutBooks from "./CheckedOutBooks";
import { Link } from "react-router-dom";

export default function Account({ user, setUser, setToken }) {
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  console.log("📌 Account component rendered. User:", user);

  useEffect(() => {
    if (!user?.id) {
      console.log("🚨 No user ID found, redirecting to login...");
      navigate("/login");
      return;
    }
  
    const fetchCheckedOutBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("⚠️ No token found in local storage. Logging out user...");
          setUser(null);
          setToken(""); 
          navigate("/login");
          return;
        }
  
        const apiUrl = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations`;
        console.log("🔍 Fetching checked-out books from:", apiUrl);
  
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          console.error(`🚨 API request failed! Status: ${response.status} - ${response.statusText}`);
          throw new Error(`Failed to fetch checked-out books. Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("📚 Checked-out books response:", data);
  
        if (!data.reservation || data.reservation.length === 0) {
          console.log("✅ You have no books checked out.");
          setCheckedOutBooks([]); 
        } else {
          console.log("🎉 You HAVE checked-out books!", data.reservation);
          setCheckedOutBooks(data.reservation); // Store books properly
        }
      } catch (error) {
        console.error("❌ Error fetching books:", error);
      }
    };
  
    fetchCheckedOutBooks();
  }, [user?.id, navigate, setUser, setToken]);
  

  const handleLogout = () => {
    console.log("👋 Logging out user...");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    navigate("/books");
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <h1 className="account-manage-title">Manage Your Account</h1>

        <div className="account-section">
          <div className="section-header">
            <h3>myBookBuddy</h3>
          </div>
          <div className="info-cont">
            <p className="user-label">Email</p>
            <p className="user-value">{user?.email || "N/A"}</p>
            <p className="user-label">Password</p>
            <p className="user-value">{"*".repeat(8)}</p> 
          </div>
          <Link to="#" className="account-link-buddy">
            <span className="shiny-text">Manage myBookBuddy</span>
          </Link>
        </div>

        <div className="account-section">
          <div className="section-header">
            <h3>Your Books</h3>
          </div>
          <div className="checked-books-container">
            <p className="check-title">Checked-Out Books</p>
            <Link
              to="#"
              className="view-books-btn"
              onClick={() => {
                console.log("📖 View Books button clicked. ShowPopup:", !showPopup);
                setShowPopup(true);
              }}
            >
              View Books
            </Link>
          </div>
          {showPopup && (
            <>
              <CheckedOutBooks
                checkedOutBooks={checkedOutBooks}
                onClose={() => {
                  console.log("❌ Closing the checked-out books popup.");
                  setShowPopup(false);
                }}
              />
            </>
          )}
        </div>

        <Link to="#" className="logout-link" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
}
