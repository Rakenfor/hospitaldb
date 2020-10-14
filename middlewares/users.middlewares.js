const { request, response } = require('express');
const jwt = require('jsonwebtoken');

// const fieldValidator = (req = require, res = response, next) => {

// }
const tokenVerify = (req = request, res = response, next) => {
    let token = req.headers.token;

    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }
        req.user = decode.user
        next();
    });
}

module.exports = {
    tokenVerify
}