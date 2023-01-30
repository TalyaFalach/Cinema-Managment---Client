import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CreateSubscription from "../CreateSubscriptionComponent/CreateSubscription";

const SubscribeComponent = ({ member }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUser);
  const [subscrideBtn, setSubscrideBtn] = useState(false);
  const [memberMovies, setMemberMovies] = useState([{}]);
  const movies = useSelector((state) => state.movies);
  const subscriptions = useSelector((state) => state.subscriptions);
  const [createSubPermission, setCreateSubPermission] = useState(false);

  useEffect(() => {
    console.log(user);
    user.permissions.map((per) => {
      if (per === "Create Subscriptions") {
        setCreateSubPermission(true);
      }
    });
  }, []);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < subscriptions.length; i++) {
      if (subscriptions[i].memberId === member._id) {
        subscriptions[i].movies.map((m) => {
          movies.filter((mov) =>
            mov._id === m.movieId
              ? arr.push({
                  _id: mov._id,
                  genres: mov.genres,
                  image: mov.image,
                  name: mov.name,
                  date: m.date,
                  premiered: mov.premiered,
                })
              : null
          );
          setMemberMovies([...arr]);
        });
      }
    }
  }, [subscriptions]);

  const handleEditMovie = (e) => {
    e.preventDefault();
    console.log("run");
    const movieId = e.target.id;
    let movie = memberMovies.filter((m) => m._id === movieId);
    console.log(movie);

    navigate("/editmovie", { state: { prop: movie[0] } });
  };

  const createSubscription = () => {
    setSubscrideBtn(!subscrideBtn);
  };

  return (
    <div className="border shadow p-3 mb-3 rounded">
      <h6>Movies Watched:</h6>
      <ul>
        {memberMovies.map((m, index) => {
          return "name" in m ? (
            <li key={index}>
              {" "}
              <Link id={m._id} onClick={handleEditMovie}>
                {m?.name}
              </Link>{" "}
              - {m.date}
            </li>
          ) : (
            "No Movies Yet"
          );
        })}
      </ul>
      {createSubPermission ? (
        <Button onClick={createSubscription}>Subscribe To New Movie</Button>
      ) : (
        <Button disabled>Subscribe To New Movie</Button>
      )}
      

      {subscrideBtn ? <CreateSubscription member={member} /> : null}
    </div>
  );
};

export default SubscribeComponent;
