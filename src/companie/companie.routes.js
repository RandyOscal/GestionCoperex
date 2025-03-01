import { Router } from "express";
import { registerCompanies, listCompanies, updateCompanie, excelReport } from "./companies.controller.js";
import { registerCompaniesValidator } from "../middlewares/companie-validator.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { hasRoles } from "../middlewares/validate-roles.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: API for managing companies
 */

/**
 * @swagger
 * /registerCompanies:
 *   post:
 *     summary: Register a new company
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Companie'
 *     responses:
 *       201:
 *         description: Companie has been created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       500:
 *         description: Companie registration failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.post("/registerCompanies", validateJWT, hasRoles("ADMIN_ROLE"), registerCompaniesValidator, registerCompanies);

/**
 * @swagger
 * /updateCompanies/{id}:
 *   put:
 *     summary: Update a company by ID
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The company ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Companie'
 *     responses:
 *       200:
 *         description: Empresa Actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 companies:
 *                   $ref: '#/components/schemas/Companie'
 *       500:
 *         description: Error al actualizar la empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.put("/updateCompanies/:id", validateJWT, hasRoles("ADMIN_ROLE"), updateCompanie);

/**
 * @swagger
 * /reportCompanies:
 *   get:
 *     summary: Generate an Excel report of companies
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reporte generado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 filePath:
 *                   type: string
 *       500:
 *         description: Error al generar el reporte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get("/reportCompanies", validateJWT, hasRoles("ADMIN_ROLE"), excelReport);

/**
 * @swagger
 * /listCompanies:
 *   post:
 *     summary: List companies with filters and sorting
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: string
 *                 enum: [category, impactLevel, yearsOfExperience, name]
 *               order:
 *                 type: string
 *                 enum: [asc, desc]
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresas listadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 companies:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Companie'
 *       400:
 *         description: Invalid filter or order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al obtener las empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.post("/listCompanies", validateJWT, hasRoles("ADMIN_ROLE"), listCompanies);

export default router;