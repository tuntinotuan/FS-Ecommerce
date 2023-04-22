// import React, { Fragment, useState, useEffect } from "react";
// import "./UpdateProfile.css";
// import Loader from "../layout/Loader/Loader";
// import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
// import FaceIcon from "@mui/icons-material/Face";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
// // import { useAlert } from "react-alert";
// import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
// import MetaData from "../layout/MetaData";
// import { useNavigate } from "react-router-dom";

// const UpdateProfile = ({ history }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // const alert = useAlert();

//   const { user } = useSelector((state) => state.user);
//   const { error, isUpdated, loading } = useSelector((state) => state.profile);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [avatar, setAvatar] = useState();
//   const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

//   const updateProfileSubmit = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("name", name);
//     myForm.set("email", email);
//     myForm.set("avatar", avatar);
//     dispatch(updateProfile(myForm));
//   };

//   const updateProfileDataChange = (e) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setAvatarPreview(reader.result);
//         setAvatar(reader.result);
//       }
//     };

//     reader.readAsDataURL(e.target.files[0]);
//   };

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//       setEmail(user.email);
//       setAvatarPreview(user.avatar.url);
//     }

//     if (error) {
//       // alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (isUpdated) {
//       // alert.success("Profile Updated Successfully");
//       dispatch(loadUser());

//       // history.push("/account");
//       navigate("/account");

//       dispatch({
//         type: UPDATE_PROFILE_RESET,
//       });
//     }
//   }, [dispatch, error, alert, history, user, isUpdated]);
//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title="Update Profile" />
//           <div className="updateProfileContainer">
//             <div className="updateProfileBox">
//               <h2 className="updateProfileHeading">Update Profile</h2>

//               <form
//                 className="updateProfileForm"
//                 encType="multipart/form-data"
//                 onSubmit={updateProfileSubmit}
//               >
//                 <div className="updateProfileName">
//                   <FaceIcon />
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     required
//                     name="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <div className="updateProfileEmail">
//                   <AlternateEmailIcon />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     name="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <div id="updateProfileImage">
//                   <img src={avatarPreview} alt="Avatar Preview" />
//                   <input
//                     type="file"
//                     name="avatar"
//                     accept="image/*"
//                     onChange={updateProfileDataChange}
//                   />
//                 </div>
//                 <input
//                   type="submit"
//                   value="Update"
//                   className="updateProfileBtn"
//                 />
//               </form>
//             </div>
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default UpdateProfile;

import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user?.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Cập nhật hồ sơ thành công");
      dispatch(loadUser());

      // history.push("/account");
      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, user, isUpdated]);
  return (
    <Fragment>
      <MetaData title="Chỉnh sửa thông tin cá nhân" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="bg-primary py-10">
            <div className="page-container flex items-center justify-center">
              <form
                className="p-8 bg-white shadow-lg rounded-md flex flex-col gap-5"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="flex items-center justify-between">
                  <Link to="/account" className="text-primary">
                    <BsArrowLeft size={25} />
                  </Link>
                  <h1 className="text-xl">Chỉnh sửa thông tin</h1>
                </div>
                <div className="w-full h-10">
                  <input
                    className="w-full h-full pl-3 pr-8 border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md"
                    placeholder="Tên của bạn?"
                    autoFocus
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full h-10">
                  <input
                    className="w-full h-full pl-3 pr-8 border border-slate-200 outline-1 outline-none focus:border-graytagp focus:shadow-md"
                    placeholder="Email của bạn?"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div
                  id="registerImage"
                  className="flex items-center justify-between gap-3 w-full h-10"
                >
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-10 rounded-full"
                  />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <button
                  type="submit"
                  value="Update"
                  className="uppercase w-full h-10 bg-[#43c6ac] text-white text-base tracking-widest opacity-80 hover:opacity-100 rounded mt-5"
                >
                  Cập nhật
                </button>
              </form>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
