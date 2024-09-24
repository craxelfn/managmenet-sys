import React, { useState, useRef } from 'react';
import { useSignup } from "../../hooks/useSignup";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from 'react-router-dom';
import user_icon from '../../assets/person.png'; 
import email_icon from '../../assets/email.png'; 
import password_icon from '../../assets/password.png';
import './loginSignup.css';


const LoginSignup = () => {
  const [action, setAction] = useState('Login'); 
  const { login, error: loginError, isLoading: loginLoading } = useLogin();
  const { signup, error: signupError, isLoading: signupLoading } = useSignup();
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current ? nameRef.current.value : ''; // Get the name only if signing up

    if (action === 'Login') {
      const response = await login(email, password); // Add response variable to handle the login response
      if (response?.status === 200) {
        navigate('/'); // Use navigate function to redirect after login
      }
    } else {
      const response = await signup(name, email, password); // Pass name to signup

      if (response?.status === 200) {
        clearFields(); 
        setAction('Login'); 
      }
    }
  };

  const clearFields = () => {
    emailRef.current.value = '';
    passwordRef.current.value = '';
    if (nameRef.current) nameRef.current.value = '';
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      
      <form className="inputs" onSubmit={handleSubmit}>
        {action === "Sign up" && (
          <div className="input">
            <img src={user_icon} alt="User Icon" />
            <input 
              type="text" 
              placeholder='Name' 
              ref={nameRef} // Attach ref to the name input
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="Email Icon" />
          <input 
            type="email" 
            placeholder='Email Id' 
            ref={emailRef} 
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="Password Icon" />
          <input 
            type="password" 
            placeholder='Password' 
            ref={passwordRef}
          />
        </div>
        <input 
          type="submit" 
          value={action === "Login" ? "Login" : "Sign Up"} 
          className='btn btn-danger w-75 text-center' 
          disabled={loginLoading || signupLoading}
        />
      </form>

      {/* Error message display */}
      {action === 'Login' && loginError && (
        <div className="error-message">{loginError}</div>
      )}
      {action === 'Sign up' && signupError && (
        <div className="error-message">{signupError}</div>
      )}

      {action === "Sign up" ? null :
        <div className='forgot-password'>
          Lost Password? <span>Click here!</span>
        </div>
      }
      <div className="submit-container">
        <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign up")}>Sign up</div>
        <div className={action === "Sign up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
      </div>
    </div>
  );
}

export default LoginSignup;
