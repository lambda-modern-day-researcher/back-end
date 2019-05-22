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
                db.update(req.query.category, {delete: true})
                    .then(response => {
                        res.send({message: 'category deleted successfully', response})
                    })
                    .catch(err => {
                        console.log(err, 'update')
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

router.post('/:id/links', (req, res) => {
    db.addLinks(req.body.title, req.body.url, req.body.created_by)
        .then(link => {
            // if(link) {
            //     db.addData(link.id, req.params.id, req.body.shared_with)
            //         .then(response => {
            //             res.status(200).json(dish)
            //         })
            //         .catch(err => {
            //             res.send(err)
            //         })
            // }
            res.status(200).json({message: 'successfully added a link'})
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'We ran into an error adding the link', error });
        });

})


module.exports = router;
