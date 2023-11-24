import crypto from "crypto";
import {userSchema} from "modeles/userModele.js"



export const signup = (req, res, next)=>{
    const password = req.body.password
    const sha256Hasher = crypto.createHmac("sha256", password);
    try {
        const user= new userSchema({
            firstName :req.body.firstName,  
            lastName  :req.body.lastName,
            email :req.body.email, 
            password  :sha256Hasher
        });
        user.save()
             .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
                .catch(error => res.status(400).json({ error }));
        }
    catch {
        (error => res.status(500).json({ error }))
    } ;
};
    


