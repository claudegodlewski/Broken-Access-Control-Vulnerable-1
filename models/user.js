// Simplification des interactions entre l'app Express et MongoDB.
const mongoose = require('mongoose');

// Simplification des messages d'erreurs en cas d'erreurs (unicité).
const uniqueValidator = require('mongoose-unique-validator');

// Création d'un schéma de données pour les utilisateurs.
const userSchema = mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  systemUser: { type: String, required: true },
  systemAdministrator: { type: Boolean, required: false},
});

userSchema.plugin(uniqueValidator);

// Rends le modèle utilisable.
module.exports = mongoose.model('User', userSchema);