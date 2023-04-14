import React from "react";
import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0]?.url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        {/* <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
          {...options}
        /> */}
        <Rating
          name="text-feedback size-small"
          size="small"
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          {...options}
        />
        {/* <Box sx={{ ml: 2 }}>{labels[product.ratings]}</Box> */}
        <span className="productCardSpan">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
