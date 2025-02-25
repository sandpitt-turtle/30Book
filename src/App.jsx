import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import bookLogo from './assets/books.png';
import Books from './components/Books';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <h1>
        <img id="logo-image" src={bookLogo} alt="Logo" />
        Library App
      </h1>

      <p>Hello</p>

      <Routes>
        <Route path="/books" element={<Books />} />
  
      </Routes>
    </Router>
  );
}

export default App;
