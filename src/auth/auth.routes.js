import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/user-validator.js";
import { hasRoles } from "../middlewares/validate-roles.js";
import { validateJWT } from "../middlewares/validate-jwt.js"


const router = Router();

router.post("/register", validateJWT, hasRoles("ADMIN_ROLE"), registerValidator, register);

router.post("/login", loginValidator, login);

export default router;