import Joi from 'joi';
import { RefreshToken, User } from '../../models';
import { CustomErrorHandler } from '../../services/CustomErrorHandler';
import { JWTService } from '../../services/JWTService';
import { REFRESH_SECRET } from '../../config';


const refreshController = {

    async refresh(req, res, next) {

        // Validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });

        const { error } = refreshSchema.validate(req.body);
        if(error) {
            return next(error);
        }

        // Check refresh token in database
        let refreshtoken;
        try {

            refreshtoken = await RefreshToken.findOne({ token: req.body.refresh_token });
            if(!refreshtoken) {
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
            }

            let userId;
            try {

                const { _id } = await JWTService.verify(refreshtoken.token, REFRESH_SECRET);
                userId = _id;

            } catch(err) {
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
            }

            const user = await User.findOne({ _id: userId });
            if(!user){
                return next(CustomErrorHandler.unAuthorized('Invalid logged in user'));
            }

            // Create Tokens
            const access_token = JWTService.sign({ _id: user._id });
            const refresh_token = JWTService.sign({ _id: user._id }, '1y', REFRESH_SECRET);

            // whitelist refresh token in database
            await RefreshToken.create({ token: refresh_token });

            res.json({ 
                message: 'Refresh token generated successfully',
                access_token, 
                refresh_token });


        } catch(err) {

            return next(err);
        }

    }
}

export default refreshController;