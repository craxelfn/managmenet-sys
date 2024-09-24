import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance.js'; // Ensure axiosInstance is correctly set up
import Loader from '../Loader/Loader.jsx'; // Ensure Loader component is available
import Erreur from '../Erreur/Erreur.jsx'; // Ensure Erreur component is available
import './Help.css'; // Ensure you have proper styles

const Help = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get('/api/reports');
        if (response.data && Array.isArray(response.data.data)) {
          setReports(response.data.data);
        } else {
          setError('Unexpected data format');
        }
      } catch (err) {
        setError('Error fetching reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handlePrint = () => {
    window.print(); // Trigger print dialog
  };

  if (loading) return <Loader />;
  if (error) return <Erreur message={error} />;

  return (
    <div className="report-container">
      <h1 className="report-title">All Reports</h1>
      <button onClick={handlePrint} className="btn btn-primary buff">
        Print Reports
      </button>
      {reports.length > 0 ? (
        <table className="report-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Zone</th>
              <th>Bureau</th>
              <th>Problem Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report.username}</td>
                <td>{report.phone}</td>
                <td>{report.department}</td>
                <td>{report.zone}</td>
                <td>{report.bureau}</td>
                <td>{report.problemType}</td>
                <td>{report.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reports available.</p>
      )}
    </div>
  );
};

export default Help;
