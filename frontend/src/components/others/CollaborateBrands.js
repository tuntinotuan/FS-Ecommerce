import React from "react";
import XiaomiLogo from "../../images/Brands/Xiaomi-Logo.webp";
import SamsungLogo from "../../images/Brands/samsung-logo.jpg";
import AppleLogo from "../../images/Brands/apple_logo.svg_.png";
import OppoLogo from "../../images/Brands/Oppo-logo.png";
import DellLogo from "../../images/Brands/Dell-Logo.png";
import MSILogo from "../../images/Brands/MSI-Logo.png";
import KeychronLogo from "../../images/Brands/keychron-logo.webp";
import LenovoLogo from "../../images/Brands/Lenovo-Logo.png";
const CollaborateBrands = () => {
  return (
    <section className="page-container max-lg:grid-cols-4 max-md:grid-cols-3 grid grid-cols-6 gap-5">
      {brands.map((items) => (
        <div className="flex items-center justify-center bg-white shadow-sm rounded-[3px] p-1">
          <img src={items} alt="" className="w-full object-contain" />
        </div>
      ))}
    </section>
  );
};

export default CollaborateBrands;

const brands = [
  XiaomiLogo,
  SamsungLogo,
  AppleLogo,
  OppoLogo,
  DellLogo,
  MSILogo,
  KeychronLogo,
  LenovoLogo,
];
// const brands = [
//   "https://www.91-cdn.com/pricebaba-blogimages/wp-content/uploads/2021/09/Xiaomi-Logo.png",
//   "https://www.fineprintart.com/images/the-history-behind-the-samsung-logo/the-history-behind-the-samsung-logo-1.jpg",
//   "https://images.crowdspring.com/blog/wp-content/uploads/2022/08/18131304/apple_logo_black.svg_.png",
//   "https://1000logos.net/wp-content/uploads/2018/10/Oppo-logo.png",
//   "https://1000logos.net/wp-content/uploads/2017/07/Dell-Logo.png",
//   "https://logos-world.net/wp-content/uploads/2020/11/MSI-Logo.png",
//   "https://cdn.shopify.com/s/files/1/0059/0630/1017/files/keychron-blacktext2_564ecef7-85a4-458a-b79e-74b63fbcb70d.png?v=1647510916",
//   "https://1000logos.net/wp-content/uploads/2017/03/Lenovo-Logo-2003.png",
// ];
