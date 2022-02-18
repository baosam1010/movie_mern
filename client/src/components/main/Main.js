import React from 'react'
import BlockMovie from '../blockmovie/BlockMovie';
import SliderTop from '../slider/SliderTop';

function Main() {

    return (
        <div className="main">
            <div className="container">
                <SliderTop  />
                <BlockMovie title="Phim lẻ mới cập nhật" sublink="/phimle" />
                <BlockMovie title="Phim bộ" sublink="/phimbo" />
                <BlockMovie title="Phim hành động"  sublink="/phimhanhdong"/>
                <BlockMovie title="Phim chiếu rạp"  sublink="/phimchieurap"/>
                <BlockMovie title="Phim tình cảm" sublink="/phimtinhcam" />
                <BlockMovie title="Phim khoa học viễn tưởng" sublink="/phimvietuong"/>
                
            </div>
        </div>
    )
}

export default Main