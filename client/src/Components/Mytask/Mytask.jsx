import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import './Mytask.css';
import seen_icon from '../../assets/history.png';
import complete_icon from '../../assets/complete.png';
import delete_icon from '../../assets/delete.png';
import Erreur from '../Erreur/Erreur.jsx';
import Loader from '../Loader/Loader.jsx'; 
import Task from '../Task/Task.jsx';
import { Routes, Route, Link } from 'react-router-dom';

const Mytask = () => {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user._id) {
      const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axiosInstance.get(`/api/mytasks/user/${user._id}`);
          setTasks(response.data);
        } catch (error) {
          setError("Error fetching tasks");
        } finally {
          setLoading(false);
        }
      };
      fetchTasks();
    }
  }, [user]);

  const handleSeenTask = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post(`/api/mytasks/${taskId}/seen`);
      setTasks(prevTasks => prevTasks.map(task => 
        task._id === taskId ? { ...task, status: 'seen' } : task
      ));
    } catch (error) {
      setError("Error marking task as seen");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post(`/api/mytasks/${taskId}/complete`);
      setTasks(prevTasks => prevTasks.map(task => 
        task._id === taskId ? { ...task, status: 'completed' } : task
      ));
    } catch (error) {
      setError("Error marking task as completed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/api/mytasks/${taskId}`);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (error) {
      setError("Error deleting task");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className='mytask text-center'>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="task-list">
              {error && <Erreur message={error} />} 
              {tasks.length > 0 ? (
                <>
                  <h1 className='mt-3 text-black-50'>This is your task</h1>
                  <ul>
                    {tasks.map(task => (
                      <li key={task._id}>
                        <Link to={`/worker/mytasks/see-task/${task._id}`}>
                          <p>{task.title} 
                            <span>{new Date(task.dueDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'numeric',
                              year: 'numeric'
                            })}</span>
                          </p>
                          <div className='action'>
                            <button onClick={() => handleSeenTask(task._id)} className='btn'>
                              <img src={seen_icon} className='action-icon' alt="Mark as seen" />
                            </button>
                            <button onClick={() => handleComplete(task._id)} className='btn'>
                              <img src={complete_icon} className='action-icon' alt="Mark as complete" />
                            </button>
                            <button onClick={() => handleDeleteTask(task._id)} className='btn'>
                              <img src={delete_icon} alt="Delete task" />
                            </button>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <h1 className='mt-3 text-black-50'>
                  There are no tasks for you right now ({user?.username})
                </h1>
              )}
            </div>
          } 
        />
        <Route path="see-task/:id" element={<Task />} />
      </Routes>
    </div>
  );
};

export default Mytask;
