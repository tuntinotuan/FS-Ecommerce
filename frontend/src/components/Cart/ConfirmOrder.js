// import React, { Fragment } from "react";
// import CheckoutSteps from "../Cart/CheckoutSteps";
// import { useSelector } from "react-redux";
// import MetaData from "../layout/MetaData";
// import "./ConfirmOrder.css";
// import { Link, useNavigate } from "react-router-dom";
// // import { Typography } from "@material-ui/core";
// import { Typography } from "@mui/material";

// const ConfirmOrder = ({ history }) => {
//   const navigate = useNavigate();
//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.quantity * item.price,
//     0
//   );

//   const shippingCharges = subtotal > 1000 ? 0 : 200;

//   const tax = subtotal * 0.18;

//   const totalPrice = subtotal + tax + shippingCharges;

//   const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

//   const proceedToPayment = () => {
//     const data = {
//       subtotal,
//       shippingCharges,
//       tax,
//       totalPrice,
//     };

//     sessionStorage.setItem("orderInfo", JSON.stringify(data));

//     // history.push("/process/payment");
//     navigate("/process/payment");
//   };

//   return (
//     <Fragment>
//       <MetaData title="Confirm Order" />
//       <CheckoutSteps activeStep={1} />
//       <div className="confirmOrderPage">
//         <div>
//           <div className="confirmshippingArea">
//             <Typography>Shipping Info</Typography>
//             <div className="confirmshippingAreaBox">
//               <div>
//                 <p>Name:</p>
//                 <span>{user?.name}</span>
//               </div>
//               <div>
//                 <p>Phone:</p>
//                 <span>{shippingInfo?.phoneNo}</span>
//               </div>
//               <div>
//                 <p>Address:</p>
//                 <span>{address}</span>
//               </div>
//             </div>
//           </div>
//           <div className="confirmCartItems">
//             <Typography>Your Cart Items:</Typography>
//             <div className="confirmCartItemsContainer">
//               {cartItems &&
//                 cartItems.map((item) => (
//                   <div key={item?.product}>
//                     <img src={item?.image} alt="Product" />
//                     <Link to={`/product/${item?.product}`}>
//                       {item?.name}
//                     </Link>{" "}
//                     <span>
//                       {item?.quantity} X ₫{item?.price} ={" "}
//                       <b>₫{item?.price * item?.quantity}</b>
//                     </span>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//         {/*  */}
//         <div>
//           <div className="orderSummary">
//             <Typography>Order Summery</Typography>
//             <div>
//               <div>
//                 <p>Subtotal:</p>
//                 <span>₫{subtotal}</span>
//               </div>
//               <div>
//                 <p>Shipping Charges:</p>
//                 <span>₫{shippingCharges}</span>
//               </div>
//               <div>
//                 <p>GST:</p>
//                 <span>₫{tax}</span>
//               </div>
//             </div>

//             <div className="orderSummaryTotal">
//               <p>
//                 <b>Total:</b>
//               </p>
//               <span>₫{totalPrice}</span>
//             </div>

//             <button onClick={proceedToPayment}>Proceed To Payment</button>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ConfirmOrder;

import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BsPhone } from "react-icons/bs";
import { RiMapPin5Line } from "react-icons/ri";
import Girl from "../../images/girl.jpg";
import "./ConfirmOrder.css";
import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
// import { Typography } from "@material-ui/core";
import { Typography } from "@mui/material";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = Number((subtotal * 0.18).toFixed(0));

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <div>
        <CheckoutSteps activeStep={1} />
      </div>

      <div>
        <div className="my-5 px-40">
          <div className="flex h-[500px]">
            <div className="w-[60%] h-full pr-5">
              <div className="p-5 h-full bg-white rounded shadow-lg flex flex-col">
                <div>
                  <div className="text-lg font-bold text-primary mb-3">
                    <span>Thông Tin Vận Chuyển</span>
                  </div>
                  <div className="flex flex-col pl-5">
                    <div className="flex items-center text-base italic p-2">
                      <MdOutlineDriveFileRenameOutline size={25} />
                      <div className="ml-2">Tên:</div>
                      <div className="ml-2">{user?.name}</div>
                    </div>

                    <div className="flex items-center text-base italic p-2">
                      <BsPhone size={25} />
                      <div className="ml-2">Số điện thoại:</div>
                      <div className="ml-2">{shippingInfo?.phoneNo}</div>
                    </div>

                    <div className="flex items-center text-base italic p-2">
                      <RiMapPin5Line size={25} />
                      <div className="ml-2">Địa Chỉ:</div>
                      <div className="ml-2">{address}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary mt-3">
                    <span>Đơn Hàng Của Bạn</span>
                  </div>

                  <div className="pl-5">
                    <ul className="confirm-order-scroll h-[250px] w-full mt-5 max-h-[300px] overflow-auto ">
                      {cartItems &&
                        cartItems.map((item) => (
                          <li
                            className="p-2 w-[94%] rounded bg-white border border-primary flex justify-between items-center mb-4"
                            key={item?.product}
                          >
                            <div className="flex items-center w-[60%]">
                              <Link
                                to={`/product/${item?.product}`}
                                className="w-10 h-10 border mr-5"
                              >
                                <img
                                  src={item?.image}
                                  alt=""
                                  className="w-full h-full object-contain"
                                />
                              </Link>
                              <div className="w-full truncate">
                                <Link
                                  to={`/product/${item?.product}`}
                                  className="truncate"
                                >
                                  {item?.name}
                                </Link>
                              </div>
                            </div>
                            <div className="flex items-center text-xs w-40%]">
                              <div className="px-2 italic">
                                <span>
                                  {item?.quantity.toLocaleString("it-IT")} x ₫
                                  {item?.price.toLocaleString("it-IT")} ={" "}
                                </span>
                              </div>
                              <div>
                                <span className="text-sm text-primary font-bold">
                                  ₫
                                  {(
                                    item?.price * item?.quantity
                                  ).toLocaleString("it-IT")}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[40%] h-full pl-5">
              <div className="p-14 h-full bg-white rounded shadow-lg flex flex-col gap-4 justify-center">
                <div className="text-center font-bold text-base">
                  <span>Tổng Giá Đơn Hàng</span>
                </div>
                <div className="w-full h-[2px] bg-primary opacity-80"></div>
                <div className="gap-3 flex flex-col">
                  <div className="flex justify-between py-1">
                    <span>Tiền Sản Phẩm</span>
                    <span>₫{subtotal.toLocaleString("it-IT")}</span>
                  </div>
                  <div className="w-full h-[1px] bg-black opacity-20"></div>

                  <div className="flex justify-between py-1">
                    <span>Phí Vận Chuyển</span>
                    <span>₫{shippingCharges.toLocaleString("it-IT")}</span>
                  </div>
                  <div className="w-full h-[1px] bg-black opacity-20"></div>

                  <div className="flex justify-between py-1">
                    <span>Phí Bảo Hành VC</span>
                    <span>₫{tax.toLocaleString("it-IT")}</span>
                  </div>
                  <div className="w-full h-[1px] bg-black opacity-20"></div>
                </div>
                <div className="w-full h-[2px] bg-primary opacity-80"></div>
                <div>
                  <div className="flex justify-between items-center py-4">
                    <span>Tổng Tiền</span>
                    <span className="text-primary font-bold">
                      ₫{totalPrice.toLocaleString("it-IT")}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-around p-1">
                    <Link
                      to="/login/shipping"
                      className="text-center rounded bg-[#03a9f4] py-3 px-5 text-white hover:opacity-100 opacity-80"
                    >
                      TRỞ LẠI
                    </Link>
                    <button
                      onClick={proceedToPayment}
                      className="text-center rounded bg-primary py-3 px-5 text-white hover:opacity-100 opacity-80"
                    >
                      THANH TOÁN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
