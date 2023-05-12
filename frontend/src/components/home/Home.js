import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import BannerMain from "../banner/BannerMain";
import BlockTitle from "../others/BlockTitle";
import SlidesFamousPerson from "../slides/SlidesFamousPerson";
import CollaborateBrands from "../others/CollaborateBrands";
const Home = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
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
            <BlockTitle></BlockTitle>
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
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
