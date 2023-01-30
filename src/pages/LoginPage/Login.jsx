import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getMovies,
  getCurrentUserData,
  getAll,
  getAllUsers,
} from "../../utils/utils";
import { useDispatch } from "react-redux";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(0);
  const [errorAlert, setErrorAlert] = useState(false);
  const url = "http://localhost:5000";

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = { username: username, password: password };
    const res = await axios
      .post(`${url}/auth/login`, obj, {
        Headers: {
          "content-type": "text/json",
        },
      })

      .catch(() => setErrorAlert(!errorAlert));

    if (res.status === 200) {
      const data = res.data;
      setIsLoading(!isLoading);
      sessionStorage["token"] = data.token;
      sessionStorage["userId"] = data.user_id;
      const movies = await getMovies();
      dispatch({ type: "SET_MOVIES_DATA", payload: [...movies] });

      const userData = await getCurrentUserData();
      dispatch({ type: "SET_CURRENT_USER_DATA", payload: { ...userData } });

      const membersRes = await getAll("members");
      const members = membersRes.data.members;
      dispatch({ type: "SET_MEMBERS", payload: members });

      const usersRes = await getAllUsers();
      dispatch({ type: "SET_USERS", payload: usersRes });

      const subscriptionRes = await getAll("subscriptions");
      const subscriptions = subscriptionRes.data.data;
      console.log(subscriptions);
      dispatch({ type: "SET_SUBSCRIPTIONS_DATA", payload: [...subscriptions] });

      navigate("/main");
    }
  };

  return (
    <div style={{ height: "100vh" }} className=" bgc">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <form onSubmit={handleSubmit}>
          <hr />
          <h1 className="display-3 mt-4 mb-4 font-weight-bold h-2 ">Login</h1>
          <hr />
          <TextField
            className="mt-3 mb-2"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />{" "}
          <br />
          <TextField
            className="mt-3 mb-2"
            id="outlined-password-input"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button
            type="submit"
            className="mt-2 mb-4"
            variant="contained"
            size="large"
          >
            Login
          </Button>
          <br />
          <span className="h5 mt-5 text-light">
            New User ? <Link to="/createaccount">Create Account</Link>
          </span>
        </form>
      )}

      {errorAlert ? (
        <div className="alert alert-danger container" role="alert">
          Invalid Username or Password, Please Try Again!
        </div>
      ) : null}
    </div>
  );
};

export default LoginPage;
