import React from "react";
import { BsSearch } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import Girl from "../../images/girl.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderAdmin.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";

const HeaderAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  function logoutUser() {
    dispatch(logout());
    navigate("/login");
    alert.success("Đã đăng xuất");
  }
  return (
    <div className="relative z-50 h-16 flex items-center bg-[#1269db] shadow-lg">
      <div className="flex justify-between items-center px-12 w-full">
        <form>
          <div className="flex items-center bg-[#0f5abc]  text-white h-10 rounded overflow-hidden">
            <button className="p-4">
              <BsSearch size={20} />
            </button>
            <div>
              <input
                className="h-full w-[300px] outline-none bg-[#0f5abc] text-white"
                placeholder="Tìm kiếm ..."
              />
            </div>
          </div>
        </form>
        <div>
          <ul className="flex items-center h-full gap-7">
            <li className="box_model relative flex items-center">
              <button className="text-white">
                <MdEmail size={25} />
              </button>

              <div className=" box_model_chilren absolute email -right-2 top-5">
                <div className=" h-auto mt-6  bg-white rounded shadow-lg w-[270px] flex flex-col">
                  <div className="flex w-full justify-between items-center p-3">
                    <span className="text-black opacity-80">Tin Nhắn</span>
                    <Link className="text-[#03a9f4]">Tất cả đã đọc</Link>
                  </div>
                  <hr />
                  <ul className="h-[250px] max-h-[250px] overflow-auto gap-2 flex flex-col mt-2 ">
                    <li className="flex gap-2 hover:bg-[#e2e1e2] p-3 border">
                      <div className="w-10 h-10 ">
                        <img
                          src={Girl}
                          className="object-cover rounded-full w-full h-full"
                          alt={Girl}
                        />
                      </div>
                      <div className="overflow-hidden flex flex-col opacity-80 truncate">
                        <span className="">Name</span>
                        <span className="w-full truncate opacity-80">
                          Message
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div className=" opacity-75 flex items-center justify-between p-3">
                    <Link className="text-[#03a9f4]">Xem tất cả tin nhắn</Link>
                    <AiOutlineRight />
                  </div>
                </div>
              </div>
            </li>
            <li className="box_model relative">
              <div className="w-10 h-10 rounded-full">
                <img
                  src={user?.avatar.url}
                  alt=""
                  className="object-cover rounded-full w-full h-full cursor-pointer"
                />
              </div>
              <div className="box_model_chilren absolute email -right-2 top-7">
                <div className=" h-auto mt-6  bg-white rounded shadow-lg w-[180px] flex flex-col">
                  <ul className="overflow-auto gap-2 flex flex-col mt-2 p-3">
                    <li
                      className="hover:text-[#03a9f4] cursor-pointer"
                      onClick={logoutUser}
                    >
                      <Link className="w-full">Đăng xuất</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
