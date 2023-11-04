const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controller/thoughtController"); //import all the thought functions.  Is there a better way to do this?

//The route that triggers the getAllThoughts function.
router.route("/").get(getAllThoughts).post(createThought);

//This sets up the functions for finding one thought, updating a thought, or deleting a thought.
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

//These routes givern the adding and removing of reactions.
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;