import { body } from "express-validator";
import { emailExists, roleBlock } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fileds.js";
import { handleErrors } from "./handle-errors.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("phone").notEmpty().withMessage("El telefono es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("role").optional().custom(roleBlock),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]