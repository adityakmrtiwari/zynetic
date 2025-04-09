import React from 'react';
import { Link } from 'react-router-dom';
import './Page.css';

function Home() {
  return (
    <div className="container">
      <h1>Welcome to Bookstore 📚</h1>
      <p>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Home;