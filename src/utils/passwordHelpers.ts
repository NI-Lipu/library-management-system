import bcrypt from "bcrypt"

const hashPassword = async (plainPassword: string) => {
    return await bcrypt.hash(plainPassword, 10);
}

const comparePassword = async (plainPassword: string, hashPassword: string) => {
    return await bcrypt.compare(plainPassword, hashPassword)
}

export const passwordHelpers = {
    hashPassword,
    comparePassword
}