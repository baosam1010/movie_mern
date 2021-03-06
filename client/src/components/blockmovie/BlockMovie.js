import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import filmApi from '../../apis/filmApi';

function BlockMovie(props) {

    const { title, sublink } = props;
    const [films, setFilms] = useState();

    useEffect(() => {
        const getFilms = async () => {
            try {
                const params = {
                    category: sublink,
                    arrangement: 'createdAt',
                    limit: 15,
                }
                const resp = await filmApi.getFilms(params);
                setFilms(resp.listFilm)
            } catch (error) {
                throw error
            }
        };
        getFilms();
        return () => {

        }
    }, [sublink]);
    const showFilms = (films) => {
        let html = null;
        html = films.map(item => {
            const { _id: id, poster, filmName } = item;
            return (
                <li className="item" key={poster}>
                    <span>HD-VietSub</span>
                    <Link to={`info/${id}`}  >
                        <img src={poster} alt="" />
                        <p>{filmName}</p>
                    </Link>
                </li>
            )
        })
        return html;
    };

    return (
        <div className="block">
            <div className="block-title">
                <h2 className="">{title}</h2>
                <Link to={`/list/${sublink}`}> Xem tất cả</Link>
            </div>

            <ul className="list">
                {films && showFilms(films)}               
                
            </ul>
        </div>
    )
}

export default BlockMovie