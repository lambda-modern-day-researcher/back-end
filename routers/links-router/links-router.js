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
        created_by: req.params.id,
        delete: false,
    } 
    db.addCategory(category)
        .then(category => {
            db.getTheLastItem('categories')
                .then(resp => {
                    res.status(200).json({message: `you've added a new category`, resp})
                })
                .catch(error => {
                    res.send(error)
                })
        })
        .catch(err => {
            res.send(err)
        })
})

//delete category
router.delete('/:user_id/category/:id', (req, res) => {
    db.findCategoryCreator(req.params.id)
    .then(resDb => {
        if(req.params.user_id = resDb[0].created_by) {
            db.update(req.params.id)
                .then(response => {
                    res.status(200).send({message: 'category deleted successfully'});
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
})

//delete links
// router.delete('/:id/links/delete', (req, res) => {
//     db.
// })

router.post('/:id/links', (req, res) => {
    db.addLinks(req.body.title, req.body.url, req.body.created_by)
        .then(link => {
            console.log(1, link)
            db.getTheLastItem('links')
                .then(resDb => {
                    console.log(2, resDb)
                    db.autoCreateLinkActivity(resDb[0].id, req.params.id)
                        .then(resDb1 => {
                            console.log(3, resDb1)
                            db.shareLink(resDb[0].id, resDb[0].created_by, req.body.shared_with)
                            .then(response => {
                                console.log(4, response)
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

router.put('/:user_id/links/:id/pinned', (req, res) => {
    let activity = {
        link_id: req.params.id,
        user_id: req.params.user_id
    }
    db.changeLinkActivity(activity)
        .then(response => {
            console.log(response)
            res.status(200).send({message: 'link updated'})
        })
        .catch(err => {
            console.log(err, req.params)
            res.send(err)
        })
})

router.put('/:user_id/links/:id/completed', (req, res) => {
    let activity = {
        link_id: req.params.id,
        user_id: req.params.user_id
    }
    db.changeLinkActivityCompleted(activity)
        .then(response => {
            console.log(response)
            res.status(200).send({message: 'link updated'})
        })
        .catch(err => {
            console.log(err, req.params)
            res.send(err)
        })
})

router.put('/:user_id/links/:id/title', (req, res) => {
    db.updateTitle(req.body.title, req.params.id)
        .then(resDb => {
            res.status(200).send({message: 'title updated'})
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

module.exports = router;
