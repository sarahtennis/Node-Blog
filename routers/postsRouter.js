const express = require('express');
const postDb = require('../data/helpers/postDb.js');

const router = express.Router();

// ***** GET post by post id *****
// Post exists --> respond post by id
// Post doesn't exist --> error
router.get('/:id', (req, res) => {
    postDb.get(req.params.id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: `The post with id ${req.params.id} could not be retrieved. This may be due to the post not existing.` })
        })
});

// ***** GET tags for post by post id *****
// Post exists --> respond tags for post by post id
// Post doesn't exist --> error
router.get('/:id/tags', (req, res) => {
    postDb.get(req.params.id)
        .then(tags => {
            res.status(200).json(tags);
        })
        .catch(err => {
            res.status(500).json({ error: `The tags for the post with id ${req.params.id} could not be retrieved. This may be due to the post not existing.` })
        });
});

// ***** POST new post *****
router.post('/new-post', (req, res) => {
    //check user exists
    postDb.insert(req.body)
        .then(id => {
            return postDb.get(id.id);
        })
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to create new post.' })
        })
})

// ***** DELETE post by post id *****
router.delete('/:id', (req, res) => {
    postDb.remove(req.params.id)
        .then(recordsDeleted => {
            res.status(200).json({ message: 'Successfully deleted post.'})
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to delete post.'})
        })
})

// ***** PUT update post by post id *****
router.put('/:id', (req, res) => {
    postDb.update(req.params.id, req.body)
        .then(recordsUpdated => {
            return postDb.get(req.params.id);
        })
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to update post.'})
        });
});

module.exports = router;