import jwt from "jsonwebtoken"

const generarJWT= (id, email) => {
    return jwt.sign({id, email}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
};

export default generarJWT;