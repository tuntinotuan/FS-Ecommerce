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
    <div className="p-10 px-40 flex justify-center items-center">
      <div className=" w-full bg-white p-10 rounded shadow-lg flex gap-3">
        <div className="w-[60%] flex flex-col gap-8 justify-center">
          <div className="text-center flex flex-col justify-center items-center gap-3">
            <span className="font-bold text-4xl text-primary">
              THANH TOÁN THÀNH CÔNG
            </span>
            <p className="w-96 text-base italic">
              Cảm ơn bạn đã mua hàng của chúng tôi. Hàng của bạn sẽ được chuyển
              đi trong vài giờ tới
            </p>
          </div>
          <div className="">
            <CheckoutSteps activeStep={3} />
          </div>
          <div className="flex justify-end mt-5 mr-20 items-center gap-1">
            <Link
              to="/orders"
              className="text-[#03a9f4] rounded italic text-base"
            >
              Đơn Hàng Đã Mua
            </Link>
            <FcNext />
          </div>
        </div>
        <div className="relative w-96 h-96">
          <div className="absolute animate-spin h-full w-full rounded-full bg-primary opacity-10"></div>
          <img src={Success} alt="" className="spine" />
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
