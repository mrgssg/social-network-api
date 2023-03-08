const router = require('express').Router();

const {
    getAllUsers,
    getUser,
    addUser,
    addFriend,
    updateUser,
    deleteUser,
    deleteFriend
} = require('../../controllers/user-controller');

router
.route('/')
.get(getAllUsers)
.post(addUser);

router
.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;