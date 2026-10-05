const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");
const Workout = require("../models/workoutModel");
const api = supertest(app);

const workoutsArray = [
  {
    title: "Pushup",
    difficulty: "Intermediate",
    description: "It makes you healthy",
    price: 30,
  },

  {
    title: "Pullup",
    difficulty: "Beginner",
    description: "It makes you powerful",
    price: 50,
  },
];

beforeAll(async () => {
  await connectDB();
});

afterAll(async()=> {
    await mongoose.connection.close()
});

beforeEach(async()=>{
  Workout.deleteMany({})
  Workout.insertMany(workoutsArray)

})
describe("get ", ()=> {
    it.only("should get all the workout", async()=>{
        await api
        .get("/api/workouts")
        .expect(200)
    })
});