const { Schema, model } = require("mongoose");

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
    // Validate email function to be called in userSchema, email field
};

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
            // Validate email using regex and const defined above
        },
        thought: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
              // Array of _id values referencing the Thought model
            },
          ],
        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
              // Array of _id values referencing the User model (self-reference)
            },
          ],
    },
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;

// username

// String
// Unique
// Required
// Trimmed

// email

// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)


// thoughts

// Array of _id values referencing the Thought model


// friends

// Array of _id values referencing the User model (self-reference)

// Schema Settings

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.