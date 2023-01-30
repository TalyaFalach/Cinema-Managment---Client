import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/NavBar";
import { removeDuplicatedValuesFrom2Arrays } from "../../utils/utils";
import { Input, InputLabel, TextField } from "@mui/material";

const EditUserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const location = useLocation();

  const [userPermissions, setUserPermissions] = useState([]);
  const [userUpdatedPermissions, setUserUpdatedPermissions] = useState([]);
  const [userUpdatedData, setUserUpdatedData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    sessionTimeOut: 0,
    createdDate: "",
    permissions: [],
  });
  const [allPermissions, setAllPermissions] = useState([
    "View Subscriptions",
    "Create Subscriptions",
    "Delete Subscriptions",
    "View Movies",
    "Create Movies",
    "Delete Movies",
  ]);

  useEffect(() => {
    const prop = location.state.prop;
    sessionStorage["userIdToEdit"] = prop.id;

    setUser(prop);
    setUserUpdatedData({
      ...userUpdatedData,
      username: prop.username,
      createdDate: prop.createdDate,
      firstName: prop.firstName,
      lastName: prop.lastName,
      sessionTimeOut: prop.sessionTimeOut,
      permissions: prop.permissions,
    });
    setUser({ ...prop });
    console.log(prop);
    setUserPermissions([...prop.permissions]);
    setUserUpdatedPermissions([...prop.permissions]);
  }, []);

  useEffect(() => {
    console.log("render");
  }, []);

  const mapPermissions = () => {
    let pers = [...allPermissions];
    let userPers = [...userPermissions];
    let result = removeDuplicatedValuesFrom2Arrays(pers, userPers);
    return result;
  };

  const handleSubmit = async () => {
    setUser({ ...user, permissions: [userUpdatedPermissions] });

    const id = sessionStorage["userIdToEdit"];
    const res = await axios
      .put(`http://localhost:5000/users/${id}`, user, {
        headers: { "x-access-token": "text/json" },
      })
      .then(() => alert("User Updated !"))
      .then(() => navigate("/users"))
      .catch((err) => alert(err));
  };

  const managePers = (e) => {
    if (e.target.checked) {
      return setUser({
        ...user,
        permissions: [...user.permissions, e.target.name],
      });
    }
    if (e.target.checked === false) {
      let arr = [...user.permissions];
      let filtered = arr.filter((x) => x !== e.target.name);
      return setUser({ ...user, permissions: [...filtered] });
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="display-4 mt-3 mb-3">Edit User</div>
      <div className="row mx-auto container">
        <div className="col-4">
          <InputLabel>User Name:</InputLabel>
          <TextField
            label={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="col-4">
          
          <InputLabel>First Name:</InputLabel>
          <TextField
            label={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </div>
        <div className="col-4">
          
          <InputLabel>Last Name:</InputLabel>
          <TextField
            label={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>
        <div className="col-4 mt-4">
          <InputLabel>Session Time Out:</InputLabel>
          <TextField
            label={user.sessionTimeOut}
            onChange={(e) =>
              setUser({
                ...user,
                sessionTimeOut: e.target.value,
              })
            }
          />
        </div>
        <div className="col-4 mt-4">
          <InputLabel>Created Date:</InputLabel>
          <TextField
            label={user.createdDate}
            onChange={(e) =>
              setUser({
                ...user,
                createdDate: e.target.value,
              })
            }
          />
          <br />
         
        </div>
        <div className="col-4 mt-4">
          <h5 className="text-muted">Permissions:</h5>
          <ul className="list-group bg-light">
            {userPermissions.map((per, index) => {
              return (
                <li className="list-group-item bg-light" key={index}>
                  <label className="form-check-label" name={per}>
                    {per}
                  </label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name={per}
                    defaultChecked
                    onChange={managePers}
                  />
                </li>
              );
            })}
            {mapPermissions().map((per, index) => {
              return (
                <li className="list-group-item bg-light" key={index}>
                  <label name={per}>{per}</label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name={per}
                    onChange={managePers}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <button type="button" className="btn btn-success" onClick={handleSubmit}>
        Update
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => navigate("/main")}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditUserPage;
