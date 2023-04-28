import React from "react";
import { Link, NavLink } from "react-router-dom";
import Girl from "../../images/girl.jpg";
import { ImHome, ImCart, ImUsers } from "react-icons/im";
import {
  MdRateReview,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import "./sidebar.css";
import Logo from "../../images/shopNow.png";
import { FiMenu } from "react-icons/fi";
import { FaLayerGroup } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: <ImHome size={25} />,
    },
    {
      path: "/admin/products",
      name: "Products",
      icon: <MdOutlineProductionQuantityLimits size={25} />,
    },
    {
      path: "/admin/orders",
      name: "Orders",
      icon: <ImCart size={25} />,
    },
    {
      path: "/admin/users",
      name: "Users",
      icon: <ImUsers size={25} />,
    },
    {
      path: "/admin/reviews",
      name: "Reviews",
      icon: <MdRateReview size={25} />,
    },
  ];
  return (
    <div
      style={{ width: isOpen ? "250px" : "50px" }}
      className=" h-[100vh] w-[250px] z-50 transition-all shadow-lg"
    >
      <div className="">
        <div className="bg-[#1572e8] flex items-center justify-around gap-4 px-3 h-16 text-white ">
          {/* <h1
            style={{ display: isOpen ? "block" : "none" }}
            className="text-base font-bold italic"
          >
            SHOP NOW
          </h1> */}
          {isOpen && (
            <Link to="/admin/dashboard">
              <img src={Logo} alt="" className="w-full h-full" />
            </Link>
          )}
          <Link>
            <FiMenu size={25} onClick={toggle} />
          </Link>
        </div>
      </div>
      <div className="">
        <div className="sidebar-page py-5">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link flex py-3 px-3 gap-4 items-center transition-none"
              activeclassName="active"
            >
              <div className="">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="text-base"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Sidebar;
