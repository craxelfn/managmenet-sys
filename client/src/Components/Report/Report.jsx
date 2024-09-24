import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance.js' ;
import './Report.css';
import { useAuthContext } from '../../hooks/useAuthContext.js'


const Report = () => {
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    reported_id: user._id,
    username:  user.username,
    phone: user.phone ,
    department: '',
    zone: '',
    bureau: '',
    problemType: '',
    description: '',
    attachments: []
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachments: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('reported_id', user._id);  // Send user._id
    data.append('username', user.username); // Send username
    data.append('phone', user.phone);       // Send phone
    data.append('department', formData.department);
    data.append('zone', formData.zone);
    data.append('bureau', formData.bureau);
    data.append('problemType', formData.problemType);
    data.append('description', formData.description);
  
    // Append multiple file attachments
    for (let i = 0; i < formData.attachments.length; i++) {
      data.append('attachments', formData.attachments[i]);
    }
  
    try {
      const response = await axiosInstance.post('/api/reports', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Report created:', response.data);
    } catch (error) {
      console.error('Error creating report:', error);
    }
  };
  

  return (
    <div className='report text-center mt-5'>
      <h2>Entrer les informations</h2>
      <form onSubmit={handleSubmit} className="row ps-5 pe-5">
        
        {/* Department Dropdown */}
        <select 
          className="custom-select p-1 mb-3" 
          name="department"
          value={formData.department} 
          onChange={handleInputChange} 
          required>
          <option value="" disabled>Département</option>
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
        
        {/* Zone Dropdown */}
        <select 
          className="custom-select p-1 mb-3" 
          name="zone" 
          value={formData.zone} 
          onChange={handleInputChange} 
          required>
          <option value="" disabled>Zone</option>
          <option value="1">Zone Industrielle</option>
          <option value="2">Hangars</option>
          <option value="3">Entrepôt</option>
          <option value="4">Siège</option>
        </select>

        {/* Bureau Input */}
        <input 
          type="text" 
          name="bureau" 
          className='form-control mb-3' 
          placeholder='Bureau' 
          value={formData.bureau} 
          onChange={handleInputChange} 
          required 
        />

        {/* Problem Type Dropdown */}
        <select 
          className="custom-select p-1 mb-3" 
          name="problemType" 
          value={formData.problemType} 
          onChange={handleInputChange} 
          required>
          <option value="" disabled>Type de problème</option>
          <option value="Problèmes de réseau">Problèmes de réseau</option>
          <option value="Problèmes liés aux ordinateurs">Problèmes liés aux ordinateurs</option>
          <option value="Problèmes de logiciels d'entreprise">Problèmes de logiciels d'entreprise</option>
          <option value="Problèmes de communication">Problèmes de communication</option>
          <option value="Problèmes liés aux services cloud et de stockage">Problèmes liés aux services cloud et de stockage</option>
          <option value="Problèmes d’accès aux systèmes internes">Problèmes d’accès aux systèmes internes</option>
        </select>

        {/* File Input */}
        <input 
          className="form-control mb-3 file-input" 
          type="file" 
          name="attachments" 
          multiple 
          onChange={handleFileChange} 
        />

        {/* Description Textarea */}
        <textarea 
          className="form-control me-2" 
          name="description" 
          placeholder="Description" 
          value={formData.description} 
          onChange={handleInputChange} 
          style={{ height: "100px" }} 
          required>
        </textarea>

        {/* Submit Button */}
        <input type="submit" className='btn btn-primary w-50 mx-auto mt-5' value="Submit" />
      </form>
    </div>
  );
}

export default Report;
