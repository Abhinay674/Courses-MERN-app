const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const app = express();
const {errorHandler} = require('./middleware/errorMiddleware');

// connect to database
connectDB();

app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res) => {
  res.status(200).json({message: 'Welcome to Course Application'});
})

//Routes
app.use('/api/courses',require('./routes/courseRoutes'));
app.use('/api/users',require('./routes/userRoutes'));


app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server running on port ${PORT}`.yellow.underline));