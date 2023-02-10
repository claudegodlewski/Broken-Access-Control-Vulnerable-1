// Importation des modules avec "require" (système de modules CommonJS).
const express = require('express');
// Simplification des interactions entre l'app Express et MongoDB.
const mongoose = require('mongoose');
// Routes.
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
// Permet de travailler avec les fichiers et les répertoires.
const path = require('path');
// Variable d'environnement.
const env = require('dotenv').config();
// Création d'une application express.
const app = express(); 

// Base de données: dissimulation des informations d'identification ("User", "Password", et "Cluster") à l'aide de variables d'environnement.
mongoose.connect(
  `mongodb+srv://${process.env.User}:${process.env.Password}@${process.env.Cluster}.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Connecté'))
.catch(() => console.log('Déconnecté'));

// Cross Origin Resource Sharing: autorisation des appels HTTP entre les serveurs.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Mise à disposition des corps JSON/body pour toutes les requêtes de types "Content-Type": directement sur objet "req" du middleware.
app.use(express.json());

// Routes / Endpoints.
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

// Exportation de l'application.
module.exports = app;