const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                //cant created token
                reject('can not generate the Json web token');
            } else {
                //return token
                resolve(token);
            }
        })
    });
}

module.exports = {
    generateJWT
}