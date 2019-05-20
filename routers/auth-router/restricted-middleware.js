const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = 'keept it secret, keep it safe';
    jwt.verify(token, secret, (err, decodedToken) => {
        if(err) {
            res.status(401).json({message: "there's some error!"});
        } else {
            req.decodedToken = decodedToken;
            next();
        }
    })
}
