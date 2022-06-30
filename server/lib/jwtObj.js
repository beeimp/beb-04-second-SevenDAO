import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

const h = 60 * 60;

dotenv.config();
const secret = process.env.JWT_SECRET;
const jwtOptions = { expiresIn: 1*h };


const jwtSign = (payload) => {
    return jwt.sign(payload,secret, jwtOptions);
}

const jwtVerify = (token) => {
    return jwt.verify(token,secret);
}


export default {
    jwtSign : jwtSign,
    jwtVerify : jwtVerify
};



