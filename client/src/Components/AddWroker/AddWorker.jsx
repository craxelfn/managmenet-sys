import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup'; // Import the useSignup hook
import './AddWorker.css';
import Erreur from '../Erreur/Erreur.jsx';
import Loader from '../Loader/Loader'; // Import the Loader component

const AddWorker = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phone: '',
    ecole: 'none',
    typeStage: 'none',
    typeContrat: '',
    department: '',
    role: '',
    encadrant:'',
    dure:'',
    car: '',
    bureau: '',
    salaire: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const { signup, error } = useSignup(); // Use the hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = 'Nom is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.salaire) newErrors.salaire = 'Salaire is required';
    if (!formData.typeContrat) newErrors.typeContrat = 'Type Contrat is required';
    if (!formData.department) newErrors.department = 'Departement is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.bureau) newErrors.bureau = 'Bureau is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true); // Start loading

      try {
        await signup(formData);
        // Handle success
        setErrors({});
        setFormData({
          username: '',
          phone: '',
          email: '',
          password: '',
          salaire: '',
          typeContrat: '',
          department: '',
          role: '',
          car: '',
          bureau: '',
          dure:'',
        });
        // Optionally, show a success message
        <Erreur type={"Success"} message={"Worker added successfully"} />
      } catch (err) {
        setErrors({ api: err.message }); // Set error message from API
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  return (
    <div className='add-worker'>
      <h1 className='text-center mt-5'>Ajouter les informations de l'employé</h1>
      {isLoading && <Loader />} {/* Show Loader component when loading */}
      <form className='inputs-form w-100' onSubmit={handleSubmit}>
        <div className="row ps-3 mt-5">
          <input
            type="text"
            className='form-control mb-3'
            placeholder='Username'
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          
          <input
            type="text"
            className='form-control mb-3'
            placeholder='Phone'
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          
          <input
            type="email"
            className='form-control mb-3'
            placeholder='Email'
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            className='form-control mb-3'
            placeholder='Password'
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          
          <input
            type="number"
            className='form-control w-50 mb-3'
            placeholder='Salaire'
            name="salaire"
            value={formData.salaire}
            onChange={handleChange}
          />
          <input
            type="date"
            className='form-control w-50 mb-3'
            placeholder='dure'
            name="dure"
            value={formData.dure}
            onChange={handleChange}
          />
          <select
            className="custom-select col-lg-6 p-1 mb-3"
            name="typeContrat"
            value={formData.typeContrat}
            onChange={handleChange}
          >
            <option value="" disabled>Type contrat</option>
            <option value="1">CDI</option>
            <option value="2">CDD</option>
            <option value="3">Part-Time Contracts</option>
            <option value="4">Internship Contracts</option>
            <option value="5">Freelance/Contractor Agreements</option>
            <option value="6">Temporary Contracts</option>
            <option value="7">Consultancy Agreements</option>
            <option value="8">Apprenticeship Contracts</option>
            <option value="9">Job Share Contracts</option>
          </select>
          
          <select
            className="custom-select col-lg-6 p-1 mb-3"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="" disabled>Departement</option>
            <option value="Flight Operations">Flight Operations</option>
            <option value="Cabin Crew & In-Flight Services">Cabin Crew & In-Flight Services</option>
            <option value="Ground Operations">Ground Operations</option>
            <option value="Maintenance & Engineering">Maintenance & Engineering</option>
            <option value="Safety & Security">Safety & Security</option>
            <option value="Sales & Marketing">Sales & Marketing</option>
            <option value="Cargo Operations">Cargo Operations</option>
            <option value="Finance & Accounting">Finance & Accounting</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Legal & Compliance">Legal & Compliance</option>
            <option value="Procurement & Supply Chain">Procurement & Supply Chain</option>
            <option value="Corporate Strategy & Planning">Corporate Strategy & Planning</option>
            <option value="Training & Development">Training & Development</option>
          </select>
          
          <select
            className="custom-select col-lg-6 p-1 mb-3"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="" disabled>Role</option>
            <option value="worker">worker</option>
            <option value="Executive Management">Executive Management</option>
            <option value="Department Heads">Department Heads</option>
            <option value="Managers">Managers</option>
            <option value="Team Leaders">Team Leaders</option>
            <option value="Supervisors">Supervisors</option>
            <option value="Specialist Roles">Specialist Roles</option>
          </select>
          
          <select
            className="custom-select col-lg-6 p-1 mb-3"
            name="car"
            value={formData.car}
            onChange={handleChange}
          >
            <option value="" disabled>Car (optional)</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          
          <select
            className="custom-select col-lg-6 p-1 mb-3"
            name="bureau"
            value={formData.bureau}
            onChange={handleChange}
          >
            <option value="" disabled>Bureau</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
          </select>
          
          <input type="submit" className='btn btn-primary mx-auto mt-4' value="Submit" />
        </div>
      </form>

      {Object.keys(errors).length > 0 && <Erreur message={Object.values(errors).join(' ')} />}
    </div>
  );
}

export default AddWorker;
