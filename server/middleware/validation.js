var DBConnection = require('../helpers/db');
var CustomError = require('../helpers/CustomError');

var registerValidation = (req, res, next) => {
    var first_name = req.query.first_name ?? "";
    var last_name = req.query.last_name ?? "";
    var email = req.query.email ?? "";
    var password = req.query.password ?? "";

    if (!first_name) {
        throw new CustomError(400, "ERR_MISSING_FIRST_NAME");
    }

    if (!last_name) {
        throw new CustomError(400, "ERR_MISSING_LAST_NAME");
    }

    if (!email) {
        throw new CustomError(400, "ERR_MISSING_EMAIL");
    }

    if (!password) {
        throw new CustomError(400, "ERR_MISSING_PASSWORD");
    }

    if (password.length < 6) {
        throw new CustomError(400, "ERR_PASSWORD_TOO_SHORT");
    }

    if (!validateEmail(email)) {
        throw new CustomError(400, "ERR_BAD_EMAIL");
    }

    emailAlreadyExists(email).then(res => {
        if (res) {
            // Email already exists
            req.error = new CustomError(400, "ERR_EMAIL_ALREADY_EXISTS");
        }

        // Continue...
        next();
    }).catch(err => {
        // Mysql error
        req.error = new CustomError(500, err.code);
        next();
    });

    // throw new Error(username);
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function emailAlreadyExists(email) {
    return new Promise(async (resolve, reject) => {
        try {
            var conn = await DBConnection();
        }catch(err) {
            reject(err);
        }
        conn.query("SELECT * FROM users WHERE email = ?", [email]).then(res => {
            if (res.length > 0) {
                resolve(true)
            } else {
                resolve(false)
            }
        }).catch(err => {
            reject(err);
        });
        
    })
}

module.exports = {
    registerValidation: registerValidation
}