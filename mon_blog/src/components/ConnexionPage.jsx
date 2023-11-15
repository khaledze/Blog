import React from "react";
import "./Log.css";

export default function ConnexionPage() {
  return (
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
      <div className="flex-row">
        <div>
          <input type="checkbox" />
          <label>Remember me </label>
        </div>
        <span className="span">Forgot password?</span>
      </div>
      <button className="button-submit">Sign In</button>
      <p className="p">
        Don't have an account? <span className="span">Sign Up</span>
      </p>
    </div>
  );
}
