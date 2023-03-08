const { Thought, User } = require('..models');

const thoughtController = {
    // gett all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        })
    },

    // get thought by id
    getThought({params}, res) {
        Thought.findOne({_id: params.thoughtId}) 
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // adding a thought to a user
    addThought({ body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err)); 
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400) .json(err));
    },

    // finding and deleting a thought
    deleteThought({ params }, res) {
         Thought.findOneandDelete({ _id: params.thoughtId })
         .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message:'No thought found with this id'});
                return;       
            }
            User.findOneAndUpdate(
                { _id: dbThoughtData.userId },
                { $pull: { thought: { _id: params.thoughtId}}},
                { new: true }
            )
            .catch(err => res.json(err));
            res.json(dbThoughtData);
         })
         .catch(err => res.json(err));
    },

    // adding reactions to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            {$push: { reactions: body }},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thuoght found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // delete a reaction
    deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;