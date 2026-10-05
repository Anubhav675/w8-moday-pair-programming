const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET /api/workouts
const getAllWorkouts = async (req, res) => {
  try{
  const workouts = await Workout.find({});
  res.status(200).json(workouts);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
};

// POST /api/workouts
const createWorkout = async (req, res) => {
  const { title, difficulty, description, price } = req.body;
  if (!title || !difficulty || !description || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const createdWorkout = await Workout.create({
      title,
      difficulty,
      description,
      price,
    });
    if (createdWorkout) {
      res.status(201).json(createdWorkout);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/workouts/:workoutId
const getWorkoutById = async (req, res) => {
  const { workoutId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(400).json({ error: "Invalid workout ID" });
  }
  try {
    const workout = await Workout.findById(workoutId);
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json({ error: "Workout not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/workouts/:workoutId
const updateWorkout = async (req, res) => {
 const { workoutId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(400).json({ error: "Invalid workout ID" });
  }
  try {
    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: workoutId },
      req.body,
      { new: true }
    );
    if (updatedWorkout) {
      res.status(200).json(updatedWorkout);
    } else {
      res.status(404).json({ error: "Workout not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/workouts/:workoutId
const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(400).json({ error: "Invalid workout ID" });
  }
  try {
    const workout = await Workout.findByIdAndDelete(workoutId);
    if (workout) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Workout not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};
