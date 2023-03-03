const jwt = require('jsonwebtoken')
const config = require('../config/config')

const veryfyToken = async (req, res, next) => {

    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({ "status": false, "message": "Please Login first" });
    }
    try {
        const decoded = jwt.verify(token, config.secrect_key);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({ "status": false, "msg": "invalid Token Access" });
    }
    return next();

}
module.exports = veryfyToken