import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function AddUser() {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a request to create a new user
    axios.post('http://localhost:8080/users', user)
      .then(response => {
        console.log('User added successfully:', response.data);
        alert("User added successfully");
        setUser({
          userName: '',
          email: '',
          password: ''
        });
        // Handle success, e.g., redirect to user list page
      })
      .catch(error => {
        console.error('Error adding user:', error);
        // Handle error
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
        <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded m-4">
        <Link to="/" className="text-white">Home</Link>
        </button>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-semibold mb-1">Username:</label>
          <input type="text" id="userName" name="userName" value={user.userName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">Email:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-1">Password:</label>
          <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Add User</button>
      </form>
    </div>
  );
}
