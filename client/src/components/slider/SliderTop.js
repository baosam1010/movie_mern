import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import filmApi from '../../apis/filmApi';
import { Link } from 'react-router-dom';



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
    const [filmSlide, setFilmSlide] = useState();

    useEffect(() => {
        const getSlide = async () => {
            try {
                const params = { 
                    limit: 9,    
                }
                const resp = await filmApi.getFilms(params);
                setFilmSlide(resp.listFilm);
            } catch (error) {
                throw error;
            }
        };
        getSlide();

        return () => { 
            setFilmSlide() 
        }
    }, []);

    const showSlide = (films) => {
        let html = null;
        html = films.map(item => {
            const { poster, filmName, _id: id } = item
            return (
                <div
                    key={id}
                    className="film_wrapper"
                >
                    <Link
                        to={`/info/${id}`}
                    >
                        <div className="film_img">
                            <img alt="img film" src={poster} />
                        </div>
                        <p>{filmName}</p>
                    </Link>
                </div>
            )
        })
        return html;
    };

    return (
        <div className="slider">
            <Slider {...settings}>
                {filmSlide && showSlide(filmSlide)}
            </Slider>
        </div>
    )
}

export default SliderTop