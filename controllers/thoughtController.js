// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

// Create an aggregate function to get the number of thoughts overall
const thoughtCount = async () => {
    const numberOfThoughts = await Thought.count(); // changed .aggregate to .count
    return numberOfThoughts;
}

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().sort({ createdAt: -1 });
            return res.json(thoughts);
        } catch (err) {
            console.log('Error fetching thoughts:', err);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    },

    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .lean();

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({ thought });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { new: true, runValidators: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete a thought and remove it from the user
    async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
          }
    
          res.json({ message: 'Thought deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },


    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          res.json(thought);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

// Delete a reaction to a thought
async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};