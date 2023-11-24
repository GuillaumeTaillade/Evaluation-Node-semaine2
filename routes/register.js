
import express from "express";
import User from "../modeles/userModele.js"

router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Vérifiez si tous les champs sont renseignés
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  // Vérifiez si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
  }

  // Créez un nouvel utilisateur
  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword
  });

  // Sauvegarde dans la base de données
  newUser.save((err) => {
    if (err) {
      return res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement.' });
    }
    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  });
});

module.exports = router;