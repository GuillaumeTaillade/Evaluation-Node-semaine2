import express from "express";
import userController from "../modeles/userModele.js";

const router = express.Router();

router.get("/", middleware, kittenController.home);
router.get("/signUp", kittenController.addUser);
router.post("/login", kittenController.login);
router.delete("/delete", kittenController.deleteKitten);

export default router;
