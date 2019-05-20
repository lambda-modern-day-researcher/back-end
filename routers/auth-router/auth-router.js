const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users-router/users-model.js')

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 3)
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then((user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token,
                });
            } else {
                res.status(401).json({ message: 'You shall not pass' });
            }
        }))
        .catch(error => {
            res.status(500).json(error);
        })
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        roles: ['student']
    };

    const secret = 'keept it secret, keep it safe';

    const options = {
        expiresIn: '1h',
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;