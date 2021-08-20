import { User } from '../../models';
import { CustomErrorHandler } from '../../services/CustomErrorHandler';


const userController = {

    async getUserDetails(req, res, next) {

        try{

            //Check whether a user is logged in
            const signed_in_user = await User.findOne({_id: req.user._id});
            //If logged in user is invalid
            if(!signed_in_user) {
                return next(CustomErrorHandler.unAuthorized());
            }

            //Get the requested user details from DB
            const user = await User.findOne({contact: req.params.contact}).select('-_id -password -updatedAt -__v');
            
            //If user is not found
            if(!user) {
                return next(CustomErrorHandler.notFound());
            }

            return res.json(user);

        } catch(err){
            return next(err);
        }

    }

}


export default userController;