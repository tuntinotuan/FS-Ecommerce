import React from "react";
import "./SwiperCustomize.css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useHover from "../../hooks/useHover";
import Banner1 from "../../images/BannerHomepage/Banner1.webp";
import Banner2 from "../../images/BannerHomepage/Banner2.webp";
import Banner3 from "../../images/BannerHomepage/Banner3.webp";
import Banner4 from "../../images/BannerHomepage/Banner4.webp";
import Advertisement1 from "../../images/AdCardHomapage/Advertisement1.webp";
import Advertisement2 from "../../images/AdCardHomapage/Advertisement2.webp";

const BannerMain = () => {
  const { hovered, nodeRef } = useHover();
  return (
    <section className="bg-white shadow-sm">
      <div className="page-container max-md:flex-col flex items-start gap-2 py-5">
        <div
          className="banner-main max-lg:max-w-[540px] max-md:w-full max-md:max-w-none max-w-[800px] shadow-sm"
          ref={nodeRef}
        >
          <Swiper
            grabCursor="true"
            slidesPerView={"auto"}
            navigation={hovered}
            pagination={true}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={true}
          >
            {imgBanner.map((items) => (
              <SwiperSlide>
                <BannerItem linkImg={items}></BannerItem>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="max-md:grid max-md:grid-cols-2 flex flex-col justify-start gap-2">
          <img src={Advertisement1} alt="" />
          <img src={Advertisement2} alt="" />
        </div>
      </div>
    </section>
  );
};

function BannerItem({ linkImg }) {
  return (
    <div className="w-full h-full">
      <img src={linkImg} alt="" className="w-full h-auto object-cover" />
    </div>
  );
}

export default BannerMain;

// const imgBanner = [
//   "https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/9/638166607937152206_F-H1_800x300.png",
//   "https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/31/638158971439901826_F-H1_800x300.png",
//   "https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/8/638165128219834891_F-H1_800x300.png",
//   "https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/11/638168320729660302_F-H1_800x300.png",
// ];
const imgBanner = [Banner1, Banner2, Banner3, Banner4];
