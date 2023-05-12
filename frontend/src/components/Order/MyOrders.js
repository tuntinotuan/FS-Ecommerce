import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  console.log("orders~", orders);
  const columns = [
    { field: "id", headerName: "Mã sản phẩm", minWidth: 200, flex: 1 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        // return params?.getValue(params?.id, "status") === "Delivered"
        //   ? "greenColor"
        //   : "redColor";
        return params.id === "Delivered" ? "text-primary" : "text-taghot";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng sản phẩm",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Số tiền",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Thao tác",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          // <Link to={`/order/${params?.getValue(params?.id, "id")}`}>
          // <LaunchIcon />
          // </Link>
          <Link to={`/order/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
        actions: item._id,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user?.name} - Sản phẩm`} />

      {loading ? (
        <Loader />
      ) : (
        <section className="page-container py-5">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="bg-white text-black shadow-sm"
            autoHeight
          />

          <div className="text-center">{`Đơn hàng của ${user?.name}'s <3`}</div>
        </section>
      )}
    </Fragment>
  );
};

export default MyOrders;
