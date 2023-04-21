import React from "react";
import "../banner/SwiperCustomize.css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useHover from "../../hooks/useHover";

const SlidesProducts = () => {
  const { hovered, nodeRef } = useHover();
  return (
    <section
    // className="bg-white shadow-sm"
    >
      <div
        className="page-container banner-main max-h-[400px] flex items-start gap-2 select-none"
        ref={nodeRef}
      >
        <Swiper
          grabCursor="true"
          slidesPerView={"auto"}
          navigation={hovered}
          pagination={hovered}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={true}
        >
          {slidesLaptop.map((items) => (
            <SwiperSlide>
              <CardItem linkImg={items}></CardItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

function CardItem({ linkImg }) {
  return (
    <div className="w-full h-full rounded-[3px] shadow-sm overflow-hidden">
      <img src={linkImg} alt="" className="w-full h-auto object-cover" />
    </div>
  );
}

export default SlidesProducts;

const slidesLaptop = [
  "https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/17/638173680008079093_F-C1_1200x300.png",
  "https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/16/638145545567632827_F-C1_1200x300.png",
  "https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/31/638158964819997774_F-C1_1200x300.png",
  "https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/23/638152108997141151_F-C1_1200x300.png",
  "https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/31/638158968388959283_F-C1_1200x300.png",
  "https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/31/638158968838647161_F-C1_1200x300.png",
  "https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/1/638132257782662945_F-C1_1200x300.png",
  "https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/13/638143268520737829_F-C1_1200x300@2x.png",
  "https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/7/638164745449904729_F-C1_1200x300.png",
  "https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/2/2/638109542455788427_F-C1_1200x300.png",
  "https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/20/638149199266138019_F-C1_1200x300.png",
  "https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/22/638150772737878311_F-C1_1200x300.png",
];
