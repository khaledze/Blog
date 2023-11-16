import React, { useState } from 'react';
import Icon from '../img/poubelle.png';
import Icon2 from '../img/edit.png';

function ArticleCard({ article, expandedArticleId, setExpandedArticleId, onDelete, onEdit }) {
    const [editedArticle, setEditedArticle] = useState({ titre: article.titre, contenu: article.contenu });
    const [isEditing, setIsEditing] = useState(false);
    
    const handleExpandClick = (id) => {
        if (isEditing) {
            return;
        }
    
        setExpandedArticleId(id === expandedArticleId ? null : id);
        setIsEditing(false);
    };

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        onDelete(article.id);
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        setIsEditing(true);
    };

    const handleSaveClick = async (event) => {
        event.stopPropagation();

        try {
            const response = await fetch(`http://localhost:3001/articles/${article.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedArticle),
            });

            if (response.ok) {
                console.log("Article mis à jour avec succès !");
                onEdit(article.id, editedArticle);
                setIsEditing(false);
                window.location.reload();
            } else {
                console.error("Échec de la mise à jour de l'article");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'article :", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedArticle((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className={`article-card ${article.auteur_id === expandedArticleId ? 'expanded' : ''}`} onClick={() => handleExpandClick(article.auteur_id)}>
            <div className="article-details">
                <h3>{article.titre}</h3>
                {article.auteur_id === expandedArticleId && (
                    <>
                        {isEditing ? (
                            <div className="edit-form">
                                <label>Titre:</label>
                                <input type="text" name="titre" value={editedArticle.titre} onChange={handleInputChange} />
                                <label>Contenu:</label>
                                <textarea name="contenu" value={editedArticle.contenu} onChange={handleInputChange} />
                                <button onClick={handleSaveClick}>
                                    Sauvegarder
                                </button>
                            </div>
                        ) : (
                            <>
                                <p>{article.contenu}</p>
                                <p>Date de création : {article.date_creation}</p>
                                <div className='boutons'>
                                    <button onClick={handleEditClick}>
                                        <img src={Icon2} alt="Edit Icon" style={{ width: '20px', height: '20px' }} />
                                    </button>
                                    <button onClick={handleDeleteClick} style={{marginLeft:'30px'}}>
                                        <img src={Icon} alt="Trash Icon" style={{ width: '20px', height: '20px' }} />
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default ArticleCard;


