import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllUsers from "./pages/AllUsers";
import EditUser from "./pages/EditUser";
import AddUser from './pages/AddUser';
function App() {
  return (
    <>
      <Routes>
       {/*  <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<AllUsers />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/users/:id" element={<EditUser />} />
       
      </Routes>
    </>
  );
}

export default App;
