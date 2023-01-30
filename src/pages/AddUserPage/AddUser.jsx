import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/NavBar";
import { removeDuplicatedCalues } from "../../utils/utils";

const admin = "63b40e43d7c406ea3e4914e3";

const AddUser = () => {
  const navigate = useNavigate();
  const [checkedPermissions, setCheckedPermissions] = useState([]);
  const [userToAdd, setUserToAdd] = useState({
    username: "",
    firstName: "",
    lastName: "",
    sessionTimeOut: "",
    permissions: [],
    createdDate: "",
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
    if (
      sessionStorage["token"] === undefined ||
      sessionStorage["userId"] !== admin
    ) {
      navigate("/pagenotfound");
    }
  }, []);

  const handlePermissionsChange = (e) => {
    let filteredArray = [];
    if (e.target.checked) {
      let arr = [...checkedPermissions, e.target.name];
      setCheckedPermissions([...checkedPermissions, e.target.name]);
      console.log(checkedPermissions);
      return setUserToAdd({ ...userToAdd, permissions: [...arr] });
    }
    if (e.target.checked === false) {
      let arr = [...checkedPermissions];
      let filteredArr = removeDuplicatedCalues(arr);
      setCheckedPermissions([...filteredArr]);
      let filteredArr2 = filteredArr.filter((x) => x !== e.target.name);
      setCheckedPermissions([...filteredArr2]);

      let copeCheckedPermissions = [...checkedPermissions];
      filteredArray = copeCheckedPermissions.filter((x) => x !== e.target.name);
    }
    console.log(checkedPermissions);
    return setUserToAdd({ ...userToAdd, permissions: [...filteredArray] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/users/admin";
    const res = await axios
      .post(`${url}`, userToAdd, {
        headers: { "x-access-token": sessionStorage["token"] },
      })
      .then(() => alert(`New User Created!`))
      .then(() => navigate("/users"))
      .catch(() => alert("Oops! PleaseTry Again"));
  };
  return (
    <form onSubmit={handleSubmit} className="bgc" style={{height:"100vh"}}>
      <NavBar />
      <h1 className="display-4 mt-2 mb-2">Add New User</h1>

      <div className="m-3">
        {/*Username */}
        <TextField
          label="Username"
          required
          onChange={(e) =>
            setUserToAdd({ ...userToAdd, username: e.target.value })
          }
          className="m-3"
        />
        <TextField
          label="First Name"
          required
          className="m-3"
          onChange={(e) =>
            setUserToAdd({ ...userToAdd, firstName: e.target.value })
          }
        />
        <TextField
          label="Last Name"
          required
          className="m-3"
          onChange={(e) =>
            setUserToAdd({ ...userToAdd, lastName: e.target.value })
          }
        />{" "}
        <br />
        <TextField
          label="Session Time Out"
          required
          className="m-3"
          onChange={(e) =>
            setUserToAdd({ ...userToAdd, sessionTimeOut: e.target.value })
          }
        />
        <TextField
          type="date"
          required
          className="m-3"
          onChange={(e) =>
            setUserToAdd({ ...userToAdd, createdDate: e.target.value })
          }
        />
        <br />
        {allPermissions.map((per, index) => {
          return (
            <div key={index}>
              <input
                onChange={handlePermissionsChange}
                type="checkbox"
                className="form-check-input m-1"
                name={per}
              />
              <label className="form-check-label m-1" htmlFor={per}>
                {per}
              </label>
            </div>
          );
        })}
        
        <button type="submit" className="btn btn-success mt-3">
          Add New User
        </button>
      </div>
    </form>
  );
};

export default AddUser;
