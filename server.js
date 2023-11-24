import { Express } from "express";
import dotenv from "dotenv";



dotenv.config();
const app = express();


app.listen(8000, () => {
    console.log('server start')
})