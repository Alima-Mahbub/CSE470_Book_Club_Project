import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Home = () => {
  return (
    <div className="container text-center">
      <h1>Welcome to Book Club</h1>
      <p>Your gateway to discovering and sharing books with friends.</p>
      <Link to="/signup" className="btn btn-custom m-2">Sign Up</Link>
      <Link to="/login" className="btn btn-custom m-2">Login</Link>
    </div>
  );
};

export default Home;
