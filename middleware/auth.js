const authMiddleware = (req, res, next) => {
  // Vérifiez si l'utilisateur est connecté
  if (req.session && req.session.user) {
    req.session.message = "Vous êtes connecté";
    // Si l'utilisateur est connecté, continuez vers la page du tableau de bord
    return next();
  } else {
    req.session.message = "Accès refusée";
    // Si l'utilisateur n'est pas connecté, il est redirigé vers la page de connexion
    res.redirect('/login');
  }
};

module.exports = authMiddleware;