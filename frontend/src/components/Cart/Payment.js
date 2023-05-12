import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";
import Master from "../../images/master.png";
import Jbc from "../../images/jcb.png";
import Visa from "../../images/visa.png";

const Payment = () => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {/* <p>4000002760003184</p> */}
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="flex justify-center items-center py-10">
        <form
          className="max-sm:p-5 bg-white rounded shadow-sm p-10 flex flex-col gap-6"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="flex justify-between items-center gap-8">
            <div className="max-sm:p-2 bg-[#f2f2f2] py-5 px-8 rounded">
              <img src={Visa} alt="" />
            </div>
            <div className="max-sm:p-2 bg-[#f2f2f2] py-5 px-8 rounded">
              <img src={Master} alt="" />
            </div>
            <div className="max-sm:p-2 bg-[#f2f2f2] py-5 px-8 rounded">
              <img src={Jbc} alt="" />
            </div>
          </div>
          <div className="max-sm:text-sm max-sm:text-center flex justify-between items-center">
            <hr className="max-sm:w-10 h-[1px] w-20" />
            <p>hoặc thanh toán bằng thẻ tín dụng</p>
            <hr className="max-sm:w-10 h-[1px] w-20" />
          </div>
          <div className="flex flex-col gap-2">
            <lable className="opacity-75">Họ và tên chủ thẻ</lable>
            <input
              placeholder="Nhập họ và tên thẻ"
              className="text-sm p-2 border outline-primary rounded-[3px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <lable className="opacity-75">Số thẻ</lable>
            <div className="w-full flex items-center gap-3">
              <CreditCardIcon />
              <CardNumberElement className="paymentInput w-full border border-slate-200 font-bold outline-slate-200 rounded-[3px] p-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex gap-2 flex-col">
              <lable className="opacity-75">Hạn sử dụng</lable>
              <div className="w-full flex items-center gap-3">
                <EventIcon />
                <CardExpiryElement className="paymentInput w-full border border-slate-200 font-bold outline-slate-200 rounded-[3px] p-2" />
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <lable className="opacity-75">CVC</lable>
              <div className="w-full flex items-center gap-3">
                <VpnKeyIcon />
                <CardCvcElement className="paymentInput w-full border border-slate-200 font-bold outline-slate-200 rounded-[3px] p-2" />
              </div>
            </div>
          </div>
          <button
            type="submit"
            ref={payBtn}
            className="flex  gap-2 items-center justify-center text-white bg-primary rounded p-3 hover:opacity-100 opacity-80"
          >
            <span>THANH TOÁN</span>
            <span className="w-1 bg-white h-[1px]"></span>
            <span>{`₫${
              orderInfo && orderInfo.totalPrice.toLocaleString("it-IT")
            }`}</span>
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
