// import React, { Fragment, useState } from "react";
// import "./Shipping.css";
// import { useSelector, useDispatch } from "react-redux";
// import { saveShippingInfo } from "../../actions/cartAction";
// import MetaData from "../layout/MetaData";
// // import PinDropIcon from "@material-ui/icons/PinDrop";
// // import HomeIcon from "@material-ui/icons/Home";
// // import LocationCityIcon from "@material-ui/icons/LocationCity";
// // import PublicIcon from "@material-ui/icons/Public";
// // import PhoneIcon from "@material-ui/icons/Phone";
// // import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
// import PinDropIcon from "@mui/icons-material/PinDrop";
// import HomeIcon from "@mui/icons-material/Home";
// import LocationCityIcon from "@mui/icons-material/LocationCity";
// import PublicIcon from "@mui/icons-material/Public";
// import PhoneIcon from "@mui/icons-material/Phone";
// import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
// import { Country, State } from "country-state-city";
// // import { useAlert } from "react-alert";
// import CheckoutSteps from "../Cart/CheckoutSteps";
// import { useNavigate } from "react-router-dom";

// const Shipping = ({ history }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // const alert = useAlert();
//   const { shippingInfo } = useSelector((state) => state.cart);

//   const [address, setAddress] = useState(shippingInfo.address);
//   const [city, setCity] = useState(shippingInfo.city);
//   const [state, setState] = useState(shippingInfo.state);
//   const [country, setCountry] = useState(shippingInfo.country);
//   const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
//   const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

//   const shippingSubmit = (e) => {
//     e.preventDefault();

//     if (phoneNo.length < 10 || phoneNo.length > 10) {
//       alert.error("Phone Number should be 10 digits Long");
//       return;
//     }
//     dispatch(
//       saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
//     );
//     // history.push("/order/confirm");
//     navigate("/order/confirm");
//   };

//   return (
//     <Fragment>
//       <MetaData title="Shipping Details" />

//       <CheckoutSteps activeStep={0} />

//       <div className="shippingContainer">
//         <div className="shippingBox">
//           <h2 className="shippingHeading">Shipping Details</h2>

//           <form
//             className="shippingForm"
//             encType="multipart/form-data"
//             onSubmit={shippingSubmit}
//           >
//             <div>
//               <HomeIcon />
//               <input
//                 type="text"
//                 placeholder="Address"
//                 required
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//             </div>

//             <div>
//               <LocationCityIcon />
//               <input
//                 type="text"
//                 placeholder="City"
//                 required
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               />
//             </div>

//             <div>
//               <PinDropIcon />
//               <input
//                 type="number"
//                 placeholder="Pin Code"
//                 required
//                 value={pinCode}
//                 onChange={(e) => setPinCode(e.target.value)}
//               />
//             </div>

//             <div>
//               <PhoneIcon />
//               <input
//                 type="number"
//                 placeholder="Phone Number"
//                 required
//                 value={phoneNo}
//                 onChange={(e) => setPhoneNo(e.target.value)}
//                 size="10"
//               />
//             </div>

//             <div>
//               <PublicIcon />

//               <select
//                 required
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//               >
//                 <option value="">Country</option>
//                 {Country &&
//                   Country.getAllCountries().map((item) => (
//                     <option key={item.isoCode} value={item.isoCode}>
//                       {item.name}
//                     </option>
//                   ))}
//               </select>
//             </div>

//             {country && (
//               <div>
//                 <TransferWithinAStationIcon />

//                 <select
//                   required
//                   value={state}
//                   onChange={(e) => setState(e.target.value)}
//                 >
//                   <option value="">State</option>
//                   {State &&
//                     State.getStatesOfCountry(country).map((item) => (
//                       <option key={item.isoCode} value={item.isoCode}>
//                         {item.name}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//             )}

//             <input
//               type="submit"
//               value="Continue"
//               className="shippingBtn"
//               disabled={state ? false : true}
//             />
//           </form>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Shipping;

import React, { Fragment, useEffect, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
// import PinDropIcon from "@material-ui/icons/PinDrop";
// import HomeIcon from "@material-ui/icons/Home";
// import LocationCityIcon from "@material-ui/icons/LocationCity";
// import PublicIcon from "@material-ui/icons/Public";
// import PhoneIcon from "@material-ui/icons/Phone";
// import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
// import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );

    navigate("/order/confirm");
  };
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [codeDistricts, setCodeDistricts] = useState([]);
  const [codeWards, setCodeWards] = useState([]);

  const onclick = () => {
    fetch("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.data);
        setProvinces(data.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetch("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.data);
        setProvinces(data.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${codeDistricts}&limit=-1`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("districts", data);
        setDistricts(data.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [codeDistricts]);

  useEffect(() => {
    fetch(
      `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${codeWards}&limit=-1`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("districts", data);
        setWards(data.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [codeWards]);

  const onChange = (event) => {
    setCodeDistricts(event.target.value);
  };
  const onChangeWards = (event) => {
    setCodeWards(event.target.value);
  };
  console.log("onChang", codeDistricts);
  console.log("onChang", districts);

  return (
    <div className="mb-10 py-10">
      <div className="mb-10">
        <CheckoutSteps activeStep={0} />
      </div>

      <div className="max-lg:flex-col-reverse max-lg:px-5 max-sm:px-2 flex justify-center gap-5">
        <div>
          <div className="max-lg:text-center w-full h-auto shadow-md rounded bg-white p-10">
            <div className="text-center font-bold opacity-60 text-lg tracking-widest pb-4">
              <h1 className="text-[#1572e8]">DỊCH VỤ VẬN CHUYỂN</h1>
            </div>
            <div className="text-base flex flex-col italic">
              <span className="py-1">
                Giao hàng nhanh phủ sóng trên toàn quốc
              </span>
              <span className="py-1">
                Kiểm tra sản phẩm trước khi nhận hàng
              </span>
              <span className="py-1">Miễn phí giao lại, miễn phí trả hàng</span>
            </div>

            <div className="text-center font-bold opacity-60 text-lg tracking-widest pb-4 mt-2">
              <h1 className="text-[#1572e8]">DỊCH VỤ ĐÓNG GÓI</h1>
            </div>
            <div className="text-base flex flex-col italic">
              <span className="py-1">Đóng gói hàng hóa cẩn thận, tỉ mỉ</span>
              <span className="py-1">Đảm bảo hành không bị xước, vỡ</span>
              <span className="py-1">
                Uy tín, chất lượng đảm bảo cho sự an toan trong quá trình vận
                chuyển
              </span>
            </div>
          </div>
        </div>
        <form encType="multipart/form-data" onSubmit={shippingSubmit}>
          <div className="w-full h-auto shadow-md rounded bg-white p-5">
            <div className="p-5">
              <div className="text-center font-bold opacity-60 text-lg tracking-widest pb-7">
                <h1 className="text-[#1572e8]">CHI TIẾT VẬN CHUYỂN</h1>
              </div>
              <div className="max-sm:flex-col max-sm:items-start flex items-center justify-between gap-5 pb-5">
                <div className="flex flex-col w-full">
                  <label className="text-base mb-2">Tỉnh/ Thành phố</label>
                  <select
                    // required
                    // value={provinces}
                    onChange={onChange}
                    className="border outline-none h-8 w-full px-2 rounded"
                  >
                    <option value="" onClick={onclick}>
                      Chọn Tỉnh/ Thành phố
                    </option>
                    {provinces?.map((items) => (
                      <option value={items.code}>{items.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-base mb-2">Quận/ Huyện</label>
                  <select
                    // required
                    // value={districts}
                    onChange={onChangeWards}
                    className="border outline-none h-8 w-full px-2 rounded"
                  >
                    <option value="">Chọn Quận/ Huyện</option>
                    {districts?.map((items) => (
                      <option key={items.code} value={items.code}>
                        {items.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="max-sm:flex-col max-sm:items-start  flex justify-between items-center gap-5 pb-5">
                <div className="flex flex-col w-full">
                  <label className="text-base mb-2">Xã/ Phường</label>
                  <select
                    // required
                    className="border outline-none h-8 w-full px-2 rounded"
                  >
                    <option value="">Chọn Quận/ Huyện</option>
                    {wards?.map((items) => (
                      <option value={items.slug}>{items.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-base mb-2">Địa chỉ cụ thể</label>
                  <input
                    required
                    placeholder="Nhập địa chỉ cụ thể"
                    className="border outline-none h-8 px-2 rounded"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <label className="text-base mb-2">Số điện thoại</label>
                  <input
                    type="number"
                    required
                    placeholder="Nhập số điện thoại"
                    className="border outline-none h-8 px-2 rounded"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="max-sm:justify-center flex justify-end mt-10 gap-4">
            <Link
              to="/cart"
              className="text-center rounded bg-[#03a9f4] py-3 px-5 text-white hover:opacity-100 opacity-80"
            >
              TRỞ LẠI
            </Link>
            <button
              type="submit"
              value="Continue"
              className="text-center rounded bg-primary py-3 px-5 text-white hover:opacity-100 opacity-80"
              disabled={state ? false : true}
            >
              TIẾP THEO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
