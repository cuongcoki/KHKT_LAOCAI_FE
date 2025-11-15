//Import React
import { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// Import required modules
import { EffectCards } from "swiper/modules";

// Import data
import image_user from "@/assets/images/cuong/image_user";

export default function Swiper_User() {
  const [getId, setGetId] = useState<number | null>(null);
  return (
    <div className="flex gap-5 items-start justify-center">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        initialSlide={image_user.findIndex((item) => item.id === 3)}
        onSlideChange={(swiper) => {
          const currentIndex = swiper.activeIndex; // index hiện tại
          const currentItem = image_user[currentIndex]; // lấy item tương ứng
          setGetId(currentItem.id);
        }}
        className="mySwiper w-60 h-96"
      >
        {image_user.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex items-center justify-center bg-white rounded-xl shadow-lg"
          >
            <img
              src={item.url}
              alt={item.content}
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col items-center mt-4 ml-5">
        {image_user.map(
          (item) =>
            item.id === getId && (
              <span
                key={item.id}
                className="min-w-[20px] font-cookie text-3xl font-bold text-primary-light my-1"
              >
                {item.content}
              </span>
            )
        )}
      </div>
    </div>
  );
}
