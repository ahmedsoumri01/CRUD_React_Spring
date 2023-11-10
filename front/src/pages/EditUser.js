import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function EditUser() {
  const { id } = useParams();

  const [user, setUser] = useState({
    id: '',
    userName: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts
    axios.get(`http://localhost:8080/users/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to update the user data
    axios.put('http://localhost:8080/users', user)
      .then(response => {
        console.log('User updated successfully:', response.data);
        alert("User updated successfully");
        // Handle success, e.g., redirect to user list page
      })
      .catch(error => {
        console.error('Error updating user:', error);
        // Handle error
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded m-4">
        <Link to="/" className="text-white">Home</Link>
      </button>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-semibold mb-1">ID:</label>
          <input type="text" id="id" value={user.id} disabled className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-semibold mb-1">Username:</label>
          <input type="text" id="userName" name="userName" value={user.userName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">Email:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="flex justify-between items-center block text-sm font-semibold mb-1">
            Password:
            <p
              className="cursor-pointer text-blue-500 hover:underline"
              onClick={handleTogglePassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </p>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Update User</button>
      </form>
    </div>
  );
}
