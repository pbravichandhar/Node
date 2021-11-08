const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./baseError')

class customError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'Not found.',
        isOperational = true
    ) {
        super(name, statusCode, description, isOperational)
    }
}

module.exports = customError