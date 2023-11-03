const {Schema, model, Types} = require("mongoose");
const dateFormat = require("../utils/dateFormat"); //to be defined

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
            get: (createdOnValue) => dateFormat(createdOnValue) //not defined yet.
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
            get: (createdOnValue) => dateFormat(createdOnValue),
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