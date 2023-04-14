import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import { Fragment, useEffect, useState } from "react";
import Main from "./components/layout/Main";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import { useSelector } from "react-redux";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import Dashboard from "./components/Admin/Dashboard";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                <Home></Home>
              </>
            }
          ></Route>
          <Route
            path="/product/:idProduct"
            element={<ProductDetails></ProductDetails>}
          ></Route>
          <Route path="/products" element={<Products></Products>}></Route>
          <Route
            path="/products/:filter"
            element={<Products></Products>}
          ></Route>
          <Route path="/search" element={<Search></Search>}></Route>
          <Route path="/account" element={<Profile></Profile>} />
          <Route path="/me/update" element={<UpdateProfile></UpdateProfile>} />
          <Route
            path="/password/update"
            element={<UpdatePassword></UpdatePassword>}
          />
          <Route
            path="/password/forgot"
            element={<ForgotPassword></ForgotPassword>}
          />
          <Route
            path="/password/reset/:token"
            element={<ResetPassword></ResetPassword>}
          />

          <Route path="/login" element={<LoginSignUp></LoginSignUp>}></Route>

          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/login/shipping" element={<Shipping></Shipping>}></Route>
          <Route
            path="/order/confirm"
            element={<ConfirmOrder></ConfirmOrder>}
          ></Route>
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment></Payment>
              </Elements>
            }
          ></Route>
          <Route
            path="/success"
            element={<OrderSuccess></OrderSuccess>}
          ></Route>
          <Route path="/orders" element={<MyOrders></MyOrders>}></Route>
          <Route
            path="/admin/dashboard"
            element={<Dashboard></Dashboard>}
          ></Route>

          <Route path="*" element={<div>Page not found</div>}></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
