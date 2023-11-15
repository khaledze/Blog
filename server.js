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
app.get('/articles/:id', async (req, res) => {
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
app.get('/articles/:titre', async (req, res) => {
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


app.listen(3001, () => {
    console.log('Serveur démarré'); 
});

