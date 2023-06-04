const {ApiError} = require('./error');
const {verify} = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        const authHeaders = req.headers.authorization;
        if (!authHeaders) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authHeaders.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const user = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!user) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = user;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}