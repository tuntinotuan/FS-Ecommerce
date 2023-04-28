// import React, { Fragment, useEffect, useState } from "react";
// import "./Products.css";
// import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import Loader from "../layout/Loader/Loader";
// import Pagination from "react-js-pagination";
// // import { useAlert } from "react-alert";
// import Typography from "@material-ui/core/Typography";
// import MetaData from "../layout/MetaData";
// import ProductCard from "../home/ProductCard";
// import { useParams } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";

// const categories = [
//   "Laptop",
//   "Keyboard",
//   "Watch",
//   "Earphone",
//   "SmartPhones",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
// ];
// function valuetext(value) {
//   return `${value}°C`;
// }

// const Products = ({ match }) => {
//   const dispatch = useDispatch();
//   const { filter } = useParams();
//   // const alert = useAlert();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [price, setPrice] = useState([0, 99999]);
//   const [category, setCategory] = useState("");

//   const [ratings, setRatings] = useState(0);

//   const {
//     products,
//     loading,
//     error,
//     productsCount,
//     resultPerPage,
//     filteredProductsCount,
//   } = useSelector((state) => state.products);
//   console.log(
//     "data~:",
//     products,
//     loading,
//     error,
//     productsCount,
//     resultPerPage,
//     filteredProductsCount
//   );
//   const keyword = filter || match?.params?.keyword;

//   const setCurrentPageNo = (e) => {
//     setCurrentPage(e);
//   };

//   const priceHandler = (event, newPrice) => {
//     // setTimeout(() => {
//     setPrice(newPrice);
//     // }, 1000);
//   };
//   let count =
//     filteredProductsCount < 8 && currentPage === 1
//       ? filteredProductsCount
//       : productsCount;

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//     dispatch(getProduct(keyword, currentPage, price, category, ratings));
//   }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

//   return (
//     <Fragment>
//       {/* {loading ? (
//         <Loader />
//       ) : ( */}
//       <Fragment>
//         <MetaData title="PRODUCTS -- ECOMMERCE" />
//         <h2 className="productsHeading">Products</h2>

//         <div className="products">
//           {products &&
//             products.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//         </div>

//         <div className="filterBox">
//           {/* <Typography>Price</Typography> */}
//           {/* <Slider
//               value={price}
//               onChange={priceHandler}
//               valueLabelDisplay="auto"
//               aria-labelledby="range-slider"
//               min={0}
//               max={25000}
//             /> */}
//           <Box sx={{ width: 100 }}>
//             <Slider
//               getAriaLabel={() => "Temperature range"}
//               value={price}
//               onChange={priceHandler}
//               valueLabelDisplay="auto"
//               getAriaValueText={valuetext}
//               min={0}
//               max={99999}
//             />
//           </Box>
//           {/* <Typography>Categories</Typography> */}
//           <li className="category-link" onClick={() => setCategory("")}>
//             All Products
//           </li>
//           <ul className="categoryBox">
//             {categories.map((category) => (
//               <li
//                 className="category-link"
//                 key={category}
//                 onClick={() => setCategory(category)}
//               >
//                 {category}
//               </li>
//             ))}
//           </ul>

//           <fieldset>
//             <legend>Ratings Above</legend>
//             {/* <Typography component="legend">Ratings Above</Typography> */}
//             <Slider
//               value={ratings}
//               onChange={(e, newRating) => {
//                 setRatings(newRating);
//               }}
//               aria-labelledby="continuous-slider"
//               valueLabelDisplay="auto"
//               min={0}
//               max={5}
//             />
//           </fieldset>
//         </div>
//         {resultPerPage < count && (
//           <div className="paginationBox">
//             <Pagination
//               activePage={currentPage}
//               itemsCountPerPage={resultPerPage}
//               totalItemsCount={productsCount}
//               onChange={setCurrentPageNo}
//               nextPageText="Next"
//               prevPageText="Prev"
//               firstPageText="1st"
//               lastPageText="Last"
//               itemClass="page-item"
//               linkClass="page-link"
//               activeClass="pageItemActive"
//               activeLinkClass="pageLinkActive"
//             />
//           </div>
//         )}
//       </Fragment>
//       {/* )} */}
//     </Fragment>
//   );
// };

// export default Products;

import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import ProductCard from "../home/ProductCard";
import { Link, NavLink, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Rating, Typography } from "@mui/material";
import BlockTitle from "../others/BlockTitle";
import { GrList } from "react-icons/gr";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiFirstPage, BiLastPage, BiWinkSmile } from "react-icons/bi";
import SlidesProducts from "../slides/SlidesProducts";
import FilterPrice from "../others/FilterPrice";

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
  const { keyword, category } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 99999]);
  // const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);
  let array = [];
  // products.category.filter(item, index) => array.indexOf(item) === index);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  console.log("products ~", products);
  // products.filter(
  //   (product) =>
  //     // console.log("products ~:", product.category);
  //     (array = array.push(product.category))

  //     // null
  // );
  console.log("array ~", array);
  // const keyword = filter || match?.params?.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    // setTimeout(() => {
    setPrice(newPrice);
    // }, 1000);
  };
  let count =
    filteredProductsCount < 10 && currentPage === 1
      ? filteredProductsCount
      : productsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // setTimeout(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
    // }, 500);
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      <MetaData title="Tất cả sản phẩm trong | Shop Now" />
      {loading ? (
        <Loader></Loader>
      ) : (
        <section className="max-lg:px-5 page-container py-4">
          <SlidesProducts></SlidesProducts>
          <BlockTitle children="Sản phẩm" className="mt-5"></BlockTitle>

          <div className="max-md:flex-col flex items-start gap-5">
            <div className="w-[200px]">
              <Link
                className="flex items-center gap-3 border border-transparent border-b-slate-200 p-3 cursor-pointer"
                to={`/products`}
              >
                <GrList></GrList>
                <h2 className="text-lg font-bold">Tất cả sản phẩm</h2>
              </Link>
              <ul className="max-md:flex-row flex flex-col gap-2 py-4 px-2">
                {categories.map((category) => (
                  <NavLink
                    key={category}
                    to={`/products-category/${category}`}
                    className={({ isActive }) =>
                      isActive ? "text-primary font-bold" : "hover:text-primary"
                    }
                  >
                    {category}
                  </NavLink>
                ))}
              </ul>
              {/* <Box
              // sx={{ width: 100 }}
              >
                <Slider
                  getAriaLabel={() => "Temperature range"}
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={0}
                  max={99999}
                />
              </Box> */}
              <fieldset>
                <Typography component="legend">Đánh Giá</Typography>
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
              <div className="flex flex-col items-start gap-1 text-sm">
                <div className="mb-2">Đánh Giá</div>
                <NavLink
                  // className={({ isActive }) =>
                  //   isActive
                  //     ? "text-primary font-bold bg-slate-200 rounded-full p-1"
                  //     : "hover:text-primary"
                  // }
                  className={`${
                    ratings === 5
                      ? "text-primary bg-slate-200 rounded-full p-1"
                      : ""
                  } flex items-center gap-1 px-2`}
                  onClick={() => setRatings(ratings === 5 ? 0 : 5)}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={5}
                    size="small"
                    precision={0.5}
                    readOnly
                  />
                </NavLink>
                <NavLink
                  // className={({ isActive }) =>
                  //   isActive
                  //     ? "text-primary font-bold bg-slate-200 rounded-full p-1"
                  //     : "hover:text-primary"
                  // }
                  className={`${
                    ratings === 4
                      ? "text-primary bg-slate-200 rounded-full p-1"
                      : ""
                  } flex items-center gap-1 px-2`}
                  onClick={() => setRatings(ratings === 4 ? 0 : 4)}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={4}
                    size="small"
                    precision={0.5}
                    readOnly
                  />
                  trở lên
                </NavLink>
                <NavLink
                  className={`${
                    ratings === 3
                      ? "text-primary bg-slate-200 rounded-full p-1"
                      : ""
                  } flex items-center gap-1 px-2`}
                  onClick={() => setRatings(ratings === 3 ? 0 : 3)}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={3}
                    size="small"
                    precision={0.5}
                    readOnly
                  />
                  trở lên
                </NavLink>
                <NavLink
                  className={`${
                    ratings === 2
                      ? "text-primary bg-slate-200 rounded-full p-1"
                      : ""
                  } flex items-center gap-1 px-2`}
                  onClick={() => setRatings(ratings === 2 ? 0 : 2)}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={2}
                    size="small"
                    precision={0.5}
                    readOnly
                  />
                  trở lên
                </NavLink>
                <NavLink
                  className={`${
                    ratings === 1
                      ? "text-primary bg-slate-200 rounded-full p-1"
                      : ""
                  } flex items-center gap-1 px-2`}
                  onClick={() => setRatings(ratings === 1 ? 0 : 1)}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={1}
                    size="small"
                    precision={0.5}
                    readOnly
                  />
                  trở lên
                </NavLink>
              </div>
            </div>

            <div className="flex-1 mb-3">
              <div className="flex items-center gap-3 bg-[#EDEDED] rounded-[3px] py-3 px-4 mb-3">
                <p>Sắp xếp theo</p>
                <FilterPrice></FilterPrice>
              </div>
              {products?.length !== 0 ? (
                <div className="max-lg:grid-cols-3 max-sm:grid-cols-2 max-[415px]:grid-cols-1 grid grid-cols-5 gap-3">
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="text-primary">
                    Không tìm thấy sản phẩm nào
                  </span>
                  <div className="flex items-center gap-2 text-lg text-primary">
                    <h3>Bạn hãy thử tìm sản phẩm khác nhé</h3>
                    <BiWinkSmile></BiWinkSmile>
                  </div>
                </div>
              )}
              {resultPerPage < count && (
                <div className="my-10">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText={<GrFormNext></GrFormNext>}
                    firstPageText={<BiFirstPage></BiFirstPage>}
                    prevPageText={<GrFormPrevious></GrFormPrevious>}
                    lastPageText={<BiLastPage></BiLastPage>}
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Products;
