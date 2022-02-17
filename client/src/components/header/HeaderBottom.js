import React from 'react'
import { Link } from 'react-router-dom'

function HeaderBottom() {
    return (
        <div className="header_bottom">
            <div className="category">
                <Link className="category_item" to="/phimbo">Phim Bộ</Link>
                <Link className="category_item" to="/phimle">Phim Lẻ</Link>
                <Link className="category_item" to="/phimhanhdong">Phim Hành Động</Link>
                <Link className="category_item" to="/phimtinhcam">Phim Tình Cảm</Link>
                <Link className="category_item" to="/phimvientuong">Phim Viễn Tưởng</Link>
            </div>
        </div>
    )
}

export default HeaderBottom