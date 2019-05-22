const router = require('express').Router();

const db = require('./links-model.js');
const restricted = require('../auth-router/restricted-middleware.js');

router.get('/:id/links', (req, res) => {
    if(req.query.priority) {
        db.findByPinned(req.params.id, req.query.priority)
        .then(links => {
            res.status(200).json(links);
        })
        .catch(err => res.send(err));                
    } else if (req.query.category) {
        db.findByCategory(req.params.id, req.query.category)
        .then(links => {
            res.status(200).json(links);
        })
        .catch(err => res.send(err));                
    } else {
        db.findByPinned(req.params.id, false)
        .then(links => {
            res.status(200).json(links);
        })
        .catch(err => res.send(err));
    }
});

router.get('/:id/categories', (req, res) => {
    db.findAllCategory(req.params.id)
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
            res.status(200).json({message: `you've added a new category`, category})
        })
        .catch(err => {
            res.send(err)
        })
})

router.delete('/:id/links', (req, res) => {
    if(req.query.category) {
        db.findCategoryCreator(req.query.category)
        .then(res => {
            if(req.params.id = res[0].created_by) {
                db.remove(req.query.category)
                    .then(response => {
                        res.status(200).json({message: 'category deleted successfully', response})
                    })
                    .catch(err => {
                        console.log(err)
                        // res.send(500).json(err)
                    })
            } else {
                res.status(401).json({message: 'you can only delete categories created by you'})
            }
        })
        .catch(err => {
            res.send(err)
        })
    }
})

module.exports = router;
