const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number
  }
});

module.exports = User = mongoose.model('users', UserSchema);
