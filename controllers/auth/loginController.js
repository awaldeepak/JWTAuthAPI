import Joi from 'joi';
import bcrypt from 'bcrypt'; 
import { User } from '../../models';
import { CustomErrorHandler } from '../../services/CustomErrorHandler';
import { JWTService } from '../../services/JWTService';


const loginController = {

    async login(req, res, next) {

        const loginSchema = Joi.object({
            contact: Joi.string().length(10).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required()
        });


        const { error } = loginSchema.validate(req.body);

        if(error) {
            return next(error);
        }

        try {
            const user = await User.findOne({ contact: req.body.contact });

            //If User not exists
            if(!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            // Compare Password
            const match = await bcrypt.compare(req.body.password, user.password);
            if(!match){
                return next(CustomErrorHandler.wrongCredentials());
            }

            // Create Token
            const access_token = JWTService.sign({ _id: user._id });

            res.json({ access_token });


        } catch(err) {
            return next(err);
        }

    }

}


export default loginController;