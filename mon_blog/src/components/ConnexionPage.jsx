import React from "react";
import "./Log.css";
import { Link } from "react-router-dom";

export default function ConnexionPage() {
  return (
    <div className="login-page">
    <div className="form">
      <h2>Connexion</h2>
      <div className="flex-column">
        <label>Email </label>
        <div className="inputForm">
          <input type="text" className="input" placeholder="Enter your Email" />
        </div>
      </div>
      <div className="flex-column">
        <label>Password </label>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
          />
        </div>
      </div>
      
      <button className="button-submit">Sign In</button>
      <p className="p">
          Don't have an account? <Link to="/creation"><span className="span">Sign Up</span></Link>
        </p>
    </div>
    </div>
  );
}
