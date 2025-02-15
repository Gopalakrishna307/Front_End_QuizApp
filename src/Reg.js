import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Reg() {
    return (
        <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
        
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Register..!</button>
        </form>
      </div>
    );
  }
  
  export default Reg;