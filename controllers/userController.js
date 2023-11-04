const req = require("express/lib/request");
const { Thought, User } = require("../models");

const userController = {

    //get all the users at once.
    getAllUsers(req, res) {
        User.find().then((users) => res.json(users)).catch((err) => res.status(500).json(err));
    },

    //create a new user.
    createUser(req, res) {
        User.create(req.body).then((newUser) => res.json(newUser)).catch((err) => res.status(500).json(err));
    },

    //update an existing user.
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id}, 
            { $set: req.body}, 
            { runValidators: true, new: true})
            .then((user) => {
            !user ? res.status(404).json({ message: 'No user' }) : res.json(user); }).catch((err) => res.status(500).json(err));
    },

    //delete a user according to the Id.
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id }).then((deletedUser) => !deletedUser ? res.status(404).json({ message: 'No user with that ID' }) : Thought.deleteMany({
            _id: { $in: deletedUser.thoughts } //if we delete a user, the thoughts have to go too.
        }))
        .then(() => res.json({ message: 'User and associated thoughts deleted!' })).catch((err) => res.status(500).json(err));
    },

    //get a user by ID.
    getUserById(req, res) {
        User.findOne({ _id: req.params.id }).then((user) => !user ? res.status(404).json({ message: 'No user with suppplied ID' }) : res.json(user)).catch((err) => res.status(500).json(err));
    },

    //Add a friend.  Because you've got a friend in me...
    addFriend(req, res) {

        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendsId }}, 
            { runValidators: true, new: true})
            .then((user) => !user ? res.status(404).json({ message: 'No friend found with that ID :(' }) : res.json(user)).catch((err) => res.status(500).json(err));
    },

    //Remove a friend.  Because sometimes you have to distance yourself from toxic relationships...
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id }, 
            { $pull: { friends: req.params.friendsId } }, 
            { runValidators: true, new: true})
            .then((user) => !user ? res.status(404).json({ message: 'No friend found with that ID :(' }) : res.json(user)).catch((err) => res.status(500).json(err));
    }
};

module.exports = userController;