import { connect, useDispatch } from 'react-redux';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classnames from 'classname';
import { LoadUser } from '../../actions/Actions';


function HeaderTop(props) {
    const bar = useRef();

    const [search, setSearch] = useState('')
    const negative = useNavigate();
    const dispatch = useDispatch();



    const { info } = props;
    const { userAuthenticated, user } = info;

    let name;
    let level;
    if (userAuthenticated && user !== null) {
        const { username, role } = info.user;
        name = username;
        level = role;
    }

    const handleLogOut = () => {
        dispatch(LoadUser(null));
        negative('/')
    };

    const handleChange = () => {
        bar.current.classList.toggle('d-block');
    };
    const handleChangeInput = (e) => {
        const value = e.target.value
        setSearch(value);
    };
    const handleClick = () => {
        if (search !== "") {
            // let newSeaerch = search.normalize('NFD').toLowerCase().trim()
            //     .replace(/[đĐ]/g, 'd')
            //     .replace(/[\u0300-\u036f]/g, '')
            //     .replace(/\W+/g, ' ')
            //     .replace(/\s/g, '-');

            // console.log('searchHeader:', newSeaerch)
            negative(`/list?search=${search}&arrangement=createdAt&pages=1&category=`)
            setSearch("");

        }
    }

    return (
        <div className="header_top">
            <div className="header_mobile">
                <div className="header_nav"><i className="fas fa-bars" onClick={handleChange}></i></div>
                <div className="header_nav_list d-none" ref={bar}>
                    <Link className="category_item" to="/">Trang chủ</Link>
                    <Link className="category_item" to="/list/phimbo">Phim Bộ</Link>
                    <Link className="category_item" to="/list/phimle">Phim Lẻ</Link>
                    <Link className="category_item" to="/list/phimhanhdong">Phim Hành Động</Link>
                    <Link className="category_item" to="/list/phimtinhcam">Phim Tình Cảm</Link>
                    <Link className="category_item" to="/list/phimvientuong">Phim Viễn Tưởng</Link>
                </div>
            </div>
            <div className="header_top_logo">
                <Link to="/">
                    <i className="fa-solid fa-video"></i>
                    <span>SamMovie</span>
                </Link>
            </div>
            <div className="header_top_search">
                <input type="text"
                    className="header_top_search-input" value={search}
                    onChange={(e) => handleChangeInput(e)}
                    onKeyPress={(e) => e.key === "Enter" ? handleClick() : null}

                />
                <button
                    className="header_top_search-btn"
                    onClick={handleClick} disabled={search.trim() === "" ? true : false}
                >
                    Search
                </button>
            </div>
            <div className="header_top_auth">
                <div className={classnames(
                    userAuthenticated ? "d-flex" : "d-none",
                    "header_top_user"
                )}>
                    <div className="header_user-img">
                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="img avatar" />
                    </div>
                    <span>{name}</span>

                    <div className="header_top_user_subnav">
                        <div className="nav_item"><Link to="/user">Thông tin cá nhân</Link></div>
                        <div className={classnames(level > 0 ? "d-block" : "d-none", "nav_item")}><Link to="/dashboard">Trang Admin</Link></div>
                        <div className="nav_item" onClick={() => handleLogOut()}>Đăng xuất</div>
                    </div>
                </div>
                <div className={classnames(
                    userAuthenticated ? "d-none" : "d-flex",
                )}>
                    <Link className="header_top_auth-link" to="/login" >Login</Link>
                    <span>{"|"}</span>
                    <Link className="header_top_auth-link" to="/register" >Register</Link>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        info: state.user
    }
}
export default connect(mapStateToProps, null)(HeaderTop)