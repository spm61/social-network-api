const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controller/userController"); //import all the user control functions.  Could this be done more concisely?

//Find all the users.
router.route("/").get(getAllUsers).post(createUser);

//Get, update, delete users.
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

//add and remove friends.
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;