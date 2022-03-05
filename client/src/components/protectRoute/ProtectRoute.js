import { connect } from 'react-redux';
import React from 'react';

import DashBoard from './../../pages/dashboardPage/DashBoard';

function ProtectRoute(props) {

    const { info } = props
    const {
        userAuthenticated,
        // role,
    } = info;
    let html
    if (userAuthenticated) {
        html = (
            <DashBoard />
        )
    } else {
        html = (
            <div className="protectroute">
                <h1 >Bạn cần quyền Admin để truy cập</h1>
            </div>
        )
    }
    return (

        <div className="container">
            {html}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        info: state.user
    }
}
export default connect(mapStateToProps, null)(ProtectRoute)