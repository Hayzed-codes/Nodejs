
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers["Authorized"]
    if (!authHeader) return res.sendStatus (401);
    console.log(authHeader); // Bearer
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403); // Invalid token
            req.user = decoded.username
            next()
        }
    )
}

module.exports = verifyJWT