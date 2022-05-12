import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import s from "./slider.module.scss";

const urls = [
    {
        id: "1",
        url: "https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2021/03/22/36B566.jpg",
    },
    {
        id: "2",
        url: "https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2022/03/16/B7F91D.jpg",
    },
    {
        id: "3",
        url: "https://artcity.vn/wp-content/uploads/2020/07/thiet-ke-poster-phim-3.jpg",
    },
    {
        id: "4",
        url: "https://photo-cms-plo.zadn.vn/w850/Uploaded/2022/wopsvun/2019_12_14/dmadpreteaser1cfathumb_otqg.jpg",
    },
    {
        id: "5",
        url: "https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2021/01/15/C4725E.jpg",
    },
];

export const SliderShow: React.FC = () => {
    const settings = {
        dots: true,
        infinite: false,
        arrows: false,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className={s.sliderWrapper}>
            <Slider {...settings}>
                {urls.map((item) => (
                    <div key={item.id}>
                        <img src={item.url} className={s.image} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};
