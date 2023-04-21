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
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import BlockTitle from "../others/BlockTitle";
import { IoIosArrowDown } from "react-icons/io";
import { GrList } from "react-icons/gr";
import useHover from "../../hooks/useHover";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import SlidesProducts from "../slides/SlidesProducts";

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
  const { hovered, nodeRef } = useHover();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 99999]);
  const [category, setCategory] = useState("");

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
      <MetaData title="PRODUCTS -- ECOMMERCE" />
      <section className="page-container py-4">
        <SlidesProducts></SlidesProducts>
        <BlockTitle children="Sản phẩm" className="mt-5"></BlockTitle>

        <div className="flex items-start gap-5">
          <div className="w-[200px]">
            <li
              className="flex items-center gap-3 border border-transparent border-b-slate-200 p-3 cursor-pointer"
              onClick={() => setCategory("")}
            >
              <GrList></GrList>
              <h2 className="text-lg font-bold">Tất cả sản phẩm</h2>
            </li>
            <ul className="flex flex-col gap-2 py-4 px-2">
              {categories.map((category) => (
                <li
                  className="hover:text-primary hover:font-bold cursor-pointer"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <Box
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
            </Box>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
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
          <div className="flex-1 mb-3">
            <div className="flex items-center gap-3 bg-[#EDEDED] rounded-[3px] py-3 px-4 mb-3">
              <p>Sắp xếp theo</p>
              <div
                className="relative flex items-center justify-between h-full w-[200px] bg-white rounded-[3px] py-2 px-3 shadow-sm cursor-pointer"
                ref={nodeRef}
              >
                <p>Giá</p>
                <IoIosArrowDown></IoIosArrowDown>
                {hovered && (
                  <div className="absolute top-[102%] left-0 right-0 bg-white rounded-[3px] shadow-md py-2 px-3 z-50">
                    <ul className="flex flex-col">
                      <Link className="hover:text-primary py-2">
                        Giá: Thấp đến Cao
                      </Link>
                      <Link className="hover:text-primary py-2">
                        Giá: Cao đến Thấp
                      </Link>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {products && products.length !== 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p className="text-primary">null product</p>
              )}
            </div>
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
    </Fragment>
  );
};

export default Products;
