import Joi from 'joi';
import bcrypt from 'bcrypt'; 
import { RefreshToken, User } from '../../models';
import { CustomErrorHandler } from '../../services/CustomErrorHandler';
import { JWTService } from '../../services/JWTService';
import { REFRESH_SECRET } from '../../config';
import sanitize from 'mongo-sanitize';


const loginController = {

    async login(req, res, next) {

        // Validation
        const loginSchema = Joi.object({
            contact: Joi.string().length(10).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required()
        });


        const { error } = loginSchema.validate(req.body);

        if(error) {
            return next(error);
        }

        try {
            const user = await User.findOne({ contact: sanitize(req.body.contact) });

            //If User not exists
            if(!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            // Compare Password
            const match = await bcrypt.compare(sanitize(req.body.password), user.password);
            if(!match){
                return next(CustomErrorHandler.wrongCredentials());
            }

            // Create Tokens
            const access_token = JWTService.sign({ _id: user._id });
            const refresh_token = JWTService.sign({ _id: user._id }, '1y', REFRESH_SECRET);

            // whitelist refresh token in database
            await RefreshToken.create({ token: refresh_token });

            res.json({ 
                message: 'Logged in successfully',
                access_token, 
                refresh_token 
            });


        } catch(err) {
            return next(err);
        }

    },

    async logout(req, res, next){

        // Validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });


        const { error } = refreshSchema.validate(req.body);

        if(error) {
            return next(error);
        }

        // Delete refresh token from database
        try {

            await RefreshToken.deleteOne({ token: req.body.refresh_token});

        } catch(err) {
            return next(err);
        }

        return res.status(200).json({
            message: 'Logged out successfully'
        });
    }

}


export default loginController;