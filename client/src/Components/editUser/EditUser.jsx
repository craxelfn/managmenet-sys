import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance.js';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';
import Erreur from '../Erreur/Erreur.jsx';
import './EditUser.css';
import Uploadimage from '../uploadimage/Uploadimage.jsx';
import image from '../../assets/avatar.jpg';


const EditUser = () => {
  
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: '',
    department: '',
    manager: '',
    salary: '',
    contractEndTime: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get(`http://localhost:8000/api/users/${id}`)
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("There was an error fetching the user data!");
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('role', userData.role);
    formData.append('department', userData.department);
    formData.append('manager', userData.manager);
    formData.append('salary', userData.salary);
    formData.append('contractEndTime', userData.contractEndTime);
    if (file) {
      formData.append('image', file);
    }

    axiosInstance.put(`http://localhost:8000/api/users/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        navigate(`/users/${id}`);
      })
      .catch(error => {
        setError("There was an error updating the user data!");
      });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Erreur message={error} />;
  }
  return (
    <div className="content">
      <div className="row mt-2 p-2">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile">
                  <div className="user-avatar">
                    <img src={userData.image || image } className='img-fluid w-100' alt="User Avatar" />
                  </div>
                  <Uploadimage onFileChange={handleFileChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='userdata col-xl-9 col-lg-9 col-md-12 col-sm-14 col-12'>
          <div className='add-worker'>
            <h1 className='text-center mb-3'>Edit Information of User:</h1>
            <form className='inputs-form w-100' onSubmit={handleSubmit}>
              <div className="row ps-3">
               
                <input 
                  type="text" 
                  className='form-control mb-3' 
                  placeholder='Username' 
                  name="username" 
                  value={userData.username} 
                  onChange={handleInputChange} 
                />
                <input 
                  type="email" 
                  className='form-control mb-3' 
                  placeholder='Email' 
                  name="email" 
                  value={userData.email} 
                  onChange={handleInputChange} 
                />
                <select 
                  className="custom-select col-lg-6 p-1 mb-3" 
                  name="role" 
                  value={userData.role} 
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Role</option>
                  <option value="1">stagaire</option>
                  <option value="2">worker</option>
                </select>
                <select
                  className="custom-select col-lg-6 p-1 mb-3"
                  name="department"
                  value={userData.department}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Department</option>
                  <option value="1">Flight Operations</option>
                  <option value="2">Cabin Crew & In-Flight Services</option>
                  <option value="3">Ground Operations</option>
                  <option value="4">Maintenance & Engineering</option>
                  <option value="5">Safety & Security</option>
                  <option value="6">Sales & Marketing</option>
                  <option value="7">Cargo Operations</option>
                  <option value="8">Finance & Accounting</option>
                  <option value="9">Human Resources</option>
                  <option value="10">Information Technology</option>
                  <option value="11">Legal & Compliance</option>
                  <option value="12">Procurement & Supply Chain</option>
                  <option value="13">Corporate Strategy & Planning</option>
                  <option value="14">Training & Development</option>
                </select>
                <p>bureau: </p>
                <input 
                  type="text" 
                  className='form-control mb-3' 
                  placeholder='Department' 
                  name="department" 
                  value={userData.bureau || "aucun bureau "} 
                  onChange={handleInputChange} 
                />
                {/* <input 
                  type="text" 
                  className='form-control mb-3' 
                  placeholder='Manager' 
                  name="manager" 
                  value={userData.encadrant} 
                  onChange={handleInputChange} 
                /> */}
                <p>salaire: </p>
                <input 
                  type="number" 
                  className='form-control mb-3' 
                  placeholder='Salary' 
                  name="salary" 
                  value={userData.salaire} 
                  onChange={handleInputChange} 
                />
                <p>date fin contrat : { userData.dure } modifier la date si tu veut : </p>
                <input 
                  type="date" 
                  className='form-control mb-3' 
                  placeholder='Contract End Time' 
                  name="contractEndTime" 
                  value={userData.dure} 
                  onChange={handleInputChange} 
                />
                <input type="submit" className='btn btn-primary mx-auto mt-4' value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
