import { body } from "express-validator";
import { emailExistsCompanie } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fileds.js";
import { handleErrors } from "./handle-errors.js";

export const registerCompaniesValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("phone").notEmpty().withMessage("El telefono es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExistsCompanie),
    validarCampos,
    handleErrors
]