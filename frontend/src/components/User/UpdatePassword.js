import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { RxEyeClosed } from "react-icons/rx";
import { FaEye } from "react-icons/fa";
import useClickEye from "../../hooks/useClickEye";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { click, setClick } = useClickEye();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Đổi mật khẩu thành công");

      // history.push("/account");
      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  return (
    <Fragment>
      <MetaData title="Đổi mật khẩu" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="bg-primary py-10">
            <div className="page-container flex items-center justify-center">
              <form
                className="p-8 bg-white shadow-lg rounded-md flex flex-col gap-5"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="flex items-center justify-between">
                  <Link to="/account" className="text-primary">
                    <BsArrowLeft size={25} />
                  </Link>
                  <h1 className="text-xl">Thay đổi mật khẩu</h1>
                </div>
                <div className="w-full h-10 mb-5">
                  <div className="flex items-center justify-end mb-1">
                    <p
                      className="flex items-center gap-1 text-xs text-primary cursor-pointer"
                      onClick={() => setClick(!click)}
                    >
                      {click ? (
                        <span className="flex items-center gap-1">
                          <FaEye></FaEye>Hiển thị
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <RxEyeClosed></RxEyeClosed>Ẩn
                        </span>
                      )}
                      <span className="text-graytagp"> / tất cả mật khẩu</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 w-full h-10">
                    <VpnKeyIcon className="text-primary" />
                    <input
                      type={`${click ? "password" : "text"}`}
                      className="w-full h-full pl-3 pr-8 border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md"
                      placeholder="Mật khẩu cũ"
                      autoFocus
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full h-10">
                  <LockOpenIcon className="text-primary" />
                  <input
                    type={`${click ? "password" : "text"}`}
                    className="w-full h-full pl-3 pr-8 border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md"
                    placeholder="Mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 w-full h-10">
                  <LockIcon className="text-primary" />
                  <input
                    type={`${click ? "password" : "text"}`}
                    className="w-full h-full pl-3 pr-8 border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md"
                    placeholder="Xác nhận lại mật khẩu mới"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  value="Change"
                  className="uppercase w-full h-10 bg-[#43c6ac] text-white text-base tracking-widest opacity-80 hover:opacity-100 rounded mt-5"
                >
                  Thay đổi
                </button>
              </form>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
