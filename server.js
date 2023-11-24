import express  from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";



dotenv.config
();
const app = express();

app.use(express.json()); // Pour les requêtes JSON
app.use(express.urlencoded({ extended: true }));

app.use("/",userRoute)



const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});