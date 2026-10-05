import { useEffect, useState } from "react";
import WorkoutListing from "./WorkoutListing";

const WorkoutListings = () => {
  const [workouts, setWorkouts] = useState("")
    const [loading, setLoading] = useState("")
    const[error, serError] = useState("")
    useEffect(() => {
     const load = async () => {
      try {
        const response = await fetch("/api/workouts");
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load workouts");
        setWorkouts(data);
        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    },[]);

  return (
    <div className="workout-list">
      {workouts.map((workout) => <WorkoutListing key = {workout._id} workout = {workout}/>)}
    </div>
  );
};

export default WorkoutListings;
