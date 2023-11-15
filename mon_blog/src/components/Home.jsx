
import './Home.css';
import headerImage from '../img/LOeil-sur-lecran.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function Home() {
    const [articles, setArticles] = useState([]);
  
    useEffect(() => {
      // Effectuer une requête à votre nouvelle route pour obtenir les détails des articles
      fetch("http://localhost:3001/articles-details")
        .then(response => response.json())
        .then(data => setArticles(data))
        .catch(error => console.error("Erreur lors de la récupération des articles :", error));
    }, []); // Utilisation de [] comme dépendance pour que cet effet soit exécuté une seule fois
  
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
      <div className="articles-container">
        <h2>Derniers articles</h2>
        <ul>
          {articles.map(article => (
            <li key={article.titre}>
              <div className="article-details">
                <h3>{article.titre}</h3>
                <p>{article.contenu}</p>
                <p>Date de création : {article.date_creation}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}