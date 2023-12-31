const express = require("express");
const app = express(); 
require('dotenv').config()
const mariadb = require('mariadb');
let cors = require('cors')
const bcrypt = require('bcrypt');
app.use(cors())
app.use(express.json());
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PWD,
    database: process.env.DB_DTB,
    connectionLimit:100
})
app.get('/articles', async (req, res) => {
    let conn;
    try {
        console.log("Lancement de la requête");
        conn = await pool.getConnection();
        console.log("Connexion établie");

        const rows = await conn.query("SELECT * FROM article");

        console.log(rows);
        res.status(200).json(rows);
    } catch (err) {
        console.error("Erreur lors de la récupération des articles :", err);
        res.status(500).send("Erreur interne du serveur");
    } finally {
        if (conn) {
            conn.release();
        }
    }
});
app.get('/articles/id/:id', async (req, res) => {
    let conn;
    try {
        console.log("Lancement de la requête");
        conn = await pool.getConnection();
        console.log("Connexion établie");

        const articleId = req.params.id;

        const rows = await conn.query("SELECT * FROM article WHERE id = ?", [articleId]);

        if (rows.length === 0) {
            res.status(404).json({ error: "Article non trouvée" });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (err) {
        console.error("Erreur lors de la récupération de la article :", err);
        res.status(500).json({ error: "Erreur interne du serveur", details: err.message });
    } finally {
        if (conn) {
            conn.release();
        }
    }
});
app.get('/articles/titre/:titre', async (req, res) => {
    let conn;
    try {
        console.log("Lancement de la requête");
        conn = await pool.getConnection();
        console.log("Connexion établie");

        const articleTitre = req.params.titre;

        const rows = await conn.query("SELECT * FROM article WHERE titre = ?", [articleTitre]);

        if (rows.length === 0) {
            res.status(404).json({ error: "Article non trouvée" });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (err) {
        console.error("Erreur lors de la récupération de la article :", err);
        res.status(500).json({ error: "Erreur interne du serveur", details: err.message });
    } finally {
        if (conn) {
            conn.release();
        }
    }
});
app.get('/articles-details', async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
  
      
      const rows = await conn.query("SELECT id, titre, contenu, date_creation FROM article");
  
      res.status(200).json(rows);
    } catch (err) {
      console.error("Erreur lors de la récupération des détails des articles :", err);
      res.status(500).send("Erreur interne du serveur");
    } finally {
      if (conn) {
        conn.release();
      }
    }
});

app.get('/articles-details/:id', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();

        const articleId = req.params.id;

        const rows = await conn.query("SELECT * FROM article WHERE id = ?", [articleId]);

        if (rows.length === 0) {
            res.status(404).json({ error: "Article non trouvé" });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (err) {
        console.error("Erreur lors de la récupération de l'article :", err);
        res.status(500).json({ error: "Erreur interne du serveur", details: err.message });
    } finally {
        if (conn) {
            conn.release();
        }
    }
});
  
app.delete('/articles/:id', async (req, res) => {
    const articleId = req.params.id;

    try {
        const conn = await pool.getConnection();
        await conn.query("DELETE FROM article WHERE id = ?", [articleId]);
        conn.release();

        res.status(200).json({ message: "Article supprimé avec succès" });
    } catch (err) {
        console.error("Erreur lors de la suppression de l'article :", err);
        res.status(500).json({ error: "Erreur interne du serveur", details: err.message });
    }
});

app.put('/articles/:id', async (req, res) => {
    const articleId = req.params.id;
    const updatedArticle = req.body;

    try {
        const conn = await pool.getConnection();
        const result = await conn.query("UPDATE article SET titre = ?, contenu = ? WHERE id = ?", [updatedArticle.titre, updatedArticle.contenu, articleId]);
        conn.release();

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Article mis à jour avec succès" });
        } else {
            res.status(404).json({ error: "Article non trouvé" });
        }
    } catch (err) {
        console.error("Erreur lors de la mise à jour de l'article :", err);
        res.status(500).json({ error: "Erreur interne du serveur", details: err.message });
    }
});

app.get('/utilisateurs', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT id, email, nom, prenom, mot_de_passe FROM utilisateur");
        conn.release();

        const utilisateurs = rows.map(utilisateur => {
            return {
                id: utilisateur.id,
                email: utilisateur.email,
                nom: utilisateur.nom,
                prenom: utilisateur.prenom,
                mot_de_passe: bcrypt.hashSync(utilisateur.mot_de_passe, 10)
            };
        });

        res.status(200).json(utilisateurs);
    } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        res.status(500).send("Erreur interne du serveur");
    }
});
app.get('/utilisateurs/:id', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const utilisateurId = req.params.id;
        const rows = await conn.query("SELECT * FROM utilisateur WHERE id = ?", [utilisateurId]);
        conn.release();

        const utilisateurs = rows.map(utilisateur => {
            return {
                id: utilisateur.id,
                email: utilisateur.email,
                nom: utilisateur.nom,
                prenom: utilisateur.prenom,
                mot_de_passe: bcrypt.hashSync(utilisateur.mot_de_passe, 10)
            };
        });

        res.status(200).json(utilisateurs);
    } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        res.status(500).send("Erreur interne du serveur");
    }
});
app.post('/utilisateurs', async (req, res) => {
    const { email, password, nom, prenom } = req.body;

    try {
        const conn = await pool.getConnection();

        const existingUser = await conn.query("SELECT id FROM utilisateur WHERE email = ?", [email]);

        if (existingUser.length > 0) {
            res.status(409).json({ error: "Adresse e-mail déjà utilisée" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            await conn.query("INSERT INTO utilisateur (email, mot_de_passe, nom, prenom) VALUES (?, ?, ?, ?)", [email, hashedPassword, nom, prenom]);
            res.status(201).send("Utilisateur ajouté avec succès");
        }

        conn.release();
    } catch (err) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur interne du serveur", details: err.message });
    }
});

app.post('/connexion', async (req, res) => {
    const { email, password } = req.body;
    let conn;
    try {
      conn = await pool.getConnection();
  
      const result = await conn.query("SELECT * FROM utilisateur WHERE email = ?", [email]);
  
      if (result.length === 0) {
        res.status(401).send("Adresse e-mail ou mot de passe incorrect");
        return;
      }
  
      const utilisateur = result[0];
      const motDePasseMatch = await bcrypt.compare(password, utilisateur.mot_de_passe);
  
      if (motDePasseMatch) {
        res.status(200).send("Authentification réussie");
      } else {
        res.status(401).send("Adresse e-mail ou mot de passe incorrect");
      }
    } catch (err) {
      console.error("Erreur lors de la vérification de l'authentification :", err);
      res.status(500).send("Erreur interne du serveur");
    } finally {
      if (conn) {
        conn.release();
      }
    }
  });
  

app.listen(3001, () => {
    console.log('Serveur démarré'); 
});
