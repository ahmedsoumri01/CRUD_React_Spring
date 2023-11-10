import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [filterId, setFilterId] = useState('');

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('http://localhost:8080/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleDelete = (userId) => {
    // Send a request to delete the user
    axios.delete(`http://localhost:8080/users/${userId}`)
      .then(response => {
        console.log('User deleted successfully:', response.data);
        // Update the user list after deletion
        alert("User deleted successfully");
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        // Handle error
      });
  };

  const handleFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Fetch data for the specified user ID
    axios.get(`http://localhost:8080/users/${filterId}`)
      .then(response => {
        setUsers([response.data]); // Update the user list with the filtered user
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  };

  const handleClearFilter = () => {
    setFilterId('');
    // Fetch all users
    axios.get('http://localhost:8080/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <button className="bg-green-500 text-white py-2 px-4 mt-4 rounded m-4">
        <Link to="/adduser" className="text-white">Add New User</Link>
      </button>

      <form onSubmit={handleFilterSubmit} className="mb-4">
        <label htmlFor="filterId" className="block text-sm font-semibold mb-1">Filter by ID:</label>
        <div className="flex">
          <input
            type="text"
            id="filterId"
            value={filterId}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 ml-2 rounded">Filter</button>
        </div>
      </form>

      <button onClick={handleClearFilter} className="bg-yellow-500 text-white py-2 px-4 rounded mb-4">
        Clear Filter
      </button>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Password</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.userName}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.password}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`/users/${user.id}`} className="text-white bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 m-1">Edit</Link>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400 m-1"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
