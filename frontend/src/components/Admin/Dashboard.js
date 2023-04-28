import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import HeaderAdmin from "./HeaderAdmin.js";

import Circle from "../../images/circel.svg";
// Chart?.register(Doughnut, Line);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#1572e8"],
        hoverBackgroundColor: ["#1572e8"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };

  return (
    <div>
      <MetaData title="Dashboard - Admin Panel" />

      <div className=" flex flex-col gap-5">
        <div className="h-40 p-10 flex justify-between items-center  bg-[linear-gradient(-45deg,#06418e,#1572e8)] text-white">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl">Dashboard</h1>
            <h1 className="font-bold text-sm opacity-80">Thông kê sản phẩm</h1>
          </div>
          <div className="flex gap-10 ">
            <button className="px-5 py-2 border rounded-3xl hover:opacity-90">
              Quản lý
            </button>
            <Link
              to="/admin/product"
              className="flex items-center px-5 py-2 bg-[#6861ce] rounded-3xl hover:opacity-90"
            >
              Thêm sản phẩm
            </Link>
          </div>
        </div>

        <div className="relative -top-10 flex px-10 justify-between">
          <div className="w-[30%] h-52 relative bg-[linear-gradient(#53A6D8,#88CDF6)] shadow-lg rounded flex items-center">
            <div className="pl-10 flex flex-col text-white gap-4">
              <p className="italic font-bold text-xl">Tổng tiền đơn hàng</p>
              <p className="text-base">{totalAmount}</p>
            </div>
            <div className="h-full">
              <img src={Circle} className="h-full absolute right-0" />
            </div>
          </div>

          <Link className="w-[30%] h-52 relative bg-[linear-gradient(#FD8F52,#FFBD71)] shadow-lg rounded flex items-center">
            <div className="pl-10 flex flex-col text-white gap-4">
              <p className="italic font-bold text-xl">Người dùng</p>
              <p className="text-base">{users && users?.length}</p>
            </div>
            <div className="h-full">
              <img src={Circle} className="h-full absolute right-0" />
            </div>
          </Link>

          <Link className="w-[30%] h-52 relative bg-[linear-gradient(#A7D676,#85CBCC)] shadow-lg rounded flex items-center">
            <div className="pl-10 flex flex-col text-white gap-4">
              <p className="italic font-bold text-xl">Nhân viên</p>
              <p className="text-base">{users && users?.length}</p>
            </div>
            <div className="h-full">
              <img src={Circle} className="h-full absolute right-0" />
            </div>
          </Link>
        </div>

        <div className="relative  flex px-10 justify-around  ">
          <Link className="w-[30%] h-52 relative bg-[linear-gradient(#47CACC,#CDB3D4)] shadow-lg rounded flex items-center">
            <div className="pl-10 flex flex-col text-white gap-4">
              <p className="italic font-bold text-xl">Đơn hàng</p>
              <p className="text-base">{orders && orders?.length}</p>
            </div>
            <div className="h-full">
              <img src={Circle} className="h-full absolute right-0" />
            </div>
          </Link>

          <Link className="w-[30%] h-52 relative bg-[linear-gradient(#FF9190,#FDC094)] shadow-lg rounded flex items-center">
            <div className="pl-10 flex flex-col text-white gap-4">
              <p className="italic font-bold text-xl">Sản phẩm</p>
              <p className="text-base">{products && products?.length}</p>
            </div>
            <div className="h-full">
              <img src={Circle} className="h-full absolute right-0" />
            </div>
          </Link>
        </div>

        <div className="flex justify-center mb-10 mt-10 h-[500px] items-center">
          <Line data={lineState} />
        </div>

        <div className="flex justify-center h-[400px]">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
