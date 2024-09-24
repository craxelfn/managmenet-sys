import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup.js'; // Import the useSignup hook
import './AddIntership.css';
import Erreur from '../Erreur/Erreur.jsx';

const AddIntership = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phone: '',
    ecole: '',
    typeStage: '',
    typeContrat: '',
    department: '',
    role: 'stagaire',
    encadrant:'',
    dure:'',
    car: '',
    bureau: '',
    salaire: '0',
  });

  const [errors, setErrors] = useState({});
  const { signup, isLoading, error } = useSignup(); // Use the hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.ecole) newErrors.ecole = 'Ecole is required';
    if (!formData.typeStage) newErrors.typeStage = 'Type Stage is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.encadrant) newErrors.encadrant = 'Encadrant is required';
    if (!formData.dure) newErrors.dure = 'Dure is required';
    if (!formData.bureau) newErrors.bureau = 'Bureau is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await signup(formData);
        // Handle success, e.g., redirect or show a success message
        setErrors({}); // Clear errors if submission is successful
        <Erreur type={"Success"} message={"user added succefly"}/>
      } catch (err) {
        setErrors({ api: err.message }); // Set error message from API
      }
    }
  };

  return (
    <div className='add-worker'>
      <h1 className='text-center mt-5'>Ajouter les informations du stagiaire</h1>
      <form className='inputs-form w-100' onSubmit={handleSubmit}>
        <div className="row ps-3 mt-5">
          {/* Form fields */}
          <input
            type="text"
            className='form-control mb-3'
            placeholder='Username'
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          
          <input
            type="number"
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
            type="text"
            className='form-control w-50 mb-3'
            placeholder='Ecole'
            name="ecole"
            value={formData.ecole}
            onChange={handleChange}
          />

          {/* Other select fields */}
          <select
            className="custom-select col-lg-6 p-1 mb-3"
            name="typeStage"
            value={formData.typeStage}
            onChange={handleChange}
          >
            <option value="" disabled>Type Stage</option>
            <option value="1">Observation</option>
            <option value="2">PFA</option>
            <option value="3">PFE</option>
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

          <input
            type='text'
            className='form-control mb-3'
            name="encadrant"
            value={formData.encadrant}
            onChange={handleChange}
            placeholder="encadrant"
          />
          

          <select
            className="custom-select col-lg-6 p-1 mb-3"
            name="dure"
            value={formData.dure}
            onChange={handleChange}
          >
            <option value="" disabled>Dure</option>
            <option value="1">1 months</option>
            <option value="2">2 months</option>
            <option value="3">3 months</option>
            <option value="4">4 months</option>
            <option value="6">6 months</option>
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

          <input type="submit" className='btn btn-primary mx-auto mt-4' />
        </div>
      </form>

      {/* Display error messages */}
      {Object.keys(errors).length > 0 && <Erreur message={Object.values(errors).join(' ')} />}
    </div>
  );
}

export default AddIntership;
