import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const WorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setWorkout(null);
      setError("");

      try {
        const response = await fetch(`/api/workouts/${id}`, {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not load workout");
        }

        setWorkout(data);
        setTitle(data.title);
        setDifficulty(data.difficulty);
        setDescription(data.description);
        setPrice(data.price);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      }
    };

    load();

    return () => controller.abort();
  }, [id]);

  const deleteWorkout = async () => {
    if (!window.confirm("Delete this workout?")) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/workouts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(data.error || "Could not delete workout");
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (!workout) {
    return error ? <p role="alert">{error}</p> : <p>Loading workout...</p>;
  }
  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    const updatedWorkout = {
      title,
      difficulty,
      description,
      price,
  };
  updateWorkout(updatedWorkout);
}

  const updateWorkout = async(updatedWorkout) => {
  try{
    const editWorkItem = await fetch(`/api/workouts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWorkout),
    });

    if (!editWorkItem.ok) {
      throw new Error(data.error || "Could not update workout");
    }
  }catch(err){
    setError(err.message);
    return false;
  }
  navigate(`/workouts/${id}`);
}


  return (
    <div className="workout-preview">
      <Link to="/">Back to workouts</Link>
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

        <button onClick={deleteWorkout} disabled={deleting}>
          {deleting ? "Deleting..." : "Delete Workout"}
        </button>
        <button>Update</button>
      </form>
    </div>
  );
};

export default WorkoutPage;
