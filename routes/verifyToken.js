const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) return res.status(401).json("Token is not valid!");
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === "ROLE_ADMIN") {
            next();
        } else {
            return res.status(403).json("You are not allowed to do that!");
        }
    });
};

const verifyTokenAndOwner = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "ROLE_OWNER" || req.user.role === "ROLE_ADMIN") {
            next();
        } else {
            return res.status(403).json("You are not allowed to do that!");
        }
    });
};
const verifyTokenAndOwnerOnRUD = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "ROLE_OWNER" && req.params.id === req.user.id || req.user.role === "ROLE_ADMIN") {
            next();
        } else {
            return res.status(403).json("You are not allowed to do that!");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "ROLE_ADMIN") {
            next();
        } else {
            return res.status(403).json("You are not allowed to do that!");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndOwner, verifyTokenAndOwnerOnRUD };