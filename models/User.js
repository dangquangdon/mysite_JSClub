const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  education: [
    {
      school: {
        type: String
      },
      degree: {
        type: String
      },
      year: {
        type: String
      }
    }
  ],
  education_description: {
    type: String
  },
  workexp: [
    {
      company: {
        type: String
      },
      title: {
        type: String
      },
      year: {
        type: String
      }
    }
  ],
  skills: {
    type: [String]
  },
  skills_description: {
    type: String
  },
  github_account: {
    type: String
  },
  linkedin: {
    type: String
  },
  facebook: {
    type: String
  },
  twitter: {
    type: String
  },
  avatar: {
    type: String,
    default: 'me.png'
  }
});

module.exports = User = mongoose.model('users', UserSchema);
