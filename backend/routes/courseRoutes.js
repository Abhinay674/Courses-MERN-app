const express = require('express');
const {getCourses,createCourse,getCourse,updateCourse,deleteCourse} = require('../controllers/courseController');
const router = express.Router();
const {protect} = require('../middleware/protectMiddleware');

router.route('/').get(protect,getCourses).post(protect,createCourse);
router.route('/:id').get(protect,getCourse).put(protect,updateCourse).delete(protect,deleteCourse);

module.exports = router;