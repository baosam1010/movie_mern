import React from 'react'
import { Link } from 'react-router-dom'

function BlockMovie(props) {

    const {title, sublink} = props;
    
    return (

        <div className="block">
            <div className="block-title">
                <h2 className="">{title}</h2>
                <Link to={sublink}> Xem tất cả</Link>
            </div>

            <ul className="list">
                <li className="item">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
                <li className="item ">
                    <span>HD-VietSub</span>
                    <Link to={`${sublink}/tenphim-id`}  >
                        <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
                        <p>Tên phim</p>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default BlockMovie