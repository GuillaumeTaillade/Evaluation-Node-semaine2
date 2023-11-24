import express from "express";
import userController from "../controllers/user.controllers.js";

const router = express.Router();

// router.get("/", middleware, userController.home);
router.get("/", userController.viewSignup);
router.get("/dashboard", userController.viewDashboard);
router.post("/signUp", userController.signup);
router.get("/login", userController.viewLogin);
// router.post("/login", userController.login);
// router.delete("/delete", userController.deleteKitten);

export default router;
