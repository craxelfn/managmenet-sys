import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance.js';
import Loader from '../Loader/Loader.jsx';
import Erreur from '../Erreur/Erreur.jsx';
import './Task.css';

const Task = () => {
  const { id } = useParams(); // Get the task ID from the route
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/api/mytasks/task/${id}`);
        setTask(response.data);
      } catch (error) {
        setError("Error fetching task details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Erreur message={error} />;

  if (!task) return null;

  return (
    <div className="task-detail-container">
      <h1 className="task-title">{task.title}</h1>
      <div className="task-info">
        <p><strong>Description:</strong> {task.description || 'No description available'}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : 'No due date'}</p>
        <p><strong>Confirmed:</strong> {task.confirmed ? 'Yes' : 'No'}</p>
      </div>
      <div className="task-user">
        <p><strong>Assigned to:</strong> {task.user?.username || 'No user assigned'}</p> {/* Access user.username safely */}
      </div>
    </div>
  );
};

export default Task;
