import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();
  const { idUser } = useParams();
  const navigate = useNavigate();
  // const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  console.log("isUpdated", isUpdated);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  console.log("name, email, role", name, email, role);
  // const userId = match.params.id;

  useEffect(() => {
    if (user && user._id !== idUser) {
      dispatch(getUserDetails(idUser));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      // alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      // alert.success("User Updated Successfully");
      // history.push("/admin/users");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, idUser]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(idUser, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="flex justify-center py-10">
        <div className="bg-white rounded shadow-lg p-5 w-[500px]">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="flex flex-col gap-5"
              onSubmit={updateUserSubmitHandler}
            >
              <h1 className="text-center text-lg font-bold">Update User</h1>

              <div className="flex gap-3 items-center">
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-8 p-2 outline-none border border-[#1572e8] rounded "
                />
              </div>
              <div className="flex gap-3 items-center">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-8 p-2 outline-none border border-[#1572e8] rounded "
                />
              </div>

              <div className="flex gap-3 items-center">
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}
                className="w-full h-14  p-2 outline-none border border-[#1572e8] rounded "
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
                className="w-full h-10 bg-primary rounded text-white opacity-70 active:bg-[#1572e8]"
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
