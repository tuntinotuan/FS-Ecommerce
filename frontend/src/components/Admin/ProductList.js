import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      // alert.success("Product Deleted Successfully");
      // history.push("/admin/dashboard");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Tên sản phẩm",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Số lượng",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Giá",
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
          <div>
            <div className="flex items-center gap-3">
              <Link
                to={`/admin/product/${params.id}`}
                className="w-14 py-3 px-5 rounded  flex justify-center items-center h-3 bg-[#1572e8] text-white opacity-70 hover:opacity-100"
              >
                <p>EDIT</p>
              </Link>

              <Link
                onClick={() =>
                  // deleteProductHandler(params.getValue(params.id, "id"))
                  deleteProductHandler(params.id)
                }
                className="w-14 py-3 px-5 rounded  flex justify-center items-center h-3 bg-[#f25961] text-white opacity-70 hover:opacity-100"
              >
                <p>Delete</p>
              </Link>
            </div>
          </div>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="h-40 p-10 flex  flex-col bg-[linear-gradient(-45deg,#06418e,#1572e8)] text-xl font-bold text-white">
        <p>Sản phẩm</p>
        {/* <Link
        
        // onClick={() =>
        //   // deleteProductHandler(params.getValue(params.id, "id"))
        //   deleteProductHandler(params.id)
        // }
        className=" w-28 py-2 px-5 rounded  flex justify-center items-center bg-primary text-white"
      >
        <p>CREATE</p>
      </Link> */}
      </div>
      <div className="relative -top-10 px-10">
        <div className="shadow-lg">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            // className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
