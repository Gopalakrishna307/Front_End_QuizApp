import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './index.css';
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernamereg, setUsernamereg] = useState("");
  const [passwordreg, setPasswordreg] = useState("");
  const [emailreg, setEmailreg] = useState("");
  const [error, setError] = useState("");
  const [errorreg, setErrorreg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const container_log = document.getElementById('container_log');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    
    registerBtn.addEventListener('click', () => {
        container_log.classList.add("active");
    });
    
    loginBtn.addEventListener('click', () => {
        container_log.classList.remove("active");
    });
    const newUser= {
      username: usernamereg,
      password: passwordreg,
      email: emailreg,
    };
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username: username,
        password: password,
      });
       


      const role = response.data;
      // Handle the role based on the response
      if (role === "admin") {
        // navigate("/admin");
        navigate("/admin", { state: { username: username } });
      } else if (role === "user") {
        // Redirect to the user page
        navigate("/user", { state: { username: username } });
        // navigate("/user");
        setError("User logged");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Failed to log in");
    }
    try{
    await axios.post("http://localhost:8080//api/users/reg", {
        newUser
      });
    console.log("New User added successfully");
      setUsernamereg("");
      setEmailreg("");
      setPasswordreg("");
      
    } catch (errorreg) {
      setErrorreg("Failed to Register new user");
    }
  };
  

  

  return (

    <div class="base">
    <div className="container_log" id="container_log">
      <div className="main-form" >
    <div className="form-container_log sign-up">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className="social-icons">
          <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
          <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
          <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
        <span>or use your email for registration</span>
        <input  type="username"
            id="username"
            value={username}
            onChange={(e) => setUsernamereg(e.target.value)} placeholder="Name" />
        <input  type="email"
            id="email"
            value={email}
            onChange={(e) => setEmailreg(e.target.value)}placeholder="Email" />
        <input  type="password"
            id="password"
            value={password}
            onChange={(e) => setPasswordreg(e.target.value)}placeholder="Password" />
        <button className="btn btn-primary" type="submit">Register..!</button>
        {errorreg && <div className="text-danger">{errorreg}</div>}
      </form>
    </div>

    <div className="form-container_log sign-in">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="social-icons">
          <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
          <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
          <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
        <span>or use your username password</span>

        <input type="text"
        className="form-control"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="userName" />

        <input className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder="Password" />


        <a href="#">Forget Your Password?</a>
        <button className="btn btn-primary" type="submit">Login</button>
        {error && <div className="text-danger">{error}</div>}
      </form>
    </div>
    <div class="toggle-container_log">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button class="hidden" id="login" onClick={null}>Login</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Hello...!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button class="hidden" id="register" onClick={null}>Register</button>
                </div>
            </div>
        </div>
        </div>
        </div>
  </div>
  );
};

export default Login;