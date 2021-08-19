export class CustomErrorHandler extends Error {

    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static alreadyExist(message='User with contact already exists') {

        return new CustomErrorHandler(409, message);
    }

    static wrongCredentials(message='Username/Contact or password is incorrect!') {

        return new CustomErrorHandler(401, message);
    }

    static unAuthorized(message='Unauthorized') {

        return new CustomErrorHandler(401, message);
    }
}