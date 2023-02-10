// Simplification des interactions entre l'app Express et MongoDB.
const mongoose = require('mongoose');

// Création d'un schéma de données pour les messages.
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  systemUser: { type: String, required: true },
  dateHeure: { type: String, required: true },
  text: { type: String, trim: true, maxlenght: 500 },
  imageUrl: { type: String, required: true },
});

// Rends le modèle utilisable.
module.exports = mongoose.model('Post', postSchema);
