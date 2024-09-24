import React, { useEffect, useState } from 'react';
import './viewuser.css';
import axiosInstance from '../../axiosInstance.js';
import { useParams } from 'react-router-dom';
import Erreur from '../Erreur/Erreur.jsx';
import Loader from '../Loader/Loader.jsx';
import image from '../../assets/avatar.jpg';


const Viewuser = () => {
  const { id } = useParams();  // Adjust to match the route parameter
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (id) { // Ensure that id is not null
      axiosInstance.get(`/api/users/${id}`)
        .then(response => {
          setUserData(response.data);
          setLoading(false); 
        })
        .catch(error => {
          setError("There was an error fetching the user data!");
          setLoading(false); 
        });
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Erreur message={error} />;
  }

  return (
    <div className="container">
      <div className="panel-body">
        <div className="row">
          <div className="col-lg-6">
            <img 
              alt="User Avatar" 
              title="User Avatar" 
              className="avatar w-100 h-100" 
              src={userData.image || image} 
            />
          </div>
          <div className="col-lg-6">
            <strong>Information</strong><br />
            <div className="table-container">
              <table className="user-information">
                <tbody>
                  <tr>
                    <td><strong>Identification</strong></td>
                    <td className="text-primary">{userData._id}</td>
                  </tr>
                  <tr>
                    <td><strong>Name</strong></td>
                    <td className="text-primary">{userData.username}</td>
                  </tr>
                  <tr>
                    <td><strong>Email</strong></td>
                    <td className="text-primary">{userData.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Phone</strong></td>
                    <td className="text-primary">{userData.phone || 'Not available'}</td>
                  </tr>
                  <tr>
                    <td><strong>Department</strong></td>
                    <td className="text-primary">{userData.department || 'Not assigned'}</td>
                  </tr>
                  <tr>
                    <td><strong>Role</strong></td>
                    <td className="text-primary">{userData.role}</td>
                  </tr>
                  <tr>
                    <td><strong>Salary</strong></td>
                    <td className="text-primary">{userData.salaire}</td>
                  </tr>
                  <tr>
                    <td><strong>Contract Type</strong></td>
                    <td className="text-primary">{userData.typeContrat}</td>
                  </tr>
                  <tr>
                    <td><strong>Car</strong></td>
                    <td className="text-primary">{userData.car}</td>
                  </tr>
                  <tr>
                    <td><strong>Office</strong></td>
                    <td className="text-primary">{userData.bureau}</td>
                  </tr>
                  <tr>
                    <td><strong>Last Updated</strong></td>
                    <td className="text-primary">{new Date(userData.updatedAt).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Completed Tasks</strong></td>
                    <td className="text-primary">{userData.completedTasks || 0}</td>
                  </tr>
                  <tr>
                    <td><strong>Reports</strong></td>
                    <td className="text-primary">{userData.reports || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewuser;
