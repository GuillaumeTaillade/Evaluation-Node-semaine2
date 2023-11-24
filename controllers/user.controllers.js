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
    

const login = async (req, res) => {
    const { email, password } = req.body;
    const secret = process.env.Secret_Crypto;

    // Vérifiez si tous les champs sont renseignés
    if (!email || !password) {
        req.session.message = 'Merci de remplir tous les champs';
        res.redirect('/');
        return;
    }
    
    try {
        const user = await User.findOne({ email: email });
        
        if (user) {
            const sha256Hasher = crypto.createHmac("sha256", secret);
            const hashedPassword = sha256Hasher.update(password).digest('hex');
            console.log(hashedPassword)
            console.log(user.password)
            if (hashedPassword === user.password) {
                
                
                
                console.log(email)
                res.redirect('/dashboard');
                return;
            }
        }
        
        req.session.message = 'Mauvais identifiant ou mot de passe';
        res.redirect('/login');
    } catch (err) {
        res.status(500).json({ error: "Une erreur est survenue lors de la tentative de connexion." });
    }
};


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

        res.redirect("/dashboard")
    } catch (err) {
        res.status(500).json({ error: "Une erreur est survenue lors de l'enregistrement." });
    }
};

export default {
    signup,
    login,
    viewSignup,
    viewDashboard,
    viewLogin
}