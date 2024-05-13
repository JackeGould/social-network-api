const router = require('express').Router();
const { // gets functions from the controllers
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser, 
    createFriend,
    deleteFriend

} = require('../../controllers/userController.js');

// api/users **
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);



// /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(createFriend)
.delete(deleteFriend);



module.exports = router;

// /api/users

// GET all users

// GET a single user by its _id and populated thought and friend data

// POST a new user:

// // example data


// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// PUT to update a user by its _id

// DELETE to remove user by its _id

// BONUS: Remove a user's associated thoughts when deleted.

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list