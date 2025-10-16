const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '🏆'
  },
  type: {
    type: String,
    enum: ['rocks', 'hunts', 'social', 'geology', 'special'],
    required: true
  },
  criteria: {
    type: {
      type: String,
      enum: ['count', 'specific', 'streak', 'variety'],
      required: true
    },
    target: {
      type: Number,
      default: 1
    },
    details: {
      type: mongoose.Schema.Types.Mixed
    }
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
