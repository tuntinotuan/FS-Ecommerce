import React from "react";
import "../banner/SwiperCustomize.css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useHover from "../../hooks/useHover";
import useViewport from "../../hooks/useViewport";
import Ambassador1 from "../../images/AmbassadorHomepage/Ambassador1.webp";
import Ambassador2 from "../../images/AmbassadorHomepage/Ambassador2.webp";
import Ambassador3 from "../../images/AmbassadorHomepage/Ambassador3.webp";
import Ambassador4 from "../../images/AmbassadorHomepage/Ambassador4.png";
import Ambassador5 from "../../images/AmbassadorHomepage/Ambassador5.png";
import Ambassador6 from "../../images/AmbassadorHomepage/Ambassador6.webp";
import Ambassador7 from "../../images/AmbassadorHomepage/Ambassador7.webp";
import Ambassador8 from "../../images/AmbassadorHomepage/Ambassador8.png";

const SlidesFamousPerson = () => {
  const { hovered, nodeRef } = useHover();
  const { width } = useViewport();
  const tablet = width < 1024;
  const mobile = width < 768;
  const mobileSmaller = width < 640;
  return (
    <section>
      <div
        className="page-container banner-main flex items-start gap-2 select-none"
        ref={nodeRef}
      >
        <Swiper
          grabCursor="true"
          slidesPerView={
            (mobileSmaller && 2) || (mobile && 3) || (tablet && 4) || 5
          }
          spaceBetween={12}
          navigation={hovered}
          pagination={hovered}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={true}
        >
          {famous.map((items) => (
            <SwiperSlide>
              <CardItem linkImg={items.img} title={items.title}></CardItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

function CardItem({ linkImg, title }) {
  return (
    <div className="w-full h-full rounded-[3px] shadow-sm overflow-hidden">
      <img src={linkImg} alt="" className="w-full h-auto object-cover" />
      <h3 className="text-xs font-bold uppercase text-center py-3">{title}</h3>
    </div>
  );
}

export default SlidesFamousPerson;

const famous = [
  {
    img: Ambassador1,
    title: "HOT TIKTOKER GIA THỊ LINH",
  },
  {
    img: Ambassador2,
    title: "Ca sỹ/ Model Bảo Hân Helia",
  },
  {
    img: Ambassador3,
    title: "Ca sỹ/ Diễn viên Lê Na",
  },
  {
    img: Ambassador4,
    title: "Hot Youtuber Jenny Huỳnh",
  },
  {
    img: Ambassador5,
    title: "Diễn viên/ Youtuber Gin Trần",
  },
  {
    img: Ambassador6,
    title: "Review Youtuber Lạ Sneaker",
  },
  {
    img: Ambassador7,
    title: "Hot Youtuber Bông Tím",
  },
  {
    img: Ambassador8,
    title: "Game thủ Stark Đại Đế ",
  },
];
// const famous = [
//   {
//     img: "https://theme.hstatic.net/200000104423/1000577263/14/ht_image_1.png?v=1212",
//     title: "HOT TIKTOKER GIA THỊ LINH",
//   },
//   {
//     img: "https://theme.hstatic.net/200000104423/1000577263/14/ht_image_2.png?v=1212",
//     title: "Ca sỹ/ Model Bảo Hân Helia",
//   },
//   {
//     img: "https://theme.hstatic.net/200000104423/1000577263/14/ht_image_3.png?v=1212",
//     title: "Ca sỹ/ Diễn viên Lê Na",
//   },
//   {
//     img: "https://theme.hstatic.net/200000104423/1000577263/14/ht_image_4.png?v=1212",
//     title: "Hot Youtuber Jenny Huỳnh",
//   },
//   {
//     img: "https://theme.hstatic.net/200000104423/1000577263/14/ht_image_5.png?v=1212",
//     title: "Diễn viên/ Youtuber Gin Trần",
//   },
//   {
//     img: "https://theme.hstatic.net/200000104423/1000577263/14/ht_image_6.png?v=1212",
//     title: "Review Youtuber Lạ Sneaker",
//   },
//   {
//     img: "https://theme.hstatic.net/200000104423/1000577263/14/ht_image_7.png?v=1212",
//     title: "Hot Youtuber Bông Tím",
//   },
//   {
//     img: "https://theme.hstatic.net/200000104423/1000577263/14/ht_image_8.png?v=1212",
//     title: "Game thủ Stark Đại Đế ",
//   },
// ];
