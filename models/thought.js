const {Schema, model, Types} = require("mongoose");
const dateUtil= require("../utils/dateUtil");

const reactSchema = new Schema(
    {
        reactId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdOn: {
            type: Date,
            default: Date.now,
            get: (createdOnValue) => dateUtil(createdOnValue)
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const thoughtSchema = new Schema(
    {
        thoughtBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdOn: {
            type: Date,
            default: Date.now,
            get: (createdOnValue) => dateUtil(createdOnValue),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactSchema],
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
);

thoughtSchema.virtual('reactCount').get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);
module.exports = Thought;