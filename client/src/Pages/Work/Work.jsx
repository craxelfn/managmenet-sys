import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar'; 
import './Work.css';
import AddIntership from '../../Components/AddIntership/AddIntership';
import AddWorker from '../../Components/AddWroker/AddWorker';
import Adminspace from '../../Components/Adminspace/Adminspace';
import Teamtask from '../../Components/Teamtask/Teamtask';
import Report from '../../Components/Report/Report';
import Meet from '../../Components/Meet/Meet';
import Mytask from '../../Components/Mytask/Mytask';
import Messenger from '../../Components/Messenger/Messenger';
import CallPage from '../../Components/Callpage/Callpage'; // Import Call component
import Help from '../../Components/Help/Help';

const Work = () => {
  return (
    <div className='work'>
      <Sidebar />
      <div className='content'>
        <Routes>
          <Route path="/add-worker" element={<AddWorker />} />
          <Route path="/admin-space/*" element={<Adminspace />} />
          <Route path="/add-intership" element={<AddIntership />} />
          <Route path="/team-task" element={<Teamtask />} />
          <Route path="/reportprobleme" element={<Report />} />
          <Route path="/" element={<Teamtask />} />
          <Route path='/help' element={ <Help /> }/>
          <Route path="/meet/" element={<Meet />}>
            <Route path="CallPage/:roomId" element={<CallPage />} /> 
          </Route>
          <Route path="/mytasks/*" element={<Mytask />} />
          <Route path="/chat" element={<Messenger />} />
        </Routes>
      </div>
    </div>
  );
}

export default Work;
