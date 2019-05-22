const router = require('express').Router();

const db = require('./links-model.js');
const restricted = require('../auth-router/restricted-middleware.js');

router.get('/:id/links', (req, res) => {
    if(req.query.priority) {
        db.findBy(req.params.id, req.query.priority)
        .then(links => {
            res.status(200).json(links);
        })
        .catch(err => res.send(err));                
    } else {
        db.findBy(req.params.id, false)
        .then(links => {
            res.status(200).json(links);
        })
        .catch(err => res.send(err));
    }
});

router.get('/:id/categories', (req, res) => {
    db.findByCategory(req.params.id)
        .then(categories => {
            res.status(200).json(categories)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/:id/categories', (req, res) => {
    const category = { 
        title: req.body.title, 
        color: req.body.color, 
        created_by: req.params.id 
    } 
    db.addCategory(category)
        .then(category => {
            res.status(200).json({message: `you've added a nuew category`, category})
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router;
