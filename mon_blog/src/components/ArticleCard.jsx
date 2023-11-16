
import React, { useState } from 'react';
import Icon from '../img/poubelle.png'


function ArticleCard({ article, expandedArticleId, setExpandedArticleId, onDelete, isUserLoggedIn  }) {
    const handleExpandClick = (id) => {
        setExpandedArticleId(id === expandedArticleId ? null : id);
    };

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        onDelete(article.id);
    };

    return (
        <div className={`article-card ${article.auteur_id === expandedArticleId ? 'expanded' : ''}`} onClick={() => handleExpandClick(article.auteur_id)}>
            <div className="article-details">
                <h3>{article.titre}</h3>
                {article.auteur_id === expandedArticleId && (
                    <>
                        <p>{article.contenu}</p>
                        <p>Date de création : {article.date_creation}</p>
                        {isUserLoggedIn && (
                        <button onClick={() => onDelete(article.id)}>
                            <img src={Icon} alt="Trash Icon" style={{ width: '20px', height: '20px' }} />
                        </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default ArticleCard;