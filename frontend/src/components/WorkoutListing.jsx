import { Link } from "react-router-dom";

const WorkoutListing = (workout) => {
  return (
    <div className="workout-preview">
      <h2>
        <Link to={`/workouts/${workout._id}`}>{workout.title}</Link>
      </h2>
      <p>Difficulty: {workout.difficulty}</p>
      <p>Description: {workout.description}</p>
      <p>Price: ${workout.price.toFixed(2)}</p>
    </div>
  );
};

export default WorkoutListing;
