import { Express } from "express";
import dotenv from "dotenv";



dotenv.config();
const app = express();




const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});