import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddWorkoutPage = () => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    setError(false);

    const newWorkout = {
      title,
      difficulty,
      description,
      price,
    };
    console.log(JSON.stringify(newWorkout), "This is workout inside submitform");
    addWorkout(newWorkout);
    console.log("Form submitted");
  };

  const addWorkout = async (newWorkout) => {
    try {
      setLoading(true);
      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkout),
      });
      console.log(JSON.stringify(newWorkout), "inside addworkout fn");
      if (!res.ok) {
        throw new Error("failed to create workout");
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Workout</h2>
      <form onSubmit={submitForm}>
        <label>Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && <p role="alert">{error}</p>}
        <button disabled={loading}>
          {loading ? "Adding..." : "Add Workout"}
        </button>
      </form>
    </div>
  );
};

export default AddWorkoutPage;
