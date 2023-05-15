import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearSuccess, forgotPassword } from "../../actions/userAction";
import { clearErrors } from "../../actions/productAction";
import { VscError } from "react-icons/vsc";
import LoadingSpin from "../layout/Loader/LoadingSpin";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log("test regexEmail", regexEmail.test("tuan"));
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    if (message) {
      alert.success(`Đã gửi đến ${email}`);
      dispatch(clearSuccess());
    }
  }, [dispatch, error, alert, message]);
  return (
    <div className="mt-20">
      <div className="h-[450px] flex justify-center items-center">
        <form onSubmit={forgotPasswordSubmit}>
          <div className="bg-white shadow-lg rounded-lg w-[500px] p-10">
            <div className="flex items-center w-full mb-10">
              <Link to="/login" className="text-[#43c6ac]">
                <BsArrowLeft size={25} />
              </Link>
              <div className="text-center w-full text-xl">
                <h1 className="text-center">Đặt lại mật khẩu</h1>
              </div>
            </div>
            {error && (
              <div className="flex items-start gap-2 bg-taghot bg-opacity-5 border border-taghot rounded-[2px] mb-8 p-2">
                <VscError size={18} className="text-taghot"></VscError>
                <p className="text-sm">
                  {error === "User not found" &&
                    "Không tìm thấy email, vui lòng nhập email đã đăng ký với Shop"}
                </p>
              </div>
            )}
            <div className="text-base">
              <div className="w-full h-10 mb-8">
                <input
                  type="text"
                  placeholder="Email của bạn?"
                  className={`${
                    email && !regexEmail.test(email)
                      ? "bg-taghot bg-opacity-5 border border-taghot focus:border-taghot rounded-[2px]"
                      : ""
                  } w-full h-full rounded-[2px] px-3 border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-sm`}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email && !regexEmail.test(email) && (
                  <p className="text-xs text-taghot mt-1">Email không hợp lệ</p>
                )}
              </div>
              <button
                type="submit"
                value="Send"
                disabled={!email || !regexEmail.test(email)}
                className="flex items-center justify-center h-10 w-full bg-[#43c6ac] rounded text-white text-base tracking-widest opacity-80 hover:opacity-100 disabled:cursor-wait disabled:bg-opacity-60 disabled:hover:opacity-80"
              >
                {loading ? <LoadingSpin></LoadingSpin> : "TIẾP THEO"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
