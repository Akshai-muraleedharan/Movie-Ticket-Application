import jwt from "jsonwebtoken";

export const createToken = (email, role,isALive) => {
    const token = jwt.sign({ email: email, role: role,isALive:isALive}, process.env.JWT_KEY);
    
    return token;
}; 