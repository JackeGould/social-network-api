const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
          },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
          },
        username: {
            type: String,
            required: true
        },
        createdAt: {
                type: Date,
                default: Date.now,
              },
            },
            {
              toJSON: {
                getters: true,
              },
              id: false,
            }
          );
         
module.exports = reactionSchema;

// Reaction (SCHEMA ONLY)

// reactionId

// Use Mongoose's ObjectId data type
// Default value is set to a new ObjectId

// reactionBody

// String
// Required
// 280 character maximum

// username

// String
// Required
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// Schema Settings

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

// Reaction model does not need this because we are using it as a field, does not need to be made a model
// const Reaction = model('reaction', reactionSchema);