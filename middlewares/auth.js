import { CustomErrorHandler } from "../services/CustomErrorHandler";
import { JWTService } from "../services/JWTService";

const auth = async (req, res, next) => {

    let authHeader = req.headers.authorization;

    if(!authHeader){
        return next(CustomErrorHandler.unAuthorized());
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const { _id } = await JWTService.verify(token);
        const user = {
            _id
        };
        req.user = user;
        next();

    } catch (err) {
        return next(CustomErrorHandler.unAuthorized());
    }


}

export default auth;