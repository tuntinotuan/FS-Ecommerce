import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsCartPlus, BsDash } from "react-icons/bs";
import { FaRegSmileBeam } from "react-icons/fa";
import BlockTitle from "../others/BlockTitle";
import { nFormatter } from "../home/ProductCard";
import useHover from "../../hooks/useHover";
import { GrFormAdd } from "react-icons/gr";
import { useAlert } from "react-alert";

const labels = {
  0.5: "Rất tệ",
  1: "Tệ",
  1.5: "Rất không hài lòng",
  2: "Không hài lòng",
  2.5: "Tạm ổn",
  3: "Bình thường",
  3.5: "Tốt",
  4: "Hài lòng",
  4.5: "Tuyệt vời",
  5: "Trên cả tuyệt vời",
};
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { idProduct } = useParams();
  const { hovered, nodeRef } = useHover();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  console.log("product", product);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    console.log("increase");
    if (product?.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
    setQuantityEqualZero(false);
  };

  const decreaseQuantity = () => {
    console.log("decrease");
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
    setQuantityEqualZero(false);
  };

  let prevQuantity;
  const changeQuantity = (e) => {
    let qty = Number(e.target.value);
    console.log("qty", qty);
    if (qty > 0) {
      prevQuantity = qty;
    }
    if (qty < 0) return setQuantity(1);
    if (qty === 0) return setQuantity(null);
    if (product?.Stock < qty) return setQuantity(product?.Stock);
    setQuantity(qty);
    setQuantityEqualZero(false);
  };
  const [quantityEqualZero, setQuantityEqualZero] = useState(false);
  const quantityFocusOut = () => {
    if (Number(quantity) == "") return setQuantityEqualZero(true);
    setQuantityEqualZero(false);
    // setQuantity(prevQuantity);
    console.log("focus out quantity", prevQuantity);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(idProduct || match?.params?.id, quantity));
    alert.success("Sản phẩm đã được thêm vào giỏ hàng");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", idProduct || match?.params?.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  console.log("idProduct", idProduct);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Đã bình luận sản phẩm");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(idProduct || match?.params?.id));
  }, [
    dispatch,
    idProduct || match?.params?.id,
    error,
    alert,
    reviewError,
    success,
  ]);
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };
  const currentDate = new Date().toLocaleDateString("en-GB");
  const prevDate = new Date(product?.createAt).toLocaleDateString("en-GB");
  return (
    <Fragment>
      <MetaData title={`${product?.name} -- ${product?.category}`} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="py-5">
            <div className="page-container flex items-start gap-10 bg-white rounded-[3px] shadow-sm p-4">
              <div
                className="banner-main product-details-slides relative flex items-center justify-center h-[400px] w-[400px]"
                ref={nodeRef}
              >
                {product?.Stock < 1 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 text-center z-40">
                    <div className="flex items-center justify-center w-[120px] h-[120px] bg-primary bg-opacity-20 rounded-full">
                      <h2 className="text-2xl text-taghot">Hết hàng</h2>
                    </div>
                  </div>
                )}
                <Swiper
                  pagination={{
                    dynamicBullets: true,
                  }}
                  grabCursor="true"
                  slidesPerView={"auto"}
                  navigation={hovered}
                  modules={[Navigation, Pagination]}
                  className="mySwiper w-full h-full"
                >
                  {product &&
                    product?.images?.map((item, i) => (
                      <SwiperSlide>
                        <div className="w-full h-full rounded-[3px] shadow-sm overflow-hidden">
                          <img
                            key={i}
                            src={item.url}
                            alt={`${i} Slide`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {product?.numOfReviews > 9 && product?.ratings > 4 && (
                    <span className="text-xs bg-taghot text-white shadow-sm px-3">
                      Yêu thích
                    </span>
                  )}
                  {currentDate === prevDate && (
                    <span className="text-xs bg-tagnew text-white px-3">
                      New
                    </span>
                  )}
                  <h2 className="text-lg">{product?.name}</h2>
                  {/* <p>Product # {product?._id}</p> */}
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1">
                    <span className="text-[16px] text-[#faaf00] border border-transparent border-b-[#faaf00]">
                      {`${
                        product.ratings === 5 ||
                        product.ratings === 4 ||
                        product.ratings === 3 ||
                        product.ratings === 2 ||
                        product.ratings === 1
                          ? `${product.ratings}.0`
                          : `${nFormatter(product.ratings, 1)}`
                      } `}
                    </span>
                    <Rating
                      name="text-feedback size-small"
                      size="small"
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                      {...options}
                    />
                  </div>
                  <p className="flex items-center gap-1 text-sm border border-transparent border-l-slate-300 pl-3">
                    <span className="text-[16px] border border-transparent border-b-slate-900 pb-[2px]">
                      {product?.numOfReviews}
                    </span>
                    <span className="text-graytagp">Đánh Giá</span>
                  </p>
                  <p className="flex items-center gap-1 text-sm border border-transparent border-l-slate-300 pl-3">
                    <span className="text-[16px] border border-transparent border-b-slate-900 pb-[2px]">
                      {nFormatter(product?.sold, 1)}
                    </span>
                    <span className="text-graytagp">Đã bán</span>
                    <AiOutlineQuestionCircle className="text-[16px] text-graytagp"></AiOutlineQuestionCircle>
                  </p>
                </div>
                <div className="flex items-center justify-between bg-body rounded-[3px] my-4 p-4">
                  <h1 className="text-3xl text-primary">{`₫${product?.price?.toLocaleString(
                    "it-IT"
                  )}`}</h1>
                  <b
                    className={
                      product?.Stock < 1 ? "text-taghot" : "text-primary"
                    }
                  >
                    {product?.Stock < 1 ? " Hết hàng" : "  Còn hàng"}
                  </b>
                </div>
                <div className="">
                  <div className="flex items-center text-sm mb-5">
                    <p className="w-[100px] text-graytagp">Số lượng</p>
                    <div className="text-center flex justify-center mr-4">
                      <button
                        disabled={product?.Stock < 1 ? true : false}
                        className="border border-[#d3d3d3] w-8 h-8 flex justify-center items-center disabled:cursor-wait"
                        onClick={decreaseQuantity}
                      >
                        <BsDash />
                      </button>
                      <input
                        disabled={product?.Stock < 1 ? true : false}
                        type="number"
                        value={quantity}
                        onChange={changeQuantity}
                        className={`w-12 h-8 text-center p-2 border border-t-[#d3d3d3] border-b-[#d3d3d3] outline-none focus:outline-primary z-10 ${
                          quantityEqualZero && "outline-taghot"
                        }  disabled:cursor-wait`}
                        onBlur={quantityFocusOut}
                      />
                      <button
                        disabled={product?.Stock < 1 ? true : false}
                        className="border border-[#d3d3d3] w-8 h-8 flex justify-center items-center disabled:cursor-wait"
                        onClick={increaseQuantity}
                      >
                        <GrFormAdd />
                      </button>
                    </div>
                    <p className="text-graytagp">{`${product.Stock} sản phẩm có sẵn`}</p>
                  </div>
                  {product?.Stock === quantity && (
                    <p className="text-xs text-taghot ml-[100px]">
                      Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này
                    </p>
                  )}
                  {quantityEqualZero && (
                    <p className="text-xs text-taghot ml-[100px]">
                      Vui lòng nhập số lượng
                    </p>
                  )}
                  <button
                    disabled={
                      product?.Stock < 1 ||
                      quantity === "" ||
                      quantity === "0" ||
                      quantity === null
                        ? true
                        : false
                    }
                    onClick={addToCartHandler}
                    className="flex items-center gap-2 text-primary opacity-80 hover:opacity-100 border border-primary shadow-primary py-2 px-5 mt-5 disabled:cursor-wait"
                  >
                    <BsCartPlus></BsCartPlus>
                    Thêm Vào Giỏ Hàng
                  </button>
                </div>
              </div>
            </div>
            <div className="page-container flex flex-col gap-4 bg-white rounded-[3px] shadow-sm p-6 my-4">
              <div className="">
                <BlockTitle className="uppercase mb-6" locateText="">
                  Chi tiết Sản Phẩm:
                </BlockTitle>
                <div className="flex flex-col gap-2 px-4">
                  <div className="flex items-center text-sm">
                    <p className="w-[150px] text-graytagp">Danh mục</p>
                    <p className="text-sm">{product?.category}</p>
                  </div>
                  <div className="flex items-center text-sm">
                    <p className="w-[150px] text-graytagp">Số lượng</p>
                    <p className="text-sm">{product?.Stock}</p>
                  </div>
                </div>
              </div>
              <div className="">
                <BlockTitle className="uppercase mb-6" locateText="">
                  Mô Tả Sản Phẩm:
                </BlockTitle>
                <p className="text-sm px-4">{product?.description}</p>
              </div>
            </div>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
              className="w-[800px] mx-auto"
            >
              <DialogTitle>Đánh Giá Sản Phẩm</DialogTitle>
              <DialogContent className="">
                <div className="flex items-center gap-2">
                  <h2 className="mr-10">Chất lượng sản phẩm</h2>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    value={5}
                    precision={0.5}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                  <p
                    className={`${
                      rating > 3 ? "text-tagnew" : "text-graytagp"
                    }`}
                  >
                    {labels[rating]}
                  </p>
                </div>

                <textarea
                  className="w-full border border-slate-200 outline-none p-2"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={submitReviewToggle}
                  color="secondary"
                  className="uppercase"
                >
                  Trở lại
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Hoàn Thành
                </Button>
              </DialogActions>
            </Dialog>

            <div className="page-container flex flex-col gap-4 bg-white rounded-[3px] shadow-sm p-6 my-4">
              <h1 className="text-xl uppercase">Đánh giá sản phẩm</h1>
              <div className="flex items-end justify-between gap-5 bg-primary bg-opacity-10 border border-slate-200 rounded-[3px] p-8">
                <div className="flex flex-col items-center gap-2 w-[120px]">
                  <h1 className="flex items-end gap-1 text-lg text-[#faaf00]">
                    <h1 className="text-3xl">{`${
                      product.ratings === 5 ||
                      product.ratings === 4 ||
                      product.ratings === 3 ||
                      product.ratings === 2 ||
                      product.ratings === 1
                        ? `${product.ratings}.0`
                        : `${nFormatter(product.ratings, 1)}`
                    } `}</h1>
                    trên 5
                  </h1>
                  <Rating
                    name="text-feedback size-medium"
                    size="medium"
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                    {...options}
                  />
                </div>
                <button
                  onClick={submitReviewToggle}
                  className="bg-primary text-white opacity-80 py-2 px-4 hover:opacity- rounded-[3px] cursor-pointer"
                >
                  Bình Luận
                </button>
              </div>
              {product?.reviews && product?.reviews[0] ? (
                <div className="reviews">
                  {product?.reviews &&
                    product?.reviews.map((review) => (
                      <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
              ) : (
                <div className="page-container flex items-center gap-2 text-graytagp py-20">
                  <p className="noReviews">Sản phẩm chưa có bình luận nào</p>
                  <FaRegSmileBeam></FaRegSmileBeam>
                </div>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
