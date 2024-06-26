const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, } = process.env

async function jwtMiddleware(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).send('Unauthorized');
        }

        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        const decodedData = jwt.verify(token, PRIVATE_KEY);
        req.userData = decodedData
        next();
    } catch (error) {
        console.log(error)
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            return res.status(401).send('Unauthorized');
        }
        return res.status(500).send('Server Error');
    }
}

module.exports = {
    jwtMiddleware,
}