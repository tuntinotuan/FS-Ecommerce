// import React from "react";
// import { ReactNavbar } from "overlay-navbar";
// import logo from "../../../images/logo.png";
// import { MdAccountCircle } from "react-icons/md";
// import { MdSearch } from "react-icons/md";
// import { MdAddShoppingCart } from "react-icons/md";
// import Logo from "../../../images/logo.png";

// const options = {
//   burgerColorHover: "#eb4034",
//   logo,
//   logoWidth: "20vmax",
//   navColor1: "white",
//   logoHoverSize: "10px",
//   logoHoverColor: "#eb4034",
//   link1Text: "Home",
//   link2Text: "Products",
//   link3Text: "Contact",
//   link4Text: "About",
//   link1Url: "/",
//   link2Url: "/products",
//   link3Url: "/contact",
//   link4Url: "/about",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#eb4034",
//   link1Margin: "1vmax",
//   profileIconUrl: "/login",
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
//   profileIcon: true,
//   ProfileIconElement: MdAccountCircle,
//   searchIcon: true,
//   SearchIconElement: MdSearch,
//   cartIcon: true,
//   CartIconElement: MdAddShoppingCart,
// };

// const Header = () => {
//   return <ReactNavbar {...options} />;
// };

// export default Header;

import React, { Fragment, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { BsPhone, BsLaptop, BsTablet } from "react-icons/bs";
import { RiComputerLine } from "react-icons/ri";
import { AiOutlineApple, AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { GiArchiveRegister } from "react-icons/gi";
import shopNow from "../../../images/shopNow.png";
import EmptyCart from "../../../images/empty-cart.webp";

import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";

const Header = ({ history }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };
  function logoutUser() {
    dispatch(logout());
    // alert.success("Logout Successfully");
  }
  return (
    <header className="bg-gradient-to-t from-primary to-[#43CDAC] z-50 fixed top-0 right-0 left-0 shadow-md">
      <div className="flex justify-between items-center page-container w-full py-3">
        <div className="flex items-center gap-5 text-white">
          <Link to="/" className="text-2xl w-[160px]">
            <img src={shopNow} alt="" className="w-full h-full " />
          </Link>
          <form
            className="bg-white text-black rounded-lg p-2 h-10 flex items-center justify-between w-80"
            onSubmit={searchSubmitHandler}
          >
            <input
              className="rounded-lg w-full h-full outline-none ml-2"
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              type="submit"
              className={`h-full w-8 ${
                keyword === "" ? "opacity-50" : ""
              } text-lg pl-1`}
              disabled={keyword === ""}
            >
              <AiOutlineSearch />
            </button>
          </form>
        </div>

        <ul className="text-white text-base flex items-center">
          <li className="h-full text-center mx-3">
            <Link
              to="products?category=Phone"
              className="list_link flex flex-col items-center justify-center"
            >
              <div className="relative overflow-hidden p-1 text-center">
                <BsPhone size={28} className="not-hover" />
                <BsPhone size={28} className="hover" />
              </div>
              <span className="text-sm">Điện Thoại</span>
            </Link>
          </li>
          <li className="h-full text-center mx-3">
            <Link
              to="products?category=Laptop"
              className="list_link flex flex-col items-center justify-center"
            >
              <div className="relative overflow-hidden p-1 text-center">
                <BsLaptop size={28} className="not-hover" />
                <BsLaptop size={28} className="hover" />
              </div>
              <span className="text-sm">Laptop</span>
            </Link>
          </li>
          <li className="h-full text-center mx-3">
            <Link
              to=""
              className="list_link flex flex-col items-center justify-center"
            >
              <div className="relative overflow-hidden p-1 text-center">
                <BsTablet size={28} className="not-hover" />
                <BsTablet size={28} className="hover" />
              </div>
              <span className="text-sm">IPad</span>
            </Link>
          </li>

          <li className="h-full text-center mx-3">
            <Link
              to=""
              className="list_link flex flex-col items-center justify-center"
            >
              <div className="relative overflow-hidden p-1 text-center">
                <RiComputerLine size={28} className="not-hover" />
                <RiComputerLine size={28} className="hover" />
              </div>
              <span className="text-sm">Máy Tính</span>
            </Link>
          </li>

          <li className="h-full text-center mx-3">
            <Link
              to=""
              className="list_link flex flex-col items-center justify-center"
            >
              <div className="relative overflow-hidden p-1 text-center">
                <AiOutlineApple size={28} className="not-hover" />
                <AiOutlineApple size={28} className="hover" />
              </div>
              <span className="text-sm">Apple</span>
            </Link>
          </li>
          <li className="cart_container relative h-full text-center mx-3">
            <Link
              to="/cart"
              className=" list_link flex flex-col items-center justify-center"
            >
              <div
                className="cart__count relative overflow-hidden p-1 text-center"
                data-count={cartItems.length > 99 ? "99+" : cartItems.length}
              >
                <AiOutlineShoppingCart size={28} className="not-hover" />
                <AiOutlineShoppingCart size={28} className="hover" />
              </div>
              <span className="text-sm">Giỏ Hàng</span>
              <div className="box_cart absolute right-0 top-10">
                {cartItems.length < 1 ? (
                  <div className="empty_cart w-96 h-80 bg-white shadow-lg p-10 rounded mt-[28px]">
                    <div>
                      <img src={EmptyCart} />
                    </div>
                  </div>
                ) : (
                  <div className="empty_cart w-96 h-auto bg-white shadow-lg rounded mt-[28px] text-black">
                    <div className="text-[#e0dde0] px-3 py-2 ">
                      <h5>Sản Phẩm</h5>
                    </div>
                    <div className="py-2">
                      <ul className="flex flex-col h-80 max-h-80 overflow-hidden">
                        {cartItems.map((items) => (
                          <Link
                            to={`/product/${items.product}`}
                            className="flex items-start gap-3 text-sm hover:bg-[#f0f0f0] p-3"
                          >
                            <div className="w-[12%] h-[40px]">
                              <img
                                src={items.image}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1 flex justify-between h-full">
                              <h6 className="h-full max-w-[200px] truncate">
                                {items.name}
                              </h6>
                              <div className="text-primary">
                                <span className="text-[10px] mx-4">
                                  {items.quantity > 1
                                    ? `${items.quantity} x`
                                    : ""}
                                </span>
                                <span>
                                  ₫{items.price.toLocaleString("it-IT")}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-end p-3 ">
                      <Link to="/cart" className="text-secondary">
                        Xem Giỏ Hàng
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </li>
          <div className="h-full flex items-center gap-3 border border-transparent border-l-white pl-3">
            {!isAuthenticated && (
              <Fragment>
                <li className="h-full text-center">
                  <Link
                    to="/register"
                    className="list_link flex flex-col items-center justify-center"
                  >
                    <div className="relative overflow-hidden p-1 text-center">
                      <GiArchiveRegister size={28} className="not-hover" />
                      <GiArchiveRegister size={28} className="hover" />
                    </div>
                    <span className="text-sm">Đăng Ký</span>
                  </Link>
                </li>
                <li className="h-full text-center">
                  <Link
                    to="/login"
                    className="list_link flex flex-col items-center justify-center"
                  >
                    <div className="relative overflow-hidden p-1 text-center">
                      <BiLogIn size={28} className="not-hover" />
                      <BiLogIn size={28} className="hover" />
                    </div>
                    <span className="text-sm">Đăng Nhập</span>
                  </Link>
                </li>
              </Fragment>
            )}
            {isAuthenticated && (
              <li className="navbar__usernam h-full cursor-pointer">
                <Link
                  to="/account"
                  className="relative flex items-center justify-center"
                >
                  <div className="flex items-center">
                    <div className="mr-2">
                      <img
                        className="w-9 h-9 rounded-[50%]"
                        src={user.avatar.url}
                        alt="img"
                      />
                    </div>
                    <span className="text-sm max-w-[180px] truncate">
                      {user.name}
                    </span>
                  </div>
                </Link>

                <div className="use_box absolute right-16 text-black">
                  <ul className="arrow flex flex-col gap-3 w-full text-sm bg-white shadow-md mt-4 p-4 rounded-[3px]">
                    {user.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="hover:text-primary"
                      >
                        Quản lý sản phẩm
                      </Link>
                    )}
                    <Link to="/account" className="hover:text-primary">
                      Tài Khoản Của Tôi
                    </Link>
                    <Link to="/orders" className="hover:text-primary">
                      Đơn Mua
                    </Link>
                    <Link className="hover:text-primary" onClick={logoutUser}>
                      Đăng Xuất
                    </Link>
                  </ul>
                </div>
              </li>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Header;
