import React from 'react'
import BlockMovie from '../blockmovie/BlockMovie';
import SliderTop from '../slider/SliderTop';
import {connect} from 'react-redux';

function Main(props) {
    
    return (
        <div className="main">
            <div className="container">
                <SliderTop  />
                <BlockMovie title="Phim mới cập nhật" sublink="phimle" />
                <BlockMovie title="Phim bộ" sublink="phimbo" />
                <BlockMovie title="Phim hành động"  sublink="phimhanhdong"/>
                <BlockMovie title="Phim chiếu rạp"  sublink="phimchieurap"/>
                <BlockMovie title="Phim tình cảm" sublink="phimtinhcam" />
                <BlockMovie title="Phim viễn tưởng" sublink="phimvientuong"/>    
            </div>
        </div>
    )
}

export default connect(null, null)(Main)