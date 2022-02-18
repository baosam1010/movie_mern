import React from 'react'
import Slider from "react-slick";


function SliderTop() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };
    return (
        <div className="slider">
            <Slider {...settings}>
                <div >
                    <h3 style={{height: "400px", backgroundColor:"yellow"}} >1</h3>
                </div>
                <div >
                    <h3 style={{height: "400px", backgroundColor:"yellow"}} >2</h3>
                </div>
                <div >
                    <h3 style={{height: "400px", backgroundColor:"yellow"}} >3</h3>
                </div>
                <div >
                    <h3 style={{height: "400px", backgroundColor:"yellow"}} >4</h3>
                </div>
                <div >
                    <h3 style={{height: "400px", backgroundColor:"yellow"}} >5</h3>
                </div>
                <div >
                    <h3 style={{height: "400px", backgroundColor:"yellow"}} >6</h3>
                </div>
                <div >
                    <h3 style={{height: "400px", backgroundColor:"yellow"}} >7</h3>
                </div>
                <div >
                    <h3 style={{height: "400px", backgroundColor:"yellow"}} >8</h3>
                </div>
                <div >
                    <h3 style={{height: "400px", backgroundColor:"yellow"}} >9</h3>
                </div>
            </Slider>
        </div>
    )
}

export default SliderTop