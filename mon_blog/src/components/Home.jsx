import React from 'react';
import './Home.css';
import headerImage from '../img/LOeil-sur-lecran.png';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <img src={headerImage} alt="Header" className="header-image" />
        <div className="nav-options">
          <span className="nav-option">Actualité<div className="info">Informations sur Actualité</div></span>
          <span className="nav-option">Tendance<div className="info">Informations sur Tendance</div></span>
          <span className="nav-option">Contact<div className="info">Informations sur Contact</div></span>
        </div>
        <div className="buttons">
          <Link to="/creation"><button className="signup-button">Créer un compte</button></Link>
          <Link to="/connexion"><button className="login-button">Se connecter</button></Link>
          <Link to="/deconnexion"><button className="logout-button">Se déconnecter</button></Link>
        </div>
      </header>
      <div>Home</div>
    </div>
  )
}