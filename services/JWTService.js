import { JWT_SECRET } from '../config';
import jwt from 'jsonwebtoken';


export class JWTService {

    static sign(payload, expiry = '60s', secret = JWT_SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }

}