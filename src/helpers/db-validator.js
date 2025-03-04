import Companie from "../companie/companie.model.js"
import User from "../user/user.model.js"

export const emailExistsCompanie = async (email = "") => {
    const existe = await Companie.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const roleBlock = (value) => {
    if (value) {
        throw new Error("No puedes ingresar el role ya que se asigna por default");
        
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}