import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer_logo ">
                    <Link to="/">
                        <i className="fa-solid fa-video"></i>
                        <span>SamMovie</span>
                    </Link>
                </div>
                <div className="footer_category">
                    <h4>Thể Loại</h4>
                    <div className="footer_category-list">
                        <Link className="footer_category-item" to="/phimbo">Phim Bộ</Link>
                        <Link className="footer_category-item" to="/phimle">Phim Lẻ</Link>
                        <Link className="footer_category-item" to="/phimhanhdong">Phim Hành Động</Link>
                        <Link className="footer_category-item" to="/phimtinhcam">Phim Tình Cảm</Link>
                        <Link className="footer_category-item" to="/phimvientuong">Phim Viễn Tưởng</Link>
                    </div>
                </div>
                <div className="footer_assitance">
                    <h4>Trợ Giúp</h4>
                    <div className="footer_assitance-list">
                        <Link className="footer_assitance-item" to="/hoidap">Hỏi Đáp</Link>
                        <Link className="footer_assitance-item" to="/lienhe">Liên Hệ</Link>
                        <Link className="footer_assitance-item" to="/tintuc">Tin tức</Link>
                    </div>
                </div>
                <div className="footer_infor">
                    <h4>Thông tin</h4>
                    <div className="footer_infor-list">
                        <Link className="footer_infor-item" to="/hoidap">Chính Sách Riêng Tư</Link>
                        <Link className="footer_infor-item" to="/lienhe">Điều Khoản Sử Dụng</Link>
                        <Link className="footer_infor-item" to="/tintuc">Khiếu Nại Bản Quyền</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer