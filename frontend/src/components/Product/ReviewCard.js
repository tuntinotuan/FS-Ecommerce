import React from "react";
import profilePng from "../../images/Profile.png";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="flex items-start gap-2 py-4 border border-transparent border-b-slate-200">
      <div className="w-[50px] h-[50px]">
        <img
          src={review?.avatar?.url || profilePng}
          alt="User"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 text-xs">
        <p className="">{review.name}</p>
        <Rating
          name="text-feedback size-small"
          size="small"
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          {...options}
        />
        <span className="">{review.comment}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
