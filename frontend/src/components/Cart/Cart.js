import React from "react";
import "./Cart.css";
import { GrFormAdd } from "react-icons/gr";
import { BsDash } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

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
          {cartItems?.length > 0 ? (
            <ul className="">
              {cartItems?.map((items) => (
                <li
                  className="flex items-center text-sm mt-5 bg-white shadow-md px-7 py-5"
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
                      onChange={(e) => {
                        let qty = Number(e.target.value);
                        if (Number(items.stock) < qty) {
                          dispatch(addItemsToCart(items.product, items.stock));
                        } else {
                          dispatch(addItemsToCart(items.product, qty));
                        }
                      }}
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
                    {`₫${(items.price * items.quantity).toLocaleString(
                      "it-IT"
                    )}`}
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
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-sm mt-5 bg-white shadow-md px-7 py-5">
              <p className="text-graytagp">Bạn chưa thêm gì vào giỏ hàng</p>
              <Link
                to="/products"
                className="text-lg font-bold bg-primary text-white rounded-[3px] hover:opacity-100 opacity-80 py-2 px-4"
              >
                Xem tất cả sản phẩm
              </Link>
            </div>
          )}
        </div>
        <div
          className={`max-lg:w-[95%] max-md:w-[94%] max-sm:w-[92%] fixed bottom-0 z-50 w-[60%] rounded-[3px] transition-all ${
            cartItems?.length <= 0 && "hidden"
          }`}
        >
          <div
            className={`pay_container w-full bg-white px-7 py-8 flex justify-around items-center text-base`}
          >
            <div className="flex ">
              <h1 className="max-sm:hidden mr-5">Tổng thanh toán</h1>
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
