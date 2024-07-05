import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import '../styles.css'; // Correct path to the styles.css file

const Profile = () => {
  const { loadUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    profilePhoto: '',
    booksRead: 0,
    reviewsWritten: 0,
    followers: 0,
  });

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profilePhoto: '',
  });

  useEffect(() => {
    loadUser();
    axios
      .get('/api/users/getUserProfile')
      .then((res) => {
        setProfile(res.data);
        setFormData({
          name: res.data.name,
          bio: res.data.bio,
          profilePhoto: res.data.profilePhoto,
        });
      })
      .catch((err) => console.log(err));
  }, [loadUser]);

  const { name, bio } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('bio', bio);
    if (e.target.profilePhoto.files[0]) {
      formDataToSend.append('profilePhoto', e.target.profilePhoto.files[0]);
    }
    axios
      .put('/api/users/editUserProfile', formDataToSend)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile-container">
      <h1 className="text-center">Profile</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <input type="text" className="form-control" name="bio" value={bio} onChange={onChange} />
        </div>
        <div className="form-group">
          <label>Profile Photo</label>
          <input type="file" className="form-control-file" name="profilePhoto" />
        </div>
        <button type="submit" className="btn btn-custom btn-block">Save</button>
      </form>
      <div className="text-center mt-4">
        <img src={`/${profile.profilePhoto}`} alt="Profile" className="profile-photo" />
        <p>Books Read: {profile.booksRead}</p>
        <p>Reviews Written: {profile.reviewsWritten}</p>
        <p>Followers: {profile.followers}</p>
      </div>
    </div>
  );
};

export default Profile;
