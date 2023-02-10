// Décodage des tokens.
const jwt = require('jsonwebtoken');

const env = require('dotenv').config();
 
module.exports = (req, res, next) => {
  try {
    // Extraction du token du header "Authorization" de la requête entrante.
    const token = req.headers.authorization.split(' ')[1];
    // Vérification de la validité du token.
    const decodedToken = jwt.verify(token, process.env.secretToken);
    // userId + status de l'utilisateur ajoutés à l'objet request "req".
    const userId = decodedToken.userId;
    const systemAdministrator = decodedToken.systemAdministrator;
    // Objet accessible depuis les routes.
    req.auth = {
      userId: userId,
      systemAdministrator: systemAdministrator
    };
	  next();
  } catch(error) {
       res.status(401).json({ error });
    }
};