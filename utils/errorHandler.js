logError = (err) => {
    console.error(err)
}

logErrorMiddleware = (err, req, res, next) => {
    logError(err)
    next(err)
}


handleErrorAsync = func => async (req, res, next) => {
    try {
        await func(req, res, next);
    } catch (error) {
        next(error);
    }
};

returnError = (err, req, res, next) => {
    // Mailer
    // if (!err.isOperational) sendMail()
    logError(err);
    return res.status(err.statusCode || 500).send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
}

isOperationalError = (error) => {
    if (error instanceof BaseError) {
        return error.isOperational
    }
    return false
}

module.exports = {
    logError,
    logErrorMiddleware,
    returnError,
    isOperationalError,
    handleErrorAsync,
}