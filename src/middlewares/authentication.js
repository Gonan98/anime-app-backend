const jwt = require('jsonwebtoken');

const verifyToken = function(req, res, next) {

    const token = req.headers['access-token'];

    if(!token) {
        return res.status(401).json({
            auth: false,
            message: 'Debe autenticarse'
        });
    }

    try {

        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'mysecrettoken');
        req.user_id = payload.id;
        next();

    } catch (error) {

        res.status(400).json({
            auth: false,
            message: 'Token no valido'
        });

    }

}

module.exports = {verifyToken}