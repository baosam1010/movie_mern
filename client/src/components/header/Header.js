
import React from 'react';
import { Link } from 'react-router-dom';
import HeaderBottom from './HeaderBottom';
import HeaderTop from './HeaderTop';



function Header() {
    return (
        <div className="header">
            <div className="container">
                <HeaderTop />
                <HeaderBottom />
            </div>

        </div>
    )
}

export default Header