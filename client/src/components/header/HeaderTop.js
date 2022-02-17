import React from 'react'
import { Link } from 'react-router-dom'

function HeaderTop() {
    return (
        <div className="header_top">
            <div className="header_top_logo">
                <Link to="/">
                    <i className="fal fa-camera-movie"></i>
                    <span>SamMovie</span>
                </Link>
            </div>
            <div className="header_top_search">
                <input type="text" className="header_top_search-input" />
                <button type="button" className="header_top_search-btn">Search</button>
            </div>
            <div className="header_top_auth">
                <Link className="header_top_auth-link" to="/login" >Login</Link>
                <span>{"|"}</span>
                <Link className="header_top_auth-link" to="/register" >Register</Link>
            </div>
        </div>
    )
}

export default HeaderTop