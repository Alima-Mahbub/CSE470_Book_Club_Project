import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css'; // Correct path to the styles.css file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth', formData);
      console.log(res.data);
      navigate('/profile'); // Redirect to profile page after successful login
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="text-center">Login</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-custom btn-block">Login</button>
      </form>
    </div>
  );
};

export default Login;
