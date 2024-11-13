import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string

const generateToken = (id: string, email: string, name: string, role: string) => {
    const jwt = sign({id, email, name, role}, JWT_SECRET, {expiresIn: "2h"});
    return jwt
};

const verifyToken =  (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET)
    return isOk
};

export { generateToken, verifyToken };
