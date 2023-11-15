import React, { useState } from 'react';

function ArticleCard({ article }) {
  const [expandedArticleId, setExpandedArticleId] = useState(null);

  const handleExpandClick = (id) => {
    setExpandedArticleId(id === expandedArticleId ? null : id);
  };

  return (
    <div className={`article-card ${article.auteur_id === expandedArticleId ? 'expanded' : ''}`} onClick={() => handleExpandClick(article.auteur_id)}>
      <div className="article-details">
        <h3>{article.titre}</h3>
        {article.auteur_id === expandedArticleId && (
          <>
            <p>{article.contenu}</p>
            <p>Date de création : {article.date_creation}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ArticleCard;