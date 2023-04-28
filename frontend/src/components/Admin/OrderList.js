import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      // alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      // alert.success("Order Deleted Successfully");
      // history.push("/admin/orders");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.orderStatus === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng sản phẩm",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Thành tiền",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Thao tác",
      minWidth: 200,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <div className="flex items-center gap-3">
              <Link
                to={`/admin/order/${params.id}`}
                className="w-14 py-3 px-5 rounded  flex justify-center items-center h-3 bg-[#1572e8] text-white opacity-70 hover:opacity-100"
              >
                <p>EDIT</p>
              </Link>

              <Link
                onClick={() => deleteOrderHandler(params.id)}
                className="w-14 py-3 px-5 rounded  flex justify-center items-center h-3 bg-[#f25961] text-white opacity-70 hover:opacity-100"
              >
                <p>Delete</p>
              </Link>
            </div>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />
      <div className="h-40 p-10 flex  bg-[linear-gradient(-45deg,#06418e,#1572e8)] text-xl font-bold text-white">
        Tất cả đơn hàng
      </div>

      <div className="relative -top-14 px-10">
        <div className="shadow-lg">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
