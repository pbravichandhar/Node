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
    if (!err.statusCode) {
        // If I havent get proper error code then trigger mail it means that some where code breaks
        // Send mail here
        console.error('Un Handled Error', err)
    }
    logError(err);
    return res.status(err.statusCode || 500).send({
        error: {
            status: err.statusCode || 500,
            // We use condition here because if we have unhandled error we will show simply 'Something Went Wrong'
            message: err.statusCode ? err.message : 'Something Went Wrong'
        }
    })
}

module.exports = {
    logError,
    logErrorMiddleware,
    returnError,
    handleErrorAsync,
}