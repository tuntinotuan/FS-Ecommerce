import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Pagination from "react-js-pagination";
// import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import ProductCard from "../home/ProductCard";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const categories = [
  "Laptop",
  "Keyboard",
  "Watch",
  "Earphone",
  "SmartPhones",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
];
function valuetext(value) {
  return `${value}°C`;
}

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const { filter } = useParams();
  // const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 99999]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  console.log(
    "data~:",
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount
  );
  const keyword = filter || match?.params?.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    // setTimeout(() => {
    setPrice(newPrice);
    // }, 1000);
  };
  let count =
    filteredProductsCount < 8 && currentPage === 1
      ? filteredProductsCount
      : productsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            {/* <Typography>Price</Typography> */}
            {/* <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            /> */}
            <Box sx={{ width: 100 }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={99999}
              />
            </Box>
            {/* <Typography>Categories</Typography> */}
            <li className="category-link" onClick={() => setCategory("")}>
              All Products
            </li>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <legend>Ratings Above</legend>
              {/* <Typography component="legend">Ratings Above</Typography> */}
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
