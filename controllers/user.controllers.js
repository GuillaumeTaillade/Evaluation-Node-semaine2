import {readFileSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import crypto from "crypto";
import User from "../modeles/userModele.js"




//  const signup = (req, res, next)=>{
//     const secret = process.env.Secret_Crypto
//     const password = req.body.password
//     const sha256Hasher = crypto.createHmac("sha256", secret );
//     const hash = sha256Hasher.update(password);

//     try {
//         const user= new userSchema({
//             firstname :req.body.firstname,  
//             lastname  :req.body.lastname,
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
const cwd = process.cwd()
const htmlPath = join(cwd, 'views')

const viewSignup = (req, res) => {
    try {
        let html = readFileSync(join(htmlPath, 'signup.html'), 'utf8');
        res.status(200).send(html); // Utilisez res.send pour envoyer du HTML brut
    } catch(err) {
        res.status(404).send('Page not found');
    }
};

const viewDashboard = (req, res) => {
    try {
        let html = readFileSync(join(htmlPath, 'dashboard.html'), 'utf8');
        res.status(200).send(html); // Utilisez res.send pour envoyer du HTML brut
    } catch(err) {
        res.status(404).send('Page not found');
    }
};
const viewLogin = (req, res) => {
    try {
        let html = readFileSync(join(htmlPath, 'login.html'), 'utf8');
        res.status(200).send(html); // Utilisez res.send pour envoyer du HTML brut
    } catch(err) {
        res.status(404).send('Page not found');
    }
};
    

// const login = (req,res) => {
//     const {email, password} = req.body
//     const {email: e, password: p} = user

//     req.session.auth = false

//     if(!login || !password) {
//         req.session.message = 'Merci de remplir tout les champs';
//         res.redirect('/')
//         return
//     }

//     if(login === l && SHA1(password).toString() === p) {
//         req.session.auth = true;
//         req.session.message = 'Connexion reussi';

//         res.redirect('/dashboard');
//         return
//     }

//     req.session.message = 'Mauvais identifiant'
//     res.redirect('/')
// }

const signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    console.log(firstname)

    // Vérifiez si tous les champs sont renseignés
    if (!firstname ||  !lastname || !email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
    }

    // Hashage du mot de passe
    const secret = process.env.Secret_Crypto;
    const sha256Hasher = crypto.createHmac("sha256", secret);
    const hashedPassword = sha256Hasher.update(password).digest('hex');

    try {
        // Créez un nouvel utilisateur
        const newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
        res.redirect("/dashboard")
    } catch (err) {
        res.status(500).json({ error: "Une erreur est survenue lors de l'enregistrement." });
    }
};

export default {
    signup,
    // login,
    viewSignup,
    viewDashboard,
    viewLogin
}