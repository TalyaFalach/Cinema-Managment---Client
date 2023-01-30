import { InputLabel, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateItem } from "../../utils/utils";
import NavBar from "../../Components/Navbar/NavBar";

const EditMember = ({ member }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [memberToEdit, setMemberToEdit] = useState({});

  const location = useLocation();
  useEffect(() => {
    const prop = location.state.prop;

    setMemberToEdit({ ...prop });
    console.log(prop);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateItem("members", memberToEdit._id, memberToEdit)
      .then(() => dispatch({ type: "UPDATE_MEMBER", payload: memberToEdit }))
      .then(() => navigate("/members"))
      .catch((e) => console.log(e));

    
  };
  return (
    <div className=" bgc" style={{height:"100vh"}}>
      <div>
        <NavBar />
        <div className="display-4 mt-3 mb-3">
          <hr />
          Edit member
          <hr />
        </div>
        <form onSubmit={handleSubmit}>
          <InputLabel>Name</InputLabel>
          <input
            defaultValue={memberToEdit.name}
            variant="outlined"
            className="form-control mx-auto"
            style={{ maxWidth: "300px" }}
            onChange={(e) =>
              setMemberToEdit({ ...memberToEdit, name: e.target.value })
            }
          />
          <InputLabel>Email</InputLabel>
          <input
            defaultValue={memberToEdit.email}
            className="form-control mx-auto"
            style={{ maxWidth: "300px" }}
            variant="outlined"
            onChange={(e) =>
              setMemberToEdit({ ...memberToEdit, email: e.target.value })
            }
          />
          <InputLabel>City</InputLabel>
          <input
            className="form-control mx-auto"
            style={{ maxWidth: "300px" }}
            defaultValue={memberToEdit.city}
            variant="outlined"
            onChange={(e) =>
              setMemberToEdit({ ...memberToEdit, city: e.target.value })
            }
          />

          <Button className="m-4" variant="contained" type="submit">
            Edit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditMember;
