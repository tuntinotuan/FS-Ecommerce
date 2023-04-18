import React from "react";

const CollaborateBrands = () => {
  return (
    <section className="page-container grid grid-cols-6 gap-5">
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
  "https://www.91-cdn.com/pricebaba-blogimages/wp-content/uploads/2021/09/Xiaomi-Logo.png",
  "https://www.fineprintart.com/images/the-history-behind-the-samsung-logo/the-history-behind-the-samsung-logo-1.jpg",
  "https://images.crowdspring.com/blog/wp-content/uploads/2022/08/18131304/apple_logo_black.svg_.png",
  "https://1000logos.net/wp-content/uploads/2018/10/Oppo-logo.png",
  "https://1000logos.net/wp-content/uploads/2017/07/Dell-Logo.png",
  "https://logos-world.net/wp-content/uploads/2020/11/MSI-Logo.png",
  "https://cdn.shopify.com/s/files/1/0059/0630/1017/files/keychron-blacktext2_564ecef7-85a4-458a-b79e-74b63fbcb70d.png?v=1647510916",
];
