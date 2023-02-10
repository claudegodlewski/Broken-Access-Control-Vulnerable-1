// Importation du package Express.
const express = require('express');

// Importation des middlewares et du contrôleur.
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const postCtrl = require('../controllers/post');

// Permet de créer un routeur pour les routes de l'application.
const router = express.Router();

// Routeur Express.
router.post('/', auth, multer, postCtrl.postMessage);
router.get('/', auth, postCtrl.getAllMessages);
router.delete('/:id', auth, postCtrl.deleteMessage);

// Exportation du routeur.
module.exports = router;