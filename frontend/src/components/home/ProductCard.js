import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}
const ProductCard = ({ product, hiddenReview = false }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const priceConverted = product.price.toLocaleString("it-IT");

  const currentDate = new Date().toLocaleDateString("en-GB");
  const prevDate = new Date(product.createAt).toLocaleDateString("en-GB");
  // console.log(
  //   "Check day for tag new ~:",
  //   `${currentDate} - ${product.createAt} = ${prevDate}`
  // );
  return (
    <Fragment>
      <Link
        className="relative h-[292px] bg-white border border-transparent hover:border-primary hover:-translate-y-[2px] hover:shadow-md shadow-sm rounded-sm transition-all "
        to={`/product/${product._id}`}
      >
        <div className="relative w-full h-[60%] ">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="w-full h-full object-contain"
          />
          {product?.Stock < 1 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 text-center z-40">
              <div className="flex items-center justify-center w-[90px] h-[90px] bg-primary bg-opacity-20 rounded-full">
                <h2 className="text-xl text-taghot">Hết hàng</h2>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start h-[40%] p-3">
          <p className="card-name text-xs text-ellipsis">{product.name}</p>
          {!hiddenReview && (
            <div className="flex items-center justify-between gap-2 my-1">
              <Rating
                name="text-feedback size-small"
                size="small"
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
                {...options}
              />
              <span className="text-[10px]">
                ({product.numOfReviews} Đánh giá)
              </span>
            </div>
          )}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-primary">{`₫${priceConverted}`}</span>
            <span className="text-xs opacity-50">{`Đã bán ${nFormatter(
              product.sold,
              1
            )}`}</span>
          </div>
        </div>
        {product.numOfReviews > 9 && product.ratings > 4 && (
          <span className="absolute top-2 left-0 text-xs bg-taghot text-white shadow-sm px-3">
            Yêu thích
          </span>
        )}
        {currentDate === prevDate && (
          <span className="absolute top-0 right-0 text-xs bg-tagnew text-white opacity-95 px-3">
            New
          </span>
        )}
      </Link>
    </Fragment>
  );
};

export default ProductCard;
