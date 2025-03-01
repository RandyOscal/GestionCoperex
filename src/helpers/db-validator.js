import Companie from "../companie/companie.model.js"

export const emailExistsCompanie = async (email = "") => {
    const existe = await Companie.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

