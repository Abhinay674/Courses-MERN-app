const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  user: {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true,'Please add a course name'],
    unique: true
  },
  description: {
    type: String,
    required: [true,'Please add description'],
    unique: true
  },
  durationHours: {
    type: Number,
    default: 21,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner','moderate','advanced'],
    default: 'moderate',
    required: true
  }
},{
  timestamps: true
})


module.exports = mongoose.model('Course',courseSchema);