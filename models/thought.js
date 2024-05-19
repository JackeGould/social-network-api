const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
            // Must be between 1 and 280 characters
        },
        createdAt: {
            type: Date,
            default: Date.now
            // Set default value to the current timestamp
        },
        username: {
            type: String,
            required: true
        },
        reaction: [reactionSchema]
        // Array of nested documents created with the reactionSchema
    },
    {
        toJSON: {
            getters: true,
            // Use a getter method to format the timestamp on query
        },
    }
);


// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reaction.length;
    });

// Initialize our thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;



// thoughtText

// String
// Required
// Must be between 1 and 280 characters
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query

// username (The user that created this thought)

// String
// Required
// reactions (These are like replies)

// Array of nested documents created with the reactionSchema
// Schema Settings


// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
