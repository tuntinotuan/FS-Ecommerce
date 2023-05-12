import React, { Fragment, useState } from "react";
import { AiFillCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsPhone, BsLaptop, BsTablet, BsKeyboard } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { SlEarphonesAlt } from "react-icons/sl";
import { BiLogIn } from "react-icons/bi";
import { useAlert } from "react-alert";
import { GiArchiveRegister } from "react-icons/gi";
import { MdKeyboardArrowDown } from "react-icons/md";
import shopNow from "../../../images/shopNow.png";
import EmptyCart from "../../../images/empty-cart.webp";

import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import useClickOutSide from "../../../hooks/useClickOutSide";
import Search from "../../Search/Search";
import SearchMobile from "../../Search/SearchMobile";

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { show, setShow } = useClickOutSide();
  const { show: showMenu, setShow: setShowMenu, nodeRef } = useClickOutSide();
  const {
    show: showControl,
    setShow: setShowControl,
    nodeRefControl,
  } = useClickOutSide();

  const [hiddenCart, setHiddenCart] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  function logoutUser() {
    setShowMenu(false);
    dispatch(logout());
    alert.success("Đã đăng xuất");
  }

  return (
    <header className="bg-gradient-to-t from-primary to-[#43CDAC] z-50 fixed top-0 right-0 left-0 shadow-md">
      <div className="flex justify-between items-center page-container w-full py-3 max-lg:px-4 max-md:px-5">
        <div className="max-md:block hidden" ref={nodeRef}>
          <HiMenu
            size={28}
            className="text-white cursor-pointer"
            onClick={() => setShowMenu(true)}
          ></HiMenu>
          <div
            className={`max-md:block max-sm:w-[50vw] max-[415px]:w-[60vw] fixed top-0 bottom-0 left-0 w-[40vw] bg-primary shadow-xl p-5 z-40 ${
              showMenu ? "-translate-x-0" : "-translate-x-full"
            } transition-all hidden`}
          >
            <ul className="max-lg:gap-3 text-white text-base flex flex-col items-start gap-5 z-50">
              <li
                className="h-full w-full text-center"
                onClick={() => setShowMenu(false)}
              >
                <Link
                  to="products-category/SmartPhones"
                  className="list_link flex items-center gap-5"
                >
                  <div className="relative overflow-hidden p-1 text-center">
                    <BsPhone size={28} className="not-hover" />
                    <BsPhone size={28} className="hover" />
                  </div>
                  <span className="text-sm">Điện Thoại</span>
                </Link>
              </li>
              <li
                className="h-full w-full text-center"
                onClick={() => setShowMenu(false)}
              >
                <Link
                  to="products-category/Laptop"
                  className="list_link flex items-center gap-5"
                >
                  <div className="relative overflow-hidden p-1 text-center">
                    <BsLaptop size={28} className="not-hover" />
                    <BsLaptop size={28} className="hover" />
                  </div>
                  <span className="text-sm">Laptop</span>
                </Link>
              </li>
              <li
                className="h-full w-full text-center"
                onClick={() => setShowMenu(false)}
              >
                <Link
                  to="products-category/Ipad"
                  className="list_link flex items-center gap-5"
                >
                  <div className="relative overflow-hidden p-1 text-center">
                    <BsTablet size={28} className="not-hover" />
                    <BsTablet size={28} className="hover" />
                  </div>
                  <span className="text-sm">IPad</span>
                </Link>
              </li>
              <li
                className="h-full w-full text-center"
                onClick={() => setShowMenu(false)}
              >
                <Link
                  to="products-category/Keyboard"
                  className="list_link flex items-center gap-5"
                >
                  <div className="relative overflow-hidden p-1 text-center">
                    <BsKeyboard size={28} className="not-hover" />
                    <BsKeyboard size={28} className="hover" />
                  </div>
                  <span className="text-sm">Bàn phím</span>
                </Link>
              </li>
              <li
                className="h-full w-full text-center"
                onClick={() => setShowMenu(false)}
              >
                <Link
                  to="products-category/Earphone"
                  className="list_link flex items-center gap-5"
                >
                  <div className="relative overflow-hidden p-1 text-center">
                    <SlEarphonesAlt size={28} className="not-hover" />
                    <SlEarphonesAlt size={28} className="hover" />
                  </div>
                  <span className="text-sm">Tai nghe</span>
                </Link>
              </li>

              <li
                className="cart_container relative h-full w-full text-center"
                onClick={() => setShowMenu(false)}
              >
                <Link
                  to="/cart"
                  className="list_link flex items-center gap-5"
                  onMouseOver={() => setHiddenCart(false)}
                >
                  <div
                    className="cart__count relative overflow-hidden p-1 text-center"
                    data-count={
                      cartItems.length > 99 ? "99+" : cartItems.length
                    }
                  >
                    <AiOutlineShoppingCart size={28} className="not-hover" />
                    <AiOutlineShoppingCart size={28} className="hover" />
                  </div>
                  <span className="text-sm">Giỏ Hàng</span>
                </Link>
              </li>
              <div className="relative h-full w-full flex items-center gap-3 border border-transparent border-t-white pt-5">
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
                  <li
                    className="navbar__usernam h-full w-full cursor-pointer"
                    ref={nodeRefControl}
                  >
                    <Link
                      // to="/account"
                      className="relative flex items-center justify-between bg-primary z-50"
                      onClick={() => setShowControl(!showControl)}
                    >
                      <div className="flex items-center gap-5">
                        <img
                          className="w-9 h-9 rounded-[50%]"
                          src={user.avatar.url}
                          alt="img"
                        />
                        <span className="text-sm max-w-[180px] truncate">
                          {user.name}
                        </span>
                      </div>
                      <MdKeyboardArrowDown
                        size="28"
                        className={`${
                          showControl ? "-rotate-180" : ""
                        } transition-all`}
                      ></MdKeyboardArrowDown>
                    </Link>
                    <div
                      className={`absolute ${
                        showControl ? "top-full h-auto " : "top-2 h-0"
                      } right-0 text-black transition-all overflow-hidden`}
                    >
                      <ul className="arrow flex flex-col gap-3 w-full text-sm bg-white shadow-md mt-4 p-4 rounded-[3px]">
                        {user.role === "admin" && (
                          <Link
                            to="/admin/dashboard"
                            className="hover:text-primary"
                            onClick={() => setShowMenu(false)}
                          >
                            Quản lý sản phẩm
                          </Link>
                        )}
                        <Link
                          to="/account"
                          className="hover:text-primary"
                          onClick={() => setShowMenu(false)}
                        >
                          Tài Khoản Của Tôi
                        </Link>
                        <Link
                          to="/orders"
                          className="hover:text-primary"
                          onClick={() => setShowMenu(false)}
                        >
                          Đơn Mua
                        </Link>
                        <Link
                          className="hover:text-primary"
                          onClick={logoutUser}
                        >
                          Đăng Xuất
                        </Link>
                      </ul>
                    </div>
                    {/* <UserControl
                      user={user}
                      showControl={showControl}
                      onClick={logoutUser}
                    ></UserControl> */}
                    {/* <div
                      className={`absolute ${
                        showControl ? "-right-1/2 z-50" : "right-0 z-10"
                      } top-0 text-black transition-all`}
                    >
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
                        <Link
                          className="hover:text-primary"
                          onClick={logoutUser}
                        >
                          Đăng Xuất
                        </Link>
                      </ul>
                    </div> */}
                  </li>
                )}
              </div>
            </ul>
            <AiFillCloseCircle
              size={28}
              onClick={() => setShowMenu(false)}
              className="absolute top-2 right-2 text-white cursor-pointer"
            ></AiFillCloseCircle>
          </div>
        </div>
        <div className="flex items-center gap-5 text-white">
          <Link to="/" className="max-lg:w-[120px] w-[160px]">
            <img src={shopNow} alt="" className="w-full h-full" />
          </Link>
          <Search resMobile="max-lg:hidden"></Search>
          <AiOutlineSearch
            size={28}
            className="max-lg:block max-md:hidden text-white hidden cursor-pointer"
            onClick={() => setShow(true)}
          />
          {show && <SearchMobile onClick={() => setShow(false)}></SearchMobile>}
        </div>
        <AiOutlineSearch
          size={28}
          className="max-md:block text-white hidden cursor-pointer"
          onClick={() => setShow(true)}
        />

        <ul className="max-lg:gap-3 max-md:hidden text-white text-base flex items-center gap-5">
          <li className="h-full text-center">
            <Link
              to="products-category/SmartPhones"
              className="list_link flex flex-col items-center justify-center"
            >
              <div className="relative overflow-hidden p-1 text-center">
                <BsPhone size={28} className="not-hover" />
                <BsPhone size={28} className="hover" />
              </div>
              <span className="text-sm">Điện Thoại</span>
            </Link>
          </li>
          <li className="h-full text-center">
            <Link
              to="products-category/Laptop"
              className="list_link flex flex-col items-center justify-center"
            >
              <div className="relative overflow-hidden p-1 text-center">
                <BsLaptop size={28} className="not-hover" />
                <BsLaptop size={28} className="hover" />
              </div>
              <span className="text-sm">Laptop</span>
            </Link>
          </li>
          <li className="h-full text-center">
            <Link
              to="products-category/Ipad"
              className="list_link flex flex-col items-center justify-center"
            >
              <div className="relative overflow-hidden p-1 text-center">
                <BsTablet size={28} className="not-hover" />
                <BsTablet size={28} className="hover" />
              </div>
              <span className="text-sm">IPad</span>
            </Link>
          </li>
          <li className="h-full text-center">
            <Link
              to="products-category/Keyboard"
              className="list_link flex flex-col items-center justify-center"
            >
              <div className="relative overflow-hidden p-1 text-center">
                <BsKeyboard size={28} className="not-hover" />
                <BsKeyboard size={28} className="hover" />
              </div>
              <span className="text-sm">Bàn phím</span>
            </Link>
          </li>
          <li className="h-full text-center">
            <Link
              to="products-category/Earphone"
              className="list_link flex flex-col items-center justify-center"
            >
              <div className="relative overflow-hidden p-1 text-center">
                <SlEarphonesAlt size={28} className="not-hover" />
                <SlEarphonesAlt size={28} className="hover" />
              </div>
              <span className="text-sm">Tai nghe</span>
            </Link>
          </li>

          <li className="cart_container relative h-full text-center">
            <Link
              to="/cart"
              className=" list_link flex flex-col items-center justify-center"
              onMouseOver={() => setHiddenCart(false)}
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
                      <img src={EmptyCart} alt={EmptyCart} />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`empty_cart w-96 h-auto bg-white shadow-lg rounded mt-[28px] text-black  ${
                      hiddenCart ? "hidden" : ""
                    }`}
                  >
                    <div className="text-[#e0dde0] px-3 py-2 ">
                      <h5>Sản Phẩm</h5>
                    </div>
                    <div className="py-2">
                      <ul className="flex flex-col h-80 max-h-80 overflow-hidden">
                        {cartItems.map((items) => (
                          <Link
                            to={`/product/${items.product}`}
                            className={`flex items-start gap-3 text-sm hover:bg-[#f0f0f0] p-3`}
                            onClick={() => setHiddenCart(true)}
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
                                <span className="text-[10px] mx-4 truncate">
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
                      <Link
                        to="/cart"
                        className="text-secondary"
                        onClick={() => setHiddenCart(true)}
                      >
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
                        className="w-9 h-9 rounded-full object-cover"
                        src={user.avatar.url}
                        alt="img"
                      />
                    </div>
                    <span className="text-sm max-w-[180px] truncate">
                      {user.name}
                    </span>
                  </div>
                </Link>
                <div className="use_box max-lg:right-0 absolute right-16 text-black">
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
