import React from 'react'
import { Link } from 'react-router-dom'

function HeaderBottom() {
    return (
        <div className="header_bottom">
            <div className="category">
                <Link className="category_item" to="/list/phimbo">Phim Bộ</Link>
                <Link className="category_item" to="/list/phimle">Phim Lẻ</Link>
                <Link className="category_item" to="/list/phimhanhdong">Phim Hành Động</Link>
                <Link className="category_item" to="/list/phimtinhcam">Phim Tình Cảm</Link>
                <Link className="category_item" to="/list/phimvientuong">Phim Viễn Tưởng</Link>
            </div>
        </div>
    )
}

export default HeaderBottom