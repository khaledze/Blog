import React from "react";
import "./Log.css";

export default function CreationPage() {
  return (
    <div className="form">
      <h2>Création de compte</h2>
      <div className="flex-column">
        <label>Prénom</label>
        <div className="inputForm">
          <input
            type="text"
            className="input"
            name="firstname"
            placeholder="Enter your First Name"
          />
        </div>
      </div>
      <div className="flex-column">
        <label>Nom</label>
        <div className="inputForm">
          <input
            type="text"
            className="input"
            name="lastname"
            placeholder="Enter your Last Name"
          />
        </div>
      </div>
      <div className="flex-column">
        <label>Adresse e-mail</label>
        <div className="inputForm">
          <input
            type="email"
            className="input"
            name="email"
            placeholder="Enter your Email"
          />
        </div>
      </div>
      <div className="flex-column">
        <label>Mot de passe</label>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Enter your Password"
          />
        </div>
      </div>
      <button className="button-submit">Créer un compte</button>
    </div>
  );
}
