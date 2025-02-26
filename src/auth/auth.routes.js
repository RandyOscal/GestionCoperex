import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { hasRoles } from "../middlewares/validate-roles.js";
import { registerValidator, loginValidator } from "../middlewares/user-validator.js";

const router = Router();

router.post("/register", registerValidator, hasRoles("ADMIN_ROLE"), register);

router.post("/login", loginValidator, login);

export default router;