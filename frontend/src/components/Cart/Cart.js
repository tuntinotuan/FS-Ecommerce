// import React, { Fragment } from "react";
// import "./Cart.css";
// import CartItemCard from "./CartItemCard";
// import { useSelector, useDispatch } from "react-redux";
// import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
// // import { Typography } from "@material-ui/core";
// import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
// import { Link, useNavigate } from "react-router-dom";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { cartItems } = useSelector((state) => state.cart);

//   const increaseQuantity = (id, quantity, stock) => {
//     const newQty = quantity + 1;
//     if (stock <= quantity) {
//       return;
//     }
//     dispatch(addItemsToCart(id, newQty));
//   };

//   const decreaseQuantity = (id, quantity) => {
//     const newQty = quantity - 1;
//     if (1 >= quantity) {
//       return;
//     }
//     dispatch(addItemsToCart(id, newQty));
//   };

//   const deleteCartItems = (id) => {
//     dispatch(removeItemsFromCart(id));
//   };

//   const checkoutHandler = () => {
//     // history.push("/login?redirect=shipping");
//     navigate("/login?redirect=shipping");
//     // navigate("/shipping");
//   };

//   return (
//     <Fragment>
//       {cartItems.length === 0 ? (
//         <div className="emptyCart">
//           <RemoveShoppingCartIcon />

//           {/* <Typography>No Product in Your Cart</Typography> */}
//           <Link to="/products">View Products</Link>
//         </div>
//       ) : (
//         <Fragment>
//           <div className="cartPage">
//             <div className="cartHeader">
//               <p>Product</p>
//               <p>Quantity</p>
//               <p>Subtotal</p>
//             </div>

//             {cartItems &&
//               cartItems.map((item) => (
//                 <div className="cartContainer" key={item.product}>
//                   <CartItemCard item={item} deleteCartItems={deleteCartItems} />
//                   <div className="cartInput">
//                     <button
//                       onClick={() =>
//                         decreaseQuantity(item.product, item.quantity)
//                       }
//                     >
//                       -
//                     </button>
//                     <input type="number" value={item.quantity} readOnly />
//                     <button
//                       onClick={() =>
//                         increaseQuantity(
//                           item.product,
//                           item.quantity,
//                           item.stock
//                         )
//                       }
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="cartSubtotal">{`₹${
//                     item.price * item.quantity
//                   }`}</p>
//                 </div>
//               ))}

//             <div className="cartGrossProfit">
//               <div></div>
//               <div className="cartGrossProfitBox">
//                 <p>Gross Total</p>
//                 <p>{`₹${cartItems.reduce(
//                   (acc, item) => acc + item.quantity * item.price,
//                   0
//                 )}`}</p>
//               </div>
//               <div></div>
//               <div className="checkOutBtn">
//                 <button onClick={checkoutHandler}>Check Out</button>
//               </div>
//             </div>
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Cart;

import React, { Fragment, useEffect, useState } from "react";
import "./Cart.css";
import Girl from "../../images/girl.jpg";
import { GrFormAdd } from "react-icons/gr";
import { BsDash } from "react-icons/bs";
// import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
// import { Typography } from "@material-ui/core";
// import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemCart, setItemCart] = useState(1);
  const { cartItems } = useSelector((state) => state.cart);
  // const itemChange = (e) => {
  //   setItemCart(e.target.value);
  //   const newQty = itemCart;

  //   dispatch(addItemsToCart(newQty));
  // };
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
    // navigate("/shipping");
  };
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollbarHeight = document.body.scrollHeight;
  // let pointScrollFixed = offset < scrollbarHeight - 1400;
  let pointScrollFixed = true;
  console.log("offset", offset);
  console.log("document.body.scrollHeight", document.body.scrollHeight);
  return (
    <div className="py-5">
      <div className="page-container relative flex flex-col items-end">
        <div className="w-full bg-white shadow-md px-7 py-5">
          <ul className="flex items-center text-[#757375] text-base">
            <li className="w-[50%]">
              <h1>Sản Phẩm</h1>
            </li>
            <li className="w-[12.5%] text-center">
              <h1>Đơn Giá</h1>
            </li>
            <li className="w-[12.5%] text-center">
              <h1>Số Lượng</h1>
            </li>
            <li className="w-[12.5%] text-center">
              <h1>Tổng Tiền</h1>
            </li>
            <li className="w-[12.5%] text-center">
              <h1>Xóa Sản Phẩm</h1>
            </li>
          </ul>
        </div>
        <div className="mt-4 w-full ">
          <ul className="">
            {cartItems.map((items) => (
              <li
                className="flex items-center text-sm mt-5  bg-white shadow-md px-7 py-5"
                key={items.product}
              >
                <div className="w-[50%] max-w-[50%] flex items-center">
                  <div className="w-20 h-20 border border-[#d3d3d3] mr-5">
                    <img
                      src={items.image}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="truncate">{items.name}</div>
                </div>
                <div className="w-[12.5%] text-center">
                  ₫{items.price.toLocaleString("it-IT")}
                </div>
                <div className="w-[12.5%] text-center flex justify-center">
                  <button
                    className="border border-[#d3d3d3] w-9 h-9 flex justify-center items-center"
                    onClick={() =>
                      decreaseQuantity(items.product, items.quantity)
                    }
                  >
                    <BsDash />
                  </button>
                  <input
                    type="number"
                    value={items.quantity}
                    className="w-12 h-9 text-center p-2 border border-t-[#d3d3d3] border-b-[#d3d3d3] outline-none"
                    // onChange={() => itemChange()}
                  />
                  <button
                    className="border border-[#d3d3d3] w-9 h-9 flex justify-center items-center"
                    onClick={() =>
                      increaseQuantity(
                        items.product,
                        items.quantity,
                        items.stock
                      )
                    }
                  >
                    <GrFormAdd />
                  </button>
                </div>
                <div className="w-[12.5%] text-center text-primary">
                  {`₫${(items.price * items.quantity).toLocaleString("it-IT")}`}
                </div>
                <div className="w-[12.5%] text-center">
                  <button
                    className="p-2 bg-[#ee333d] text-white rounded tracking-widest opacity-80 hover:opacity-100"
                    onClick={() => deleteCartItems(items.product)}
                  >
                    Xóa Hàng
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${
            pointScrollFixed ? "fixed bottom-0 z-50" : "mt-10"
          } w-[60%] rounded-[3px] transition-all`}
        >
          <div
            className={`${
              pointScrollFixed ? "pay_container" : "shadow-md"
            } w-full bg-white px-7 py-8 flex justify-around items-center text-base`}
          >
            <div className="flex ">
              <h1 className="mr-5">Tổng thanh toán</h1>
              <h1>
                (<span>{cartItems.length}</span> Sản Phẩm):
              </h1>
            </div>
            <div>
              <span className="text-primary">{`₫${cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toLocaleString("it-IT")}`}</span>
            </div>
            <div>
              <button
                className="text-white bg-primary px-3 py-2 tracking-widest opacity-80 hover:opacity-100"
                onClick={checkoutHandler}
              >
                Mua Hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
