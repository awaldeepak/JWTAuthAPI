import Joi from "joi";
import { User } from '../../models';
import { CustomErrorHandler } from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import { JWTService } from '../../services/JWTService';


const registerController = {

    async register(req, res, next) {


        // CHECKLIST
        // [ ] validate the request
        // [ ] authorise the request
        // [ ] check if user is in the database already
        // [ ] prepare model
        // [ ] store in database
        // [ ] generate jwt token
        // [ ] send response

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            contact: Joi.string().length(10).required(),
            address: Joi.string().required(),
            gender: Joi.any().valid('male', 'female', 'other').required(),
            country: Joi.string().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
            confirm_password: Joi.ref('password')
        });

        const { error } = registerSchema.validate(req.body);

        if(error) {
            return next(error);
        }

        //Check if user is already exists
        try {
            const exist = await User.exists({ contact: req.body.contact });
            if(exist) {
                return next(CustomErrorHandler.alreadyExist());
            }
        } catch(err) {
            return next(err);
        }
        
        const { name, contact, address, gender, country, password } = req.body;

        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Prepare Model
        const user = new User({
            name,
            contact,
            address,
            gender,
            country,
            password: hashedPassword
        });

        let access_token;

        try {

            const result = await user.save();
            console.log(result);

            // Create Token
            access_token = JWTService.sign({ _id: result._id });



        } catch(err) {
            return next(err);

        }


        return res.json({
            access_token: access_token
        });
    }
}


export default registerController;