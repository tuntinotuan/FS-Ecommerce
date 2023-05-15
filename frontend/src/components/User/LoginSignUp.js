import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../images/cartShopNow.png";
import "./LoginSignUp.css";
import { useAlert } from "react-alert";
import { RxEyeClosed } from "react-icons/rx";
import { FaEye } from "react-icons/fa";
import "./LoginSignUp.css";
import Profile from "../../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import useClickEye from "../../hooks/useClickEye";
import { VscError } from "react-icons/vsc";
import LoadingSpin from "../layout/Loader/LoadingSpin";

const LoginSignUp = ({ registerSwitch = false }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useAlert();
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const [show, setShow] = useState(registerSwitch);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const { click, setClick } = useClickEye();
  const {
    loading,
    error,
    isAuthenticated,
    user: userFromData,
  } = useSelector((state) => state.user);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(Profile);
  const [avatarPreview, setAvatarPreview] = useState(Profile);

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("error", error);
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    setAvatarHiddenInvalidEmail(true);
    const myForm = new FormData();
    const dataForm = {
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    };
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(dataForm));
  };
  const [hiddenInvalidEmail, setAvatarHiddenInvalidEmail] = useState(true);
  const registerDataChange = (e) => {
    if (e.target.name === "email") {
      setAvatarHiddenInvalidEmail(false);
    }
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location?.search ? location?.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      userFromData.role === "admin"
        ? navigate("/admin/dashboard")
        : navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, redirect]);

  return (
    <div className="mt-20">
      <div className="flex justify-around items-center p-10 bg-primary min-h-[600px]">
        <div className="">
          <img src={Logo} alt="" className="w-96 h-96" />
        </div>
        {!show ? (
          <form
            className="p-8 bg-white shadow-lg w-[400px] h-auto rounded-md flex flex-col"
            onSubmit={loginSubmit}
          >
            <h1 className="text-xl mb-8">Đăng nhập</h1>
            {error && (
              <div className="flex items-start gap-2 bg-taghot bg-opacity-5 border border-taghot rounded-[2px] mb-8 p-2">
                <VscError size={24} className="text-taghot"></VscError>
                <p className="text-sm">
                  {error === "Invalid email or password" &&
                    "Tên tài khoản của bạn hoặc Mật khẩu không đúng, vui lòng thử lại"}
                </p>
              </div>
            )}
            <div className="w-full h-10 mb-8">
              <input
                className={`${
                  error && !loginEmail
                    ? "bg-taghot bg-opacity-5 border border-taghot focus:border-taghot rounded-[2px]"
                    : ""
                } w-full h-full pl-3 pr-8 border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md`}
                placeholder="Email của bạn?"
                autoFocus
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              {error && !loginEmail && (
                <p className="text-xs text-taghot mt-1">
                  Vui lòng điền vào mục này.
                </p>
              )}
            </div>
            <div className="relative w-full h-10 flex justify-between border-">
              <input
                maxLength={15}
                type={`${hiddenPassword ? "password" : "text"}`}
                className={`${
                  error && !loginPassword
                    ? "bg-taghot bg-opacity-5 border border-taghot focus:border-taghot rounded-[2px]"
                    : ""
                } w-full h-full pl-3 pr-8 border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md`}
                placeholder="Mật khẩu của bạn?"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <div
                className="absolute right-4 top-3 cursor-pointer"
                onClick={() => setHiddenPassword(!hiddenPassword)}
              >
                {hiddenPassword ? (
                  <RxEyeClosed size={20} className="text-graytagp" />
                ) : (
                  <FaEye size={20} className="text-graytagp" />
                )}
              </div>
            </div>
            {error && !loginPassword && (
              <p className="text-xs text-taghot mt-1">
                Vui lòng điền vào mục này.
              </p>
            )}
            <button
              type="submit"
              disabled={!loginEmail || !loginPassword}
              className="flex items-center justify-center uppercase w-full h-10 bg-[#43c6ac] text-white text-base tracking-widest opacity-80 hover:opacity-100 rounded disabled:cursor-wait disabled:bg-opacity-60 disabled:hover:opacity-80 mt-8"
            >
              {loading ? <LoadingSpin></LoadingSpin> : "Đăng nhập"}
            </button>
            <div className="float-right">
              <Link
                to="/password/forgot"
                className="mt-2 float-right text-[#43c6ac]"
              >
                Quên mật khẩu
              </Link>
            </div>
            <div className="flex justify-center mt-8 text-sm">
              <h2 className="text-graytagp">Bạn chưa có tài khoản?</h2>
              <Link
                to="/register"
                className="ml-2 text-[#43c6ac]"
                onClick={() => setShow(!show)}
              >
                Đăng ký
              </Link>
            </div>
          </form>
        ) : (
          <form
            className="p-8 bg-white shadow-lg w-[400px] h-auto rounded-md flex flex-col"
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <h1 className="text-xl mb-8">Đăng ký</h1>
            {error && (
              <div className="flex items-start gap-2 bg-taghot bg-opacity-5 border border-taghot rounded-[2px] mb-8 p-2">
                <VscError size={24} className="text-taghot"></VscError>
                <p className="text-sm">
                  {error && "Thông tin không hợp lệ, vui lòng thử lại"}
                </p>
              </div>
            )}
            <div className="w-full h-10 mb-8">
              <input
                className={`${
                  error && name.length < 4
                    ? "bg-taghot bg-opacity-5 border border-taghot focus:border-taghot rounded-[2px]"
                    : ""
                } w-full h-full pl-3 pr-8 border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md`}
                placeholder="Tên của bạn?"
                autoFocus
                name="name"
                value={name}
                onChange={registerDataChange}
              />
              {error && name.length < 4 && (
                <p className="text-xs text-taghot mt-1">
                  Tên phải có nhiều hơn hoặc bằng 4 ký tự!
                </p>
              )}
            </div>
            <div className="w-full h-10 mb-8">
              <input
                className={`${
                  error && !regexEmail.test(email)
                    ? "bg-taghot bg-opacity-5 border border-taghot focus:border-taghot rounded-[2px]"
                    : ""
                } w-full h-full pl-3 pr-8 border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md`}
                placeholder="Email của bạn?"
                name="email"
                value={email}
                onChange={registerDataChange}
              />
              {error && !regexEmail.test(email) && (
                <p className="text-xs text-taghot mt-1">Email không hợp lệ!</p>
              )}
              {hiddenInvalidEmail && error === "Duplicate email Entered" && (
                <p className="text-xs text-taghot mt-1">
                  Email đã tồn tại, vui lòng thử Email khác
                </p>
              )}
            </div>
            <div className="relative w-full h-10 flex justify-between border-">
              <input
                maxLength={15}
                type={`${click ? "password" : "text"}`}
                className={`${
                  error && !regexPassword.test(password)
                    ? "bg-taghot bg-opacity-5 border border-taghot focus:border-taghot rounded-[2px]"
                    : ""
                } w-full h-full pl-3 pr-8 border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md`}
                placeholder="Mật khẩu của bạn?"
                name="password"
                value={password}
                onChange={registerDataChange}
              />
              <div
                className="absolute right-4 top-3 cursor-pointer"
                onClick={() => setClick(!click)}
              >
                {click ? (
                  <RxEyeClosed size={20} className="text-graytagp" />
                ) : (
                  <FaEye size={20} className="text-graytagp" />
                )}
              </div>
            </div>
            {error && !regexPassword.test(password) && (
              <p className="text-xs text-taghot mt-1">
                Mật khẩu tối thiểu 8 ký tự, ít nhất 1 chữ cái viết hoa, 1 số và
                1 ký tự đặc biệt!
              </p>
            )}
            <div
              id="registerImage"
              className="flex items-center justify-between gap-3 w-full h-10 my-8"
            >
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-10 h-10 rounded-full object-cover"
              />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <button
              type="submit"
              value="Register"
              disabled={!name || !email || !password || !avatar}
              className="flex items-center justify-center uppercase w-full h-10 bg-[#43c6ac] text-white text-base tracking-widest opacity-80 hover:opacity-100 rounded disabled:cursor-wait disabled:bg-opacity-60 disabled:hover:opacity-80"
            >
              {loading ? <LoadingSpin></LoadingSpin> : "Đăng ký"}
            </button>
            <div className="flex justify-center mt-8 text-sm">
              <h2 className="text-graytagp">Bạn đã có tài khoản?</h2>
              <Link
                to="/login"
                className="ml-2 text-[#43c6ac]"
                onClick={() => setShow(!show)}
              >
                Đăng nhập
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
