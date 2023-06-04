class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Not authorized');
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}

function errorMiddleware(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    return res.status(500).json({message: "Произошла непредвиденная ошибка"});
}

module.exports = {
    ApiError,
    errorMiddleware
};