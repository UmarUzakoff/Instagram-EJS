const jwt = require('../utils/jwt');

const tokenMiddleware = (req, res, next) => {
    try {
        // console.log(req.cookies);
        const token = req.cookies.token;
        // console.log(token);
        if (!token) {
            return res.status(401).redirect("/api/auth/login");
        }
        const verifyToken = jwt.verify(token);
        req.verifiedUser = verifyToken.id;
        // console.log(req.verifiedUser);
        next();
    } catch (error) {
        res.status(401).redirect("/api/auth/login");
    }
}

module.exports = tokenMiddleware;