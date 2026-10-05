const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET /api/workouts
const getAllWorkouts = async (req, res) => {
  res.send("getAllWorkouts");
};

// POST /api/workouts
const createWorkout = async (req, res) => {
  res.send("createWorkout");
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

