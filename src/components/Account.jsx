import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckedOutBooks from "./CheckedOutBooks";
import { Link } from "react-router-dom";

export default function Account({ user, setUser, setToken }) {
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
          setToken(""); 
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
  }, [user?.id, navigate, setUser, setToken]);

  const handleLogout = () => {
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
    <p className="user-value">{"*".repeat(8)}</p> {/* Masked password */}
  </div>
  <Link to="#" className="account-link-buddy">Manage myBookBuddy</Link>
</div>


       
<div className="account-section">
  <div className="section-header">
            <h3>Your Books</h3>
            </div>

  
            <div className="checked-books-container">
    <p className="check-title">Checked-Out Books</p>
    <Link to="#" className="view-books-btn" onClick={() => setShowPopup(true)}>
      View Books
    </Link>
  </div>
          {showPopup && <CheckedOutBooks checkedOutBooks={checkedOutBooks} onClose={() => setShowPopup(false)} />}
        </div>


        {/* <div className="account-section">
          <div className="section-header">
            <h3>Your Plans</h3>
          </div>
          <h2 className="section-title">Your Subscription</h2>
          <p className="subscription-plan">Basic Membership</p>
          <Link to="#" className="account-link">Manage Subscription</Link>
        </div>

  
        <div className="account-section">
           <div className="section-header">
             <h3>Access & Security</h3>
          </div>
          <h2 className="section-title">Security</h2
          <Link to="#" className="account-link">Manage Devices</Link> 
         */}
         
          <Link to="#" className="logout-link" onClick={handleLogout}>Logout</Link>
    

  
        {/* <div className="account-footer">
          <p><Link to="#">Need help? Visit our Help Center</Link></p>
          <p><Link to="#">Want to delete your account? Learn More</Link></p>
        </div> */}

      </div>
    </div>

  );
}
