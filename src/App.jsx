import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Books from "./components/Books";
import './App.css'


function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Books />} />  {/* Ensure there's a route for "/" */}
        <Route path="/books" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;
