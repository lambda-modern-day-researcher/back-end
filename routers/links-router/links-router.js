const router = require('express').Router();

const Links = require('./links-model.js');
const restricted = require('../auth-router/restricted-middleware.js');

router.get('/user/:id/links', (req, res) => {
    console.log(req.query.priority)
    if(req.query.priority) {
        Links.findBy(req.params.id, req.query.priority)
        .then(links => {
            res.json(links);
        })
        .catch(err => res.send(err));                
    } else {
        Links.findBy(req.params.id, false)
        .then(links => {
            res.json(links);
        })
        .catch(err => res.send(err));
    }
});


module.exports = router;
