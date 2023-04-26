// import React from "react";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import "./orderSuccess.css";
// import { Typography } from "@mui/material";
// import { Link } from "react-router-dom";

// const OrderSuccess = () => {
//   return (
//     <div className="orderSuccess">
//       <CheckCircleIcon />

//       <Typography>Your Order has been Placed successfully </Typography>
//       <Link to="/orders">View Orders</Link>
//     </div>
//   );
// };

// export default OrderSuccess;

import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Success from "../../images/success.png";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { FcNext } from "react-icons/fc";

const OrderSuccess = () => {
  return (
    <div className="max-[1280px]:px-20 max-lg:px-5 p-10 px-40 flex justify-center items-center">
      <div className="max-md:flex-col max-sm:p-5 w-full bg-white p-10 rounded shadow-lg flex gap-3">
        <div className="max-md:w-full w-[60%] flex flex-col gap-8 justify-center">
          <div className="text-center flex flex-col justify-center items-center gap-3">
            <span className="max-sm:text-xl font-bold text-4xl text-primary">
              THANH TOÁN THÀNH CÔNG
            </span>
            <p className="max-sm:text-sm max-sm:w-auto w-96 text-base italic">
              Cảm ơn bạn đã mua hàng của chúng tôi. Hàng của bạn sẽ được chuyển
              đi trong vài giờ tới
            </p>
          </div>
          <div className="">
            <CheckoutSteps activeStep={3} textSize="max-sm:text-sm" />
          </div>
          <div className="max-sm:mr-0 flex justify-end mt-5 mr-20 items-center gap-1">
            <Link
              to="/orders"
              className="max-sm:text-sm text-[#03a9f4] rounded italic text-base"
            >
              Đơn Hàng Đã Mua
            </Link>
            <FcNext />
          </div>
        </div>
        <div className="max-[1280px]:overflow-hidden max-md:mx-auto max-sm:h-48 max-sm:w-48 relative w-96 h-96">
          <div className="max-md:animate-ping max-md:opacity-20 absolute animate-spin h-full w-full rounded-full bg-primary opacity-10"></div>
          <img src={Success} alt="" className="spine" />
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
