import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      // alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      // alert.success(message);
      // history.push("/admin/users");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Tên",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Vai trò",
      // type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.role === "admin" ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Thao tác",
      minWidth: 200,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <div className="flex items-center gap-3">
              <Link
                to={`/admin/user/${params.id}`}
                className="w-14 py-3 px-5 rounded  flex justify-center items-center h-3 bg-[#1572e8] text-white opacity-70 hover:opacity-100"
              >
                <p>EDIT</p>
              </Link>

              <Link
                onClick={() => deleteUserHandler(params.id)}
                className="w-14 py-3 px-5 rounded  flex justify-center items-center h-3 bg-[#f25961] text-white opacity-70 hover:opacity-100"
              >
                <p>Delete</p>
              </Link>
            </div>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />
      <div className="h-40 p-10 flex  bg-[linear-gradient(-45deg,#06418e,#1572e8)] text-xl font-bold text-white">
        Tất cả người dùng
      </div>

      <div className="relative -top-14 px-10">
        <div className="shadow-lg">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
