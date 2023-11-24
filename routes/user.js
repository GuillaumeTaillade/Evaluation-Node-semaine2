import express from "express";
import userController from "../modeles/userModele.js";

const router = express.Router();

// router.get("/", middleware, userController.home);
router.post("/signUp", userController.signup);
// router.post("/login", userController.login);
// router.delete("/delete", userController.deleteKitten);

export default router;
