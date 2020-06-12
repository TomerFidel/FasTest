class CustomError {
    constructor(status, msg) {
        return {
            status: status,
            message: msg
        }
    }
}

module.exports = CustomError;