import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Adminspace.css';
import image from '../../assets/avatar.jpg';
import axiosInstance from '../../axiosInstance';  // Import axiosInstance
import ViewUser from '../ViewUser/Viewuser';
import EditWorker from '../editUser/EditUser';
import { useAuthContext } from '../../hooks/useAuthContext';

// Department mapping


const Adminspace = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`api/admin-space/${user._id}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [user._id]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`api/admin-space/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='Admin-space mt-5'>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="row">
              {users.map(user => (
                <div key={user._id} className="card col-lg-3 mb-3">
                  <img src={user.image ? user.image : image} className='card-img-top' alt={user.username} />
                  <div className='card-body'>
                    <h5 className='card-title'>{user.username}</h5>
                    <p className='department card-text'>Department: {user.department}</p>
                    <div className='actions d-flex justify-content-between'>
                      <Link to={`/worker/admin-space/view/${user._id}`} className="action btn btn-success">View</Link>
                      <Link to={`/worker/admin-space/edit/${user._id}`} className="action btn btn-primary">Edit</Link>
                      <button onClick={() => handleDelete(user._id)} className="action btn btn-danger">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        />

        <Route path="edit/:id" element={<EditWorker />} />

        <Route path="view/:id" element={<ViewUser />} />
      </Routes>
    </div>
  );
};

export default Adminspace;
