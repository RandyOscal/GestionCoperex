import Companie from "./companie.model.js";
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Register a new company
 *     tags: [Companies]
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
export const registerCompanies = async (req, res) => {
    try {
        const data = req.body;

        const companie = await Companie.create(data);

        return res.status(201).json({
            message: "Companie has been created",
            name: companie.name,
            email: companie.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "Companie registration failed",
            error: err.message
        });
    }
};

/**
 * @swagger
 * /companies/list:
 *   post:
 *     summary: List companies with filters and sorting
 *     tags: [Companies]
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
export const listCompanies = async (req, res) => {
    try {
        const { filter, order } = req.body;

        if (!filter || !order) {
            return res.status(400).json({
                message: "Falta el filtro u orden",
            });
        }

        const validFilters = ['category', 'impactLevel', 'yearsOfExperience', 'name'];

        if (!validFilters.includes(filter)) {
            return res.status(400).json({
                message: "El filtro no es válido. Los filtros disponibles son: 'category', 'impactLevel', 'yearsOfExperience', 'name'.",
            });
        }
        
        let query = {}; 
        let sort = {};

        switch (filter) {
            case 'category':
                if (req.body.value) {
                    query = { category: req.body.value }; 
                }
                break;
            case 'impactLevel':
                if (req.body.value) {
                    query = { impactLevel: req.body.value }; 
                }
                break;
            case 'yearsOfExperience':
                sort = { yearsOfExperience: order === 'asc' ? 1 : -1 };
                break;
            case 'name':
                sort = { name: order === 'asc' ? 1 : -1 };
                break;
            default:
                return res.status(400).json({ message: "El filtro no es válido" });
        }

        if (req.body.value && (filter === 'name' || filter === 'impactLevel')) {
            switch (filter) {
                case 'name':
                    query = { name: new RegExp(req.body.value, 'i') }; 
                    break;
                case 'impactLevel':
                    query = { impactLevel: req.body.value }; 
                    break;
            }
        }

        const companies = await Companie.find(query).sort(sort);

        return res.status(200).json({
            message: "Empresas listadas",
            companies,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al obtener las empresas",
            error: err.message,
        });
    }
};

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update a company by ID
 *     tags: [Companies]
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
export const updateCompanie = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const companies = await Companie.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'Empresa Actualizada',
            companies,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la empresa',
            error: err.message
        });
    }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @swagger
 * /companies/excel:
 *   get:
 *     summary: Generate an Excel report of companies
 *     tags: [Companies]
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
export const excelReport = async (req, res) => {
    try {
        const companies = await Companie.find();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Empresas");

        worksheet.columns = [
            { header: "Nombre", key: "name", width: 30 },
            { header: "Email", key: "email", width: 30 },
            { header: "Teléfono", key: "phone", width: 20 },
            { header: "Categoría", key: "category", width: 30 },
            { header: "Nivel de Impacto", key: "impactLevel", width: 20 },
            { header: "Años de Experiencia", key: "yearsOfExperience", width: 20 },
            { header: "Estado", key: "status", width: 15 },
        ];

        companies.forEach((companie) => {
            worksheet.addRow({
                name: companie.name,
                email: companie.email,
                phone: companie.phone,
                category: companie.category,
                impactLevel: companie.impactLevel,
                yearsOfExperience: companie.yearsOfExperience,
                status: companie.status ? "Activo" : "Inactivo",
            });
        });

        const reportsDir = path.join(__dirname, "../report");
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }

        const filePath = path.join(reportsDir, "empresas.xlsx");

        await workbook.xlsx.writeFile(filePath);

        return res.status(200).json({
            message: "Reporte generado con éxito",
            filePath: filePath,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al generar el reporte",
            error: err.message,
        });
    }
};