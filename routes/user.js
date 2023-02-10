// Importation du package Express.
const express = require('express');

// Importation du contrôleur.
const userCtrl = require('../controllers/user');

// Permet de créer un routeur pour les routes de l'application.
const router = express.Router();

// Routeur Express.
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du routeur.
module.exports = router;