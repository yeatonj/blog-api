const jwt = require('jsonwebtoken');

function genTokenMiddleware(req, res, next) {
    jwt.sign({user: user}, 'secretkey', { expiresIn: '60s' }, (err, token) => {
        res.json({
            token: token,
        });
    });
}