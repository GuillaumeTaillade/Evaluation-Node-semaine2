import crypto from "crypto";
import userSchema from "../modeles/userModele.js"




//  const signup = (req, res, next)=>{
//     const secret = process.env.Secret_Crypto
//     const password = req.body.password
//     const sha256Hasher = crypto.createHmac("sha256", secret );
//     const hash = sha256Hasher.update(password);

//     try {
//         const user= new userSchema({
//             firstName :req.body.firstName,  
//             lastName  :req.body.lastName,
//             email :req.body.email, 
//             password  :hash
//         });
//         user.save()
//              .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
//              .catch(error => res.status(400).json({ error }));
//         }
//     catch {
//         (error => res.status(500).json({ error }))
//     } ;
// };
    
const signup = async (req, res) =>{
    const { firstName, lastName, email, password } = req.body;

    const secret = process.env.Secret_Crypto
    const sha256Hasher = crypto.createHmac("sha256", secret );
    const hashedPassword = sha256Hasher.update(password);

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
}

export default {
    signup
}