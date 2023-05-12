import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RxEyeClosed } from "react-icons/rx";
import { BsArrowLeft } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import useClickEye from "../../hooks/useClickEye";

const ResetPassword = ({ match }) => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const { click, setClick } = useClickEye();

  const { error, success } = useSelector((state) => state.forgotPassword);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token || match?.params?.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Cấp lại mật khẩu thành công");

      navigate("/login");
    }
  }, [dispatch, error, alert, success]);

  return (
    <div className="mt-20 flex justify-center items-center p-10">
      <MetaData title="Cấp lại mật khẩu"></MetaData>
      <form
        className="p-8 bg-white shadow-lg w-[450px] rounded-lg flex flex-col"
        onSubmit={resetPasswordSubmit}
      >
        <div className="flex items-center w-full mb-10">
          <Link to="/" className="text-[#43c6ac]">
            <BsArrowLeft size={25} />
          </Link>
          <div className="text-center w-full text-xl">
            <h1 className="text-center">Thiếp Lập Mật Khẩu</h1>
          </div>
        </div>

        <div className="relative w-full h-10 mb-8 flex justify-between border-">
          <input
            maxLength={15}
            type={`${click ? "password" : "text"}`}
            className="w-full h-full pl-3 pr-8 rounded-[2px] border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md"
            placeholder="Nhập mật khẩu mới"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute right-4 top-3"
            onClick={() => setClick(!click)}
          >
            {click ? (
              <RxEyeClosed size={20} className="text-graytagp" />
            ) : (
              <FaEye size={20} className="text-graytagp" />
            )}
          </button>
        </div>

        <div className="relative w-full h-10 mb-8 flex justify-between border-">
          <input
            maxLength={15}
            type={`${click ? "password" : "text"}`}
            className="w-full h-full pl-3 pr-8 rounded-[2px] border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md"
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="absolute right-4 top-3"
            onClick={() => setClick(!click)}
          >
            {click ? (
              <RxEyeClosed size={20} className="text-graytagp" />
            ) : (
              <FaEye size={20} className="text-graytagp" />
            )}
          </button>
        </div>
        <button
          type="submit"
          value="Update"
          className="w-full h-10 bg-[#43c6ac] text-white text-base tracking-widest opacity-80 hover:opacity-100 rounded"
        >
          TIẾP THEO
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
