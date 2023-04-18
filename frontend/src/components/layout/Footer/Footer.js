import React from "react";
import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
// import "./Footer.css";
// const Footer = () => {
//   return (
//     <footer id="footer">
//       <div className="leftFooter">
//         <h4>DOWNLOAD OUR APP</h4>
//         <p>Download App for Android and IOS mobile phone</p>
//         <img src={playStore} alt="playstore" />
//         <img src={appStore} alt="Appstore" />
//       </div>

//       <div className="midFooter">
//         <h1>ECOMMERCE.</h1>
//         <p>High Quality is our first priority</p>

//         <p>Copyrights 2021 &copy; MeAbhiSingh</p>
//       </div>

//       <div className="rightFooter">
//         <h4>Follow Us</h4>
//         <a href="http://instagram.com/meabhisingh">Instagram</a>
//         <a href="http://youtube.com/6packprogramemr">Youtube</a>
//         <a href="http://instagram.com/meabhisingh">Facebook</a>
//       </div>
//     </footer>
//   );
// };

const Footer = () => {
  return (
    <footer className="">
      <div className="bg-[#FBFBFB] py-12">
        <div className="page-container border border-transparent border-b-slate-300 pb-10">
          <div className="grid grid-cols-5 gap-10">
            <div>
              <h2 className="text-xs font-bold mb-5">CHĂM SÓC KHÁCH HÀNG</h2>
              <ul className="text-xs">
                {customer.map((items) => (
                  <li className="opacity-70 my-2 hover:text-primary cursor-pointer">
                    {items}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-bold mb-5">VỀ SHOP</h2>
              <ul className="text-xs">
                {shop.map((items) => (
                  <li className="opacity-70 my-2 hover:text-primary cursor-pointer">
                    {items}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-bold mb-5">THANH TOÁN</h2>
              <div className="grid grid-cols-3 gap-2">
                {logoPay.map((items) => (
                  <div className="flex items-center justify-center bg-white rounded-[3px] shadow-md py-2">
                    <img src={items} alt="" className="w-12" />
                  </div>
                ))}
              </div>
              <h2 className="text-xs font-bold my-5">ĐƠN VỊ VẬN CHUYỂN</h2>
              <div className="grid grid-cols-3 gap-2">
                {logoShip.map((items) => (
                  <div className="flex items-center justify-center bg-white rounded-[3px] shadow-md py-2">
                    <img src={items} alt="" className="w-12" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xs font-bold mb-5">
                THEO DÕI CHÚNG TÔI TRÊN
              </h2>
              <ul>
                <li className="flex items-center gap-2 mb-3">
                  <BsFacebook className="text-[#4A4A4A]"></BsFacebook>
                  <p className="text-xs opacity-70 hover:text-primary cursor-pointer">
                    Facebook
                  </p>
                </li>
                <li className="flex items-center gap-2 mb-3">
                  <RiInstagramFill
                    size={16}
                    className="text-[#4A4A4A]"
                  ></RiInstagramFill>
                  <p className="text-xs opacity-70 hover:text-primary cursor-pointer">
                    Instagram
                  </p>
                </li>
                <li className="flex items-center gap-2 mb-3">
                  <FaLinkedin size={16} className="text-[#4A4A4A]"></FaLinkedin>
                  <p className="text-xs opacity-70 hover:text-primary cursor-pointer">
                    LinkedIn
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-bold mb-5">
                TẢI ỨNG DỤNG SHOPEE NGAY THÔI
              </h2>
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-[3px] shadow-md p-1 cursor-pointer">
                  <img
                    src="https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-2">
                  {imgApp.map((items) => (
                    <div className="bg-white rounded-[3px] shadow-md p-1 cursor-pointer">
                      <img src={items} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-container flex items-center justify-between text-xs text-graytagp pt-10">
          <p>© 2023 Shopee. Tất cả các quyền được bảo lưu.</p>
          <div className="flex items-center">
            <p>Quốc gia & Khu vực:</p>
            {country.map((items, index) => (
              <span
                className={`px-2 ${
                  index === 0
                    ? ""
                    : "border border-transparent border-l-slate-300"
                } cursor-pointer`}
              >
                {items}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#F5F5F5] mx-auto flex flex-col items-center justify-center text-center py-10">
        <div className="flex items-center mb-10">
          {policy.map((items, index) => (
            <span
              className={`text-[13px] text-graytagp ${
                index === 0
                  ? ""
                  : "border border-transparent border-l-slate-300"
              } px-4 cursor-pointer`}
            >
              {items}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <img
            src="https://luatthienduc.vn/cloud/image-20200115095241-1.png"
            alt=""
            className="w-32 mb-2"
          />
          <img
            src="https://luatthienduc.vn/cloud/image-20200115095241-1.png"
            alt=""
            className="w-32 mb-2"
          />
        </div>
        <p className="text-xs text-graytagp mb-4">Công ty TNHH Shopee</p>
        <div className="flex flex-col gap-[6px] text-xs text-graytagp">
          <span>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai,
            Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng
            đài hỗ trợ: 19001221 - Email: cskh@hotro.poem.vn
          </span>
          <span>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Văn Tuấn - Điện thoại liên
            hệ: 024 73081221 (ext 4678)
          </span>
          <span>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp
            lần đầu ngày 10/02/2015
          </span>
          <span>© 2015 - Bản quyền thuộc về Công ty TNHH Poem</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const customer = [
  "Trung Tâm Trợ Giúp",
  "Shopee Blog",
  "Shopee Mall",
  "Hướng Dẫn Mua Hàng",
  "Hướng Dẫn Bán Hàng",
  "Thanh Toán",
  "Shopee Xu",
  "Vận Chuyển",
  "Trả Hàng & Hoàn Tiền",
  "Chăm Sóc Khách Hàng",
  "Chính Sách Bảo Hành",
];
const shop = [
  "Giới Thiệu Về Shopee Việt Nam",
  "Tuyển Dụng",
  "Điều Khoản Shopee",
  "Chính Sách Bảo Mật",
  "Chính Hãng",
  "Kênh Người Bán",
  "Flash Sales",
  "Chương Trình Tiếp Thị Liên Kết Shopee",
  "Liên Hệ Với Truyền Thông",
];
const logoPay = [
  "https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8",
  "https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16",
  "https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08",
  "https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c",
  "https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281",
  "https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09",
];
const logoShip = [
  "https://down-vn.img.susercontent.com/file/5e7282bd0f7ee0872fdb0bd1d40fbe9e",
  "https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f",
  "https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63",
  "https://down-vn.img.susercontent.com/file/0b3014da32de48c03340a4e4154328f6",
  "https://down-vn.img.susercontent.com/file/3900aefbf52b1c180ba66e5ec91190e5",
  "https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c",
  "https://down-vn.img.susercontent.com/file/6e3be504f08f88a15a28a9a447d94d3d",
  "https://down-vn.img.susercontent.com/file/77bf96a871418fbc21cc63dd39fb5f15",
  "https://down-vn.img.susercontent.com/file/b8348201b4611fc3315b82765d35fc63",
  "https://down-vn.img.susercontent.com/file/d10b0ec09f0322f9201a4f3daf378ed2",
];

const imgApp = [
  "https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163",
  "https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def",
  "https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0",
];

const country = [
  "Singapore",
  "Indonesia",
  "Đài Loan",
  "Thái Lan",
  "Malaysia",
  "Việt Nam",
  "Philippines",
  "Brazil",
  "México",
  "Colombia",
  "Chile",
];

const policy = [
  "CHÍNH SÁCH BẢO MẬT",
  "QUY CHẾ HOẠT ĐỘNG",
  "CHÍNH SÁCH VẬN CHUYỂN",
  "CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN",
];
