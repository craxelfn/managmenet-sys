import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Authentification from './Pages/Authentification/Authentification';
import Footer from './Components/Footer/Footer';
import Work from './Pages/Work/Work';
import { useAuthContext } from './hooks/useAuthContext.js'
import Loader from './Components/Loader/Loader.jsx';

function App() {
  const { user, loading } = useAuthContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // Simulate checking auth state
    if (!loading) {
      setIsAuthChecked(true);
    }
  }, [loading]);

  if (!isAuthChecked) {
    return <Loader />
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={!user ? <Authentification /> : <Navigate to="/"/> } />
          <Route path='/' element={<Home /> } />
          <Route path='/worker/*' element={user ? <Work /> : <Navigate to="/login"/>} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
