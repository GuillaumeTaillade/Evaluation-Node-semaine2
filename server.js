import express  from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";

//import middleware sécurité
import authMiddleware from "./middleware/auth.js"

dotenv.config
();
const app = express();

app.use(express.json()); // Pour les requêtes JSON
app.use(express.urlencoded({ extended: true }));


app.use("/",userRoute)

/////
// Protégez la page du tableau de bord en utilisant le middleware de sécurité
app.get('/dashboard', authMiddleware, (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
  });
/////

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

