const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = Score = mongoose.model('Score', ScoreSchema);
