
import './Home.css';
import headerImage from '../img/LOeil-sur-lecran.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [expandedArticleId, setExpandedArticleId] = useState(null);
    const user = JSON.parse(localStorage.getItem('user')); 
    
    const handleEdit = (articleId, updatedArticle, onUpdateSuccess) => {
      if (!user) {
        console.log("L'utilisateur n'est pas connecté. Impossible de mettre à jour l'article.");
        return;
      }
    
      console.log("Article mis à jour :", updatedArticle);
      fetch(`http://localhost:3001/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedArticle),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Échec de la mise à jour de l'article. Statut : ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Mise à jour réussie :", data);
          if (onUpdateSuccess && typeof onUpdateSuccess === 'function') {
            onUpdateSuccess(data);
          }
        })
        .catch(error => {
          console.error("Erreur lors de la mise à jour de l'article :", error.message);
        });
    };
  
  

    useEffect(() => {
      
      fetch("http://localhost:3001/articles-details")
        .then(response => response.json())
        .then(data => setArticles(data))
        .catch(error => console.error("Erreur lors de la récupération des articles :", error));
    }, []);
    
    const handleDeleteArticle = (articleId) => {
      if (!user) {
          console.log("L'utilisateur n'est pas connecté. Impossible de supprimer l'article.");
          return;
      }
  
      fetch(`http://localhost:3001/articles/${articleId}`, {
          method: 'DELETE',
      })
          .then(response => response.json())
          .then(() => {
              const updatedArticles = articles.filter(article => article.id !== articleId);
              setArticles(updatedArticles);
          })
          .catch(error => console.error("Erreur lors de la suppression de l'article :", error));
  };
    
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

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
          <button className="logout-button" onClick={handleLogout}>Se déconnecter</button>
        </div>
      </header>
      <div className="articles-container">
        <h2>Derniers articles</h2>
        <div className="articles-grid">
        {articles.map(article => (
      <ArticleCard
        key={article.auteur_id}
        article={article}
        expandedArticleId={expandedArticleId}
        setExpandedArticleId={setExpandedArticleId}
        onDelete={handleDeleteArticle}
        onEdit={handleEdit}
        isUserLoggedIn={!!user}
      />
    ))}
        </div>
      </div>
    </div>
  );
}


