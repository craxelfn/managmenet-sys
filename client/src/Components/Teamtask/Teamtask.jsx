import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance.js';
import './Teamtask.css';
import add_icon from '../../assets/history.png';
import Erreur from '../Erreur/Erreur.jsx';
import Loader from '../Loader/Loader.jsx';
import { useAuthContext } from '../../hooks/useAuthContext.js';

const Teamtask = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(0);
  const { user } = useAuthContext();
  const [draggedTask, setDraggedTask] = useState(null);

  // Fetch workers and tasks on page load
  useEffect(() => {
    const fetchWorkersAndTasks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/teamtask/users/${user.department}`);
        setWorkers(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Error fetching data.');
      }
    };
    fetchWorkersAndTasks();
  }, [user.department]);

  // Function to add new task
  const handleAddItem = async () => {
    const title = document.getElementById('inp').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;

    if (title !== '') {
      setLoading(true);
      try {
        const newTask = {
          title,
          description,
          dueDate,
          userId: workers[selectedWorker]._id
        };

        // Add the task
        const response = await axiosInstance.post('/api/teamtask/add', newTask);

        // Update worker's tasks
        const updatedWorkers = workers.map((worker, index) => {
          if (index === selectedWorker) {
            return {
              ...worker,
              tasks: [...worker.tasks, response.data]  // Add new task
            };
          }
          return worker;
        });
        setWorkers(updatedWorkers);

        // Clear inputs
        document.getElementById('inp').value = '';
        document.getElementById('description').value = '';
        setSuccess('Task added successfully.');
      } catch (err) {
        setError('Error adding task.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/teamtask/delete/${id}`);
      const updatedWorkers = workers.map(worker => ({
        ...worker,
        tasks: worker.tasks.filter(task => task._id !== id),
      }));
      setWorkers(updatedWorkers);
      setSuccess('Task deleted successfully.');
    } catch (err) {
      setError('Error deleting task.');
    } finally {
      setLoading(false);
    }
  };

  // Handle drag start
  const handleDragStart = (task, workerIndex) => {
    setDraggedTask({ task, workerIndex });
  };

  // Handle drop
  const handleDrop = async (workerIndex) => {
    if (draggedTask) {
      const draggedWorker = workers[draggedTask.workerIndex];
      const targetWorker = workers[workerIndex];

      // Remove task from the old worker's task list
      const updatedDraggedWorker = {
        ...draggedWorker,
        tasks: draggedWorker.tasks.filter(task => task._id !== draggedTask.task._id),
      };

      // Add the task to the new worker's task list
      const updatedTargetWorker = {
        ...targetWorker,
        tasks: [...targetWorker.tasks, draggedTask.task],
      };

      const updatedWorkers = workers.map((worker, index) => {
        if (index === draggedTask.workerIndex) return updatedDraggedWorker;
        if (index === workerIndex) return updatedTargetWorker;
        return worker;
      });

      // Update the workers state
      setWorkers(updatedWorkers);

      // Reset dragged task
      setDraggedTask(null);

      // Optionally send a request to update the task's owner in the backend
      try {
        await axiosInstance.put(`/api/teamtask/update-task-owner/${draggedTask.task._id}`, {
          newUserId: targetWorker._id
        });
        setSuccess('Task moved successfully.');
      } catch (err) {
        setError('Error moving task.');
      }
    }
  };

  // Prevent default behavior for drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className='team-task'>
      {loading && <Loader />}
      {error && <Erreur type="erreur" message={error} />}
      {success && <Erreur type="Success" message={success} />}
      <div className="inputs mx-auto">
        <h2>Add task</h2>
        <div className="data">
          <input type="text" placeholder='Enter task' id="inp" />
          <input type="date" id="dueDate" />
          <textarea placeholder='Task description' id="description"></textarea>
          <select className="form-select" onChange={(e) => setSelectedWorker(parseInt(e.target.value))}>
            <option defaultValue>Select a worker</option>
            {workers.map((worker, index) => (
              <option key={index} value={index}>{worker.username}</option>
            ))}
          </select>
          <button onClick={handleAddItem}>Add</button>
        </div>
      </div>
      <div className="row list mt-5">
        {workers.map((worker, index) => (
          <div
            key={index}
            className="box col-lg-3 col-5 me-2 mb-5"
            onDrop={() => handleDrop(index)}
            onDragOver={handleDragOver}
          >
            <h2>{worker.username}</h2>
            {worker.tasks.map(task => (
              <div
                key={task._id}
                className={`item text-center ${task.status === 'Completed' ? 'task-complete' : task.status === 'In Progress' ? 'task-in-progress' : ''}`}
                draggable
                onDragStart={() => handleDragStart(task, index)}
              >
                <p>{task.title}</p>
                <img className='seen' src={add_icon} alt="delete" onClick={() => handleDelete(task._id)} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teamtask;
