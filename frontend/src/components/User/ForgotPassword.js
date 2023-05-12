import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../actions/userAction";
import { clearErrors } from "../../actions/productAction";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
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
            <div className="text-base">
              <div className="w-full h-10 mb-8 ">
                <input
                  type="text"
                  placeholder="Email của bạn?"
                  className="w-full h-full rounded-[2px] px-3 border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                value="Send"
                className="h-10 w-full bg-[#43c6ac] rounded text-white text-base tracking-widest opacity-80 hover:opacity-100"
              >
                TIẾP THEO
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
