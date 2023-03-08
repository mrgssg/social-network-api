const {User} = require('../models');

// get all users
const userController = {
getAllUsers(req, res) {
    User.find({})
    .populate({path: 'friends'})
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(400);
    });
},

// get a user
getUser({ params }, res) {
    User.findOne({ _id: params.id})
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(400);
    });
},

// get a new user
addUser({ body }, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},

// updating a user
updateUser({ params, body },res) {
    User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true})
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

// delete a user
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id:params.id})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},

// adding a friend
addFriend({params}, res) {
    User.FindByIdAndUpdate(
        { _id: params.userId },
        { $push: { friends: {friendId: params.friendId}} },
        { new: true, runValidators: true }
    )
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbFriendData);
    })
    .catch(err => res.json(err));
},

// delete a friend
deleteFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: { friendId: params.friendId}}},
        { new: true }
    )
    .then(dbFriendData => res.json(dbFriendData))
    .catch(err => res.json(err));
}
};
module.exports = userController;