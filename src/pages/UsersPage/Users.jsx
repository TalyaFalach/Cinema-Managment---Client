import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/NavBar";
import User from "../../Components/UserComponent.jsx/User";
import PageNotFound from "../PageNotFound/PageNotFound";

const url = "http://localhost:5000";

const UsersPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUser);
  //states
  const [users, allUsers] = useState([]);
  useEffect(() => {
    if (sessionStorage["token"] === undefined) {
      navigate("/pagenotfound");
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .get(`${url}/users`, {
          headers: { "x-access-token": sessionStorage["token"] },
        })
        .then((data) => allUsers(data.data.users))
        .catch((e) => console.log(e));
    };
    console.log(users);
    console.log("permisisons: ", users[0]);
    fetchData();
  }, []);

  return (
    <div className=" bgc">
      <NavBar />
      {user.admin ? (
        <>
          <div className="mt-3 m-2 mb-3 display-4">All User's Page</div>
          <p className="fs-4">
            Create new users, delete or edit existing users, and manage
            permissions{" "}
          </p>

          <Button
            onClick={() => navigate("/adduser")}
            className="m-2 w-75 mt-4 mb-4"
            variant="contained"
            size="large"
           
          >
            Add Users
          </Button>
          <div className="row">
            {users.map((user, index) => {
              return (
                <div className="col-sm-3" key={index}>
                  <User user={user} />;
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default UsersPage;
