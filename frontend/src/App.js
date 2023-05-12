import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import { Fragment, useEffect, useState } from "react";
import Main from "./components/layout/Main";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
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
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import Dashboard from "./components/Admin/Dashboard";
import OrderDetails from "./components/Order/OrderDetails";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import PageNotFound from "./components/layout/PageNotFound/PageNotFound";
import Footer from "./components/layout/Footer/Footer";
import HeadLoginAndSignUp from "./components/layout/Header/HeadLoginAndSignUp";
import WrapAdmin from "./components/Admin/WrapAdmin";

function App() {
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
        {/* Home Route */}
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
            path="/products-category/:category"
            element={<Products></Products>}
          ></Route>
          <Route
            path="/products/:keyword"
            element={<Products></Products>}
          ></Route>
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Profile></Profile>
              </ProtectedRoute>
            }
          />
          <Route path="/me/update" element={<UpdateProfile></UpdateProfile>} />
          <Route
            path="/password/update"
            element={<UpdatePassword></UpdatePassword>}
          />
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
            path="/order/:idOrder"
            element={<OrderDetails></OrderDetails>}
          ></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Route>

        {/* Admin Route */}
        <Route element={<WrapAdmin></WrapAdmin>}>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin>
                <Dashboard></Dashboard>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/products"
            element={<ProductList></ProductList>}
          ></Route>
          <Route
            path="/admin/product"
            element={<NewProduct></NewProduct>}
          ></Route>
          <Route
            path="/admin/product/:idProduct"
            element={<UpdateProduct></UpdateProduct>}
          ></Route>
          <Route path="/admin/orders" element={<OrderList></OrderList>}></Route>
          <Route
            path="/admin/order/:idOrder"
            element={<ProcessOrder></ProcessOrder>}
          ></Route>
          <Route path="/admin/users" element={<UsersList></UsersList>} />
          <Route
            path="/admin/user/:idUser"
            element={<UpdateUser></UpdateUser>}
          />
          <Route
            path="/admin/reviews"
            element={<ProductReviews></ProductReviews>}
          />
        </Route>

        {/* User Route */}
        <Route
          path="/login"
          element={
            <>
              <HeadLoginAndSignUp></HeadLoginAndSignUp>
              <LoginSignUp></LoginSignUp>
              <Footer></Footer>
            </>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <>
              <HeadLoginAndSignUp title="Đăng ký"></HeadLoginAndSignUp>
              <LoginSignUp registerSwitch></LoginSignUp>
              <Footer></Footer>
            </>
          }
        ></Route>
        <Route
          path="/password/forgot"
          element={
            <>
              <HeadLoginAndSignUp title="Đặt lại mật khẩu"></HeadLoginAndSignUp>
              <ForgotPassword></ForgotPassword>
              <Footer></Footer>
            </>
          }
        />
        <Route
          path="/password/reset/:token"
          element={
            <>
              <HeadLoginAndSignUp title="Cấp lại mật khẩu mới"></HeadLoginAndSignUp>
              <ResetPassword></ResetPassword> <Footer></Footer>
            </>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
