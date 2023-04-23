import React from "react";
import { Link } from "react-router-dom";
import * as ReactDOM from "react-dom";

const UserControl = ({ user, showControl, onClick }) => {
  return ReactDOM.createPortal(
    <div
      className={`absolute ${
        showControl ? "left-[40vw] z-50" : "right-full z-10"
      } top-1/2 text-black transition-all`}
    >
      <ul className="arrow flex flex-col gap-3 w-full text-sm bg-white shadow-md mt-4 p-4 rounded-[3px]">
        {user.role === "admin" && (
          <Link to="/admin/dashboard" className="hover:text-primary">
            Quản lý sản phẩm
          </Link>
        )}
        <Link to="/account" className="hover:text-primary">
          Tài Khoản Của Tôi
        </Link>
        <Link to="/orders" className="hover:text-primary">
          Đơn Mua
        </Link>
        <Link className="hover:text-primary" onClick={onClick}>
          Đăng Xuất
        </Link>
      </ul>
    </div>,
    document.querySelector("body")
  );
};

export default UserControl;
