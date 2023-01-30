import { Button, Input } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateSubscription.css";

const CreateSubscription = ({ member }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [movie, setMovie] = useState({});
  const [date, setDate] = useState("");
  const [movieId, setMovieId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const movieId = e.target.value;
    const filteredMovie = movies.filter((m) => m._id === movieId);
    console.log("Chosen Movie", filteredMovie);
    setMovie({ ...filteredMovie[0] });
  };

  

  const handleSubscribe = async () => {
    const res = await axios.get(
      `http://localhost:5000/subscriptions/${member._id}`
    );
    const isExist = res.data.data;
    console.log(isExist);
    if (isExist === "not exist") {
      createNewSubscription();
      setIsLoading(!isLoading);
    }
    if (isExist === "exist") {
      updateExistSubscription();
      setIsLoading(!isLoading);
    }
  };

  const createNewSubscription = async () => {
    const obj = {
      memberId: member._id,
      movieId: movie._id,
      date: date,
    };
    console.log(obj);
    const res = await axios
      .post(`http://localhost:5000/subscriptions`, obj)
      .then(() =>
        dispatch({
          type: "CREATE_SUBSCRIPTIONS",
          payload: {
            memberId: member._id,
            movies: [{ movieId: obj.movieId, date: obj.date }],
          },
        })
      )
      .then(() => setIsLoading(!isLoading))

      .then((data) => alert("Created!"))
      .then(() => setIsLoading(false))
      .catch(() => alert("Pleast Try Again"));
  };

  const updateExistSubscription = async () => {
    const obj = { movieId: movie._id, date: date };
    const res = axios
      .post(`http://localhost:5000/subscriptions/${member._id}`, obj)
      .then(() =>
        dispatch({
          type: "UPDATE_SUBSCRIPTIONS_DATA",
          payload: {
            memberId: member._id,
            movieId: obj.movieId,
            date: obj.date,
          },
        })
      )

      .then(() => alert("Created"))
      .then(() => setIsLoading(false))
      .catch(() => alert("Error"));
  };

  return (
    <div className="myBorder">
      <h6>Add a new movie</h6>
      <select
        className="form-select"
        required
        onChange={handleChange}
        style={{ maxWidth: "15rem" }}
      >
        {movies.map((m, index) => {
          return (
            <option key={index} name={m.premiere} value={m._id}>
              {m.name}
            </option>
          );
        })}
      </select>
      <br />
      <Input
        required
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />{" "}
      <br />
      {date === "" && movieId === "" ? (
        <Button className="mt-1 mb-1" variant="contained" disabled>
          Subscribe
        </Button>
      ) : (
        <Button
          onClick={handleSubscribe}
          className="mt-1 mb-1"
          type="button"
          variant="contained"
        >
          Subscribe
        </Button>
      )}
      {isLoading ? (
        <div>
          <div className="spinner-border mx-auto mt-5" role="status">
            <span className="sr-only"></span>
          </div>
          <div className=" mt-5">Loading... Please Wait</div>
        </div>
      ) : null}
    </div>
  );
};

export default CreateSubscription;
