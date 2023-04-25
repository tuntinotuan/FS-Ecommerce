// import React, { Fragment, useEffect } from "react";
// import { useSelector } from "react-redux";
// import MetaData from "../layout/MetaData";
// import Loader from "../layout/Loader/Loader";
// import { Link, useNavigate } from "react-router-dom";
// import "./Profile.css";

// const Profile = ({ history }) => {
//   const { user, loading, isAuthenticated } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated === false) {
//       // history.push("/login");
//       navigate("/login");
//     }
//   }, [history, isAuthenticated]);
//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title={`${user?.name || "anything"} hồ sơ cá nhân`} />
//           {user ? (
//             <div className="profileContainer">
//               <div>
//                 <h1>My Profile</h1>
//                 <img src={user?.avatar?.url} alt={user?.name} />
//                 <Link to="/me/update">Edit Profile</Link>
//               </div>
//               <div>
//                 <div>
//                   <h4>Full Name</h4>
//                   <p>{user?.name}</p>
//                 </div>
//                 <div>
//                   <h4>Email</h4>
//                   <p>{user?.email}</p>
//                 </div>
//                 <div>
//                   <h4>Joined On</h4>
//                   <p>{String(user?.createdAt).substr(0, 10)}</p>
//                 </div>

//                 <div>
//                   <Link to="/orders">My Orders</Link>
//                   <Link to="/password/update">Change Password</Link>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p>Login now</p>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Profile;

import React, { Fragment, useEffect } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { CgFileDocument } from "react-icons/cg";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      // history.push("/login");
      navigate("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      <MetaData
        title={`${user?.name || "Bạn cần đăng nhập để vào"} hồ sơ cá nhân`}
      />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {user ? (
            <section className="pt-5 pb-10">
              <div className="page-container bg-white rounded-[3px] shadow-sm p-5">
                <div className="max-lg:text-center border border-transparent border-b-slate-200 pb-5 mb-5">
                  <h1 className="text-lg">Hồ Sơ Của Tôi</h1>
                  <p className="opacity-80">
                    Quản lý thông tin hồ sơ để cập nhật những thông tin cần
                    thiết cho bạn
                  </p>
                </div>
                <div className="max-lg:flex-col max-lg:items-center flex items-start gap-10">
                  <div className="max-lg:border-none max-lg:p-5 flex flex-col items-center gap-10 text-center border border-transparent border-r-slate-200 py-10 px-20">
                    <img
                      src={user?.avatar?.url}
                      alt={user?.name}
                      className="w-[100px] h-[100px] object-contain rounded-full"
                    />
                    <Link
                      to="/me/update"
                      className="bg-primary opacity-80 hover:opacity-100 text-white rounded-[3px] py-2 px-5"
                    >
                      Chỉnh sửa thông tin
                    </Link>
                  </div>
                  <div className="max-lg:items-center flex flex-col gap-10 h-auto">
                    <div className="max-[415px]:w-[250px] flex items-center justify-between w-[300px]">
                      <h2>Tên:</h2>
                      <p>{user?.name}</p>
                    </div>
                    <div className="max-[415px]:w-[250px] flex items-center justify-between w-[300px]">
                      <h2>Email:</h2>
                      <p>{user?.email}</p>
                    </div>
                    <div className="max-[415px]:w-[250px] flex items-center justify-between w-[300px]">
                      <h2>Ngày tham gia:</h2>
                      <p>{String(user?.createdAt).substr(0, 10)}</p>
                    </div>

                    <div className="max-sm:flex-col max-sm:gap-5 flex items-center gap-10 mt-auto">
                      <Link
                        to="/orders"
                        className="flex items-center gap-2 bg-primary opacity-80 hover:opacity-100 text-white rounded-[3px] py-2 px-5"
                      >
                        <CgFileDocument></CgFileDocument>
                        Đơn Hàng Của Tôi
                      </Link>
                      <Link
                        to="/password/update"
                        className="bg-primary opacity-80 hover:opacity-100 text-white rounded-[3px] py-2 px-5"
                      >
                        Đổi Mật Khẩu
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <p>Login now</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
