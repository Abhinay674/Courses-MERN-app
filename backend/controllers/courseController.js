const asyncHandler = require('express-async-handler');
const Course = require('../model/courseModel');
const User = require('../model/userModel');

// @desc  Get user courses
// @route GET /api/courses
// access public
 const getCourses = asyncHandler(async (req,res) => {
  const user = await User.findById(req.user.id);

  if(!user){
    res.status(401)
    throw new Error('User not found');
  }

  const tickets = await Course.find({user:req.user.id})
    res.status(200).json(tickets)
})


// @desc  Create course
// @route POST /api/courses
// access private
 const createCourse = asyncHandler(async (req,res) => {
  const {name,description,durationHours,level} = req.body;

  if(!name || !description){
    res.status(400)
    throw new Error('Please add name and description');
  }

  const user = await User.findById(req.user.id);

  if(!user){
    res.status(401)
    throw new Error('User not found');
  }

  const course = await Course.create({
    name,
    description,
    user: req.user.id,
    durationHours,
    level
  })
  res.status(201).json(course)
})

// @desc  Get user course
// @route GET /api/courses/:id
// access private
 const getCourse = asyncHandler(async (req,res) => {

  const user = await User.findById(req.user.id);

  if(!user){
    res.status(401)
    throw new Error('User not found');
  }

  const course = await Course.findById(req.params.id);

  if(!course){
    res.status(404)
    throw new Error('Course not found');
  }

  if(course.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not authorized')
  }

  res.status(200).json(course)
})


// @desc  Update course
// @route PUT /api/courses/:id
// access private
 const updateCourse = asyncHandler(async (req,res) => {
  const user = await User.findById(req.user.id);

  if(!user){
    res.status(401)
    throw new Error('User not found');
  }

  const course = await Course.findById(req.params.id);

  if(!course){
    res.status(404)
    throw new Error('Course not found');
  }

  if(course.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not authorized')
  }

  const updatedCourse = await Course.findByIdAndUpdate(req.params.id,req.body,{
    new : true
  })

  res.status(200).json(updatedCourse)
})


// @desc  Delete course
// @route DELETE /api/courses/:id
// access private
 const deleteCourse = asyncHandler(async (req,res) => {
  const user = await User.findById(req.user.id);

  if(!user){
    res.status(401)
    throw new Error('User not found');
  }

  const course = await Course.findById(req.params.id);

  if(!course){
    res.status(404)
    throw new Error('Course not found');
  }

  if(course.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not authorized')
  }

  await course.remove()

  res.status(200).json({success : true})
})


module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
}