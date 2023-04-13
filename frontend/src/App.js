import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import { Fragment, useEffect } from "react";
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

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
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
          <Route path="*" element={<div>Page not found</div>}></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
