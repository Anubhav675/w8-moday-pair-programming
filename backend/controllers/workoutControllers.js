const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET /api/workouts
const getAllWorkouts = async (req, res) => {
  try {
  const response = await Workout.find({}).sort({createdAt: -1})
  res.status(200).json(response)
  
}catch(error){
  res.status(500).json({message:error})
}
};

// POST /api/workouts
const createWorkout = async (req, res) => {
  const {
      title,
      difficulty,
      description,
      price 
    } = req.body;
    if(!title || !difficulty || !description || !price )
      res.status(400).json({message:"All field require"})
  try {
    const createdWorkout = await Workout.create({title, difficulty,description,price})
    if (createdWorkout){
      res.status(201).json(createdWorkout)
    } 
    }catch(error){
      res.status(500).json({message:error})
  }
};

// GET /api/workouts/:workoutId
const getWorkoutById = async (req, res) => {
  res.send("getWorkoutById");
};

// PUT /api/workouts/:workoutId
const updateWorkout = async (req, res) => {
  res.send("updateWorkout");
};

// DELETE /api/workouts/:workoutId
const deleteWorkout = async (req, res) => {
  res.send("deleteWorkout");
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};

