import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Meet.css';

const Meet = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const createRoom = () => {
    // Logic to create a room can be added here later
    const newRoomId = 'generated-room-id'; // Placeholder for generated room ID
    setRoomId(newRoomId);
    navigate(`/worker/meet/CallPage/${newRoomId}`);
  };

  const joinRoom = () => {
    if (roomId) {
      navigate(`/worker/meet/CallPage/${roomId}`);
    }
  };

  return (
    <div className="meet">
      <div className="join-meet">
        <div className="first col-lg-6">
          <div className="video-container">
            <div className="camera-off">
              <p>Camera is off</p>
            </div>
          </div>
        </div>
        <div className="second col-lg-6">
          <h3>Join Room</h3>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="submit"
            className="btn btn-primary"
            value="Join"
            onClick={joinRoom}
          />
          <h3>Create New Room</h3>
          <input
            type="submit"
            className="btn btn-primary"
            value="Create"
            onClick={createRoom}
          />
        </div>
      </div>
    </div>
  );
};

export default Meet;
