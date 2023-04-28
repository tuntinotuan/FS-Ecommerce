import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import BannerMain from "../banner/BannerMain";
import BlockTitle from "../others/BlockTitle";
import SlidesFamousPerson from "../slides/SlidesFamousPerson";
import CollaborateBrands from "../others/CollaborateBrands";
import SignUpFormFinal from "../form/SignUpFormFinal";

const products = [
  {
    name: "Blue Tshirt",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffG2Xoo8Ee_1MCgxR0M8MhgXNlvyLTuYk0A&usqp=CAU",
      },
    ],
    price: "$3000",
    _id: "tuannguyen",
    numOfReviews: 200,
  },
];
const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title="Shop thương mại điện tử Việt Nam | Mua và Bán trên website" />
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <BannerMain></BannerMain>
          <section className="max-lg:px-5 home-page page-container my-10">
            {/* <div className="banner">
              <p>Welcome to Ecommerce</p>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>
              <a href="#container">
                <button>
                  Scroll
                  <CgMouse />
                </button>
              </a>
            </div> */}
            <BlockTitle></BlockTitle>
            {/* <h2 className="homeHeading">Sản phẩm nổi bật</h2> */}
            {/* <div className="container" id="container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div> */}
            <div
              className="home-products max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-[320px]:grid-cols-1 grid grid-cols-5 gap-3"
              id="container"
            >
              {products &&
                products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    hiddenReview
                  />
                ))}
            </div>
            <BlockTitle className="mt-3">Đại sứ thương hiệu</BlockTitle>
            <SlidesFamousPerson></SlidesFamousPerson>
            <BlockTitle className="mt-3">
              Thương hiệu đồng hành cùng Shop
            </BlockTitle>
            <CollaborateBrands></CollaborateBrands>
            {/* <SignUpFormV2></SignUpFormV2> */}
            {/* <SignUpFormFinal></SignUpFormFinal> */}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
