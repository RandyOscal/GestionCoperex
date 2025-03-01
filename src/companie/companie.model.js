import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Companie:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - category
 *         - impactLevel
 *         - yearsOfExperience
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the company
 *           example: "TechCorp"
 *         email:
 *           type: string
 *           description: The email of the company
 *           example: "techcorp@example.com"
 *           unique: true
 *         phone:
 *           type: string
 *           description: The phone number of the company
 *           example: "+1234567890"
 *         category:
 *           type: string
 *           description: The category of the company
 *           example: "Technology"
 *         impactLevel:
 *           type: string
 *           description: The impact level of the company
 *           enum: ["ALTO", "MEDIO", "BAJO"]
 *           example: "ALTO"
 *         yearsOfExperience:
 *           type: number
 *           description: The years of experience of the company
 *           example: 5
 *         status:
 *           type: boolean
 *           description: The status of the company
 *           example: true
 */

const companieSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true
    },
    phone:{
        type: String,
        required: [true, "Phone is required."]
    },
    category: {
        type: String,
        required: [true, "Category is required."]
    },
    impactLevel:{
        type: String,
        required: [true, "Impact level is required."],
        enum: ["ALTO", "MEDIO", "BAJO"]
    },
    yearsOfExperience:{
        type: Number,
        required: [true, "Years of experience ir required."]
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timeStamps: true
});

export default model("Companie", companieSchema);