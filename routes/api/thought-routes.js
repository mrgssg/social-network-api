const router = require('express').Router();

const {
    getAllThoughts,
    getThought,
    addThought,
    deleteThought,
    addReaction,
    deleteReaction,
    updateThought
} = require('../../controllers/thought-controller');

router
.route('/')
.post(addThought)
.get(getAllThoughts);


router
.route('/:thoughtId')
.get(getThought)
.put(updateThought)
.post(addReaction)
.delete(deleteThought);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;
