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


//not working
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
            db.getTheLastItem('links')
                .then(resDb => {
                    db.createLinkActivity(resDb[0].id, req.params.id)
                        .then(resDb1 => {
                            db.shareLink(resDb[0].id, resDb[0].created_by, req.body.shared_with)
                            .then(response => {
                                res.status(200).json({message: 'link added successfully'})
                            })
                            .catch(err1 => {
                                res.send({err1, message: 'share_link didnt work', resDb})
                            })    
                        })
                        .catch(errrrr => {
                            res.send({message: "createLinkActivity did not work", errrrr})
                        })
                })
                .catch(err => {
                    res.send({message: 'getTheLastItem didn"t work', err})
                })
        })
        .catch(error => {
            res.status(500).json({ message: 'We ran into an error adding the link', error });
        });
})

router.post('/:id/links/share',  (req, res) => {
    db.shareLink(req.body.link_id, req.params.id, req.body.shared_with)
        .then(resDb => {
            db.getTheLastItem('shared_links')
                .then(resDb2 => {
                    res.status(200).send(resDb2)
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/:id/')

module.exports = router;
