// Hashage des mots de passe.
const bcrypt = require ('bcrypt');

// Modèle de création des utilisateurs.
const User = require('../models/user');

// Chiffrement des e-mails.
const CryptoJS = require('crypto-js');

// Création des tokens.
const jwt = require('jsonwebtoken');

// Variable d'environnement.
const env = require('dotenv').config();

// ### S'inscrire ###
exports.signup = (req, res) => {
  // Hashage du mot de passe x10.
  bcrypt.hash(req.body.password, 10)
  .then(motDePasseChiffre => {
    // Création de l'utilisateur.
    const user = new User({
      // Mot de passe.
      password: motDePasseChiffre,
      // E-mail.
      email: CryptoJS.RIPEMD160(req.body.email, process.env.secretEmail).toString(),
      // Pseudo.
      systemUser: req.body.systemUser,
      // Status de l'utilisateur.
      systemAdministrator: false,
    });
    // Enregistrement dans la base de données.
    user.save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé.' }))
    .catch(error => res.status(500).json({ error }));
  })
};

// ### Se connecter ###
exports.login = (req, res) => {
  // Recherche de l'utilisateur dans la base de données.
  User.findOne({ email: CryptoJS.RIPEMD160(req.body.email, process.env.secretEmail).toString() })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé.' });
    }
    // Comparaison du mot de passe de l'utilisateur avec celui qui est stocké (hash). 
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect.' });
      }
      res.status(200).json({
        // Token (expiration: 7 heures).
        token: jwt.sign({ userId: user._id,systemUser: user.systemUser,systemAdministrator: user.systemAdministrator },process.env.secretToken,{ expiresIn: '7h' }),
        // Id.
        userId: user._id,
        // Pseudo.
        systemUser: user.systemUser,
        // Status.
        systemAdministrator: user.systemAdministrator,
      })
    })
    .catch(error => res.status(500).json({ error }));
  })
};