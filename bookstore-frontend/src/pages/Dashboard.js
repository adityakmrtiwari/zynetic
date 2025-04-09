import React, { useState } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(Date.now());
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h1 className="dashboard-heading">📖 Bookstore Dashboard</h1>

      <div className="form-wrapper">
        <BookForm
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          onBookSaved={() => setFetchTrigger(Date.now())}
        />
      </div>

      <div className="list-wrapper">
        <BookList
          setSelectedBook={setSelectedBook}
          fetchTrigger={fetchTrigger}
        />
      </div>
    </div>
  );
};

export default Dashboard;
