import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - password
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *           example: John
 *         surname:
 *           type: string
 *           description: The user's surname
 *           example: Doe
 *         email:
 *           type: string
 *           description: The user's email
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           description: The user's password
 *           example: password123
 *         phone:
 *           type: string
 *           description: The user's phone number
 *           example: "1234567890"
 *         role:
 *           type: string
 *           description: The user's role
 *           example: ADMIN_ROLE
 *         status:
 *           type: boolean
 *           description: The user's status
 *           example: true
 */

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phone:{
        type: String,
        required: [true, "Phone is required"]
    },
    role: {
        type: String,
        required: false,
        default: "ADMIN_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timeStamps: true
});

userSchema.methods.toJSON = function () {
    const { password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

export default model("User", userSchema);