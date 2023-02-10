// Modèle de création des messages.
const Post = require ('../models/post');

// Manipulation des fichiers.
const fs = require('fs');

// ### Poster ###
exports.postMessage = (req, res) => {
  // Copie du corps de la requête avec "..." (opérateur spread).
  const postObject = { ...req.body };
  // Création d'un message avec le modèle "Post".
  const post = new Post({
    ...postObject,
    // "imageUrl: http://localhost:3000/images/exemple.png".
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  // Enregistrement dans la base de données.
  post.save()
  .then(() => res.status(201).json({ message: 'Message posté.' }))
  .catch(error => res.status(400).json({ error }));
};

// ### Voir ###
exports.getAllMessages = (req, res) => {
  // Affichage du plus récent au plus ancien.
  const sort = { _id: -1}
  Post.find().sort(sort)
  .then((posts) => { res.status(200).json(posts) })
  .catch((error) => { res.status(400).json({ error: error }) });
}

// ### Supprimer ###
exports.deleteMessage = (req, res) => {
  // Recherche du message à supprimer.
  Post.findOne({ _id: req.params.id }).then((a) => {
      // Faille volontaire (exemple).
      if (1 == 1) {
        Post.findOne({ _id: req.params.id })
        .then(post => {
          // Suppression de l'image.
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Message supprimé.'}))
            .catch(error => res.status(400).json({ error }));
          });
        })
      } else {
          res.status(403).json({ message: "Non autorisé."})
        }
  })
};