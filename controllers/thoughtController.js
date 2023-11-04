const { Thought, User } = require("../models");
const { populate } = require("../models/user");

const thoughtController = { //no, this isn't 1984......

    //lets start by just getting everything.
    getAllThoughts(req, res) {
        Thought.find().then((thought) => res.json(thought)).catch((err) => res.status(500).json(err)) //a one line promise chain... since the operation is simple it should be fine.
    },
    
    //Now we'll create a new thought and associate it with a user.
    createThought(req, res) {
        Thought.create(req.body)
        .then((newThought) => {
            return user.findOneAndUpdate(
                {_id:req.body.userId},
                {$push:{thoughts:newThought._id}},
                {new:true}
            )
        })
        .then(userData => res.json(userData)).catch((err) => res.status(500).json(err));
    },

    //find a thought by its id and update it.
    updateThought(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            runValidators: true,
            new: true
        }).then((newThought) => {
            !newThought ? res.status(404).json({message: 'No thought with supplied ID'}) : res.json(newThought);}).catch((err) => res.status(500).json(err));
    },

//find a single thought by its id. 
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((foundThought) => {
        !foundThought ? res.status(404).json({message: 'No thought with supplied ID'}) : res.json(foundThought);}).catch((err) => res.status(500).json(err)); //I'm trying to be consistent, and maybe a little cheeky.
      },

//delete a thought by Id.  After all, no thoughts, head empty...
deleteThought(req, res) {
    Thought.findOneAndDelete({_id: req.params.id})
    .then((deletedThought) => {
        if(!deletedThought){
            res.status(404).json({message: 'No thought with supplied ID'}) 
        }      
        
        return User.findOneAndUpdate(   //we have to update the user object too, because it doesn't have the thought anymore.
            {_id:req.body.userId},
            {$pull:{thoughts:thought._id}},
            {new:true}
        )
   }).then(() => res.json({message: 'Thought deleted and removed from user!'})).catch((err) => res.status(500).json(err));
        },

//add a reaction to a thought.
addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body} },
      { runValidators: true, new: true })
      .then((reactedThought) =>
        !reactedThought ? res.status(404).json({ message: 'No thought found with supplied Id.' }) : res.json(reactedThought)).catch((err) => res.status(500).json(err));
  },

//remove a reaction from a thought.
  deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId} } },
        { runValidators: true, new: true })
        .then((thought) =>
          !thought ? res.status(404).json({ message: 'No thought found with that ID' }) : res.json(thought)).catch((err) => res.status(500).json(err));
    },
}
module.exports = thoughtController;
