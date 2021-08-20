import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
    }
});


const RefreshToken = mongoose.model('refreshToken', refreshTokenSchema, 'refreshTokens');

export default RefreshToken;
