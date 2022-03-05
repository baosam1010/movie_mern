import React from 'react'
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
// import { DeleteUser } from '../../actions/Actions';

function ItemDashBoard(props) {
    const { name, id, handleChange, typeItem } = props;
    const { filmName,poster  } = props

    const handleChangeItem = (data) => {
        handleChange(data);
    };
    let html = null;
    if (typeItem === "user") {
        html = <li className="main_item">
            <Link className="item_link" to={`/user/${id}`}>
                <div className="item_img">
                    <img src="https://d2fba2yi4kvwh0.cloudfront.net/images/movie/backdrop/t9K8ycUBCplWiICDOKRNRYcEH9e.jpg" alt="img movie" />
                    <div className="item_name">
                        <p className="">{name}</p>
                    </div>
                </div>
            </Link>
            <div className="item_btn">
                <button type="button" className="btn_delete" onClick={() => handleChangeItem({ id, type: "delete" })}>Xóa</button>
                <button type="button" className="btn_update" onClick={() => handleChangeItem({ id, type: "update" })}>Sửa</button>
            </div>
        </li>
        return html
    } else if(typeItem ==="movie") {
        html = <li className="main_item">
            <Link className="item_link" to={`/info/${id}`}>
                <div className="item_img">
                    <img src={poster} alt="img movie" />
                    <div className="item_name">
                        <p className="">{filmName}</p>
                    </div>
                </div>
            </Link>
            <div className="item_btn">
                <button type="button" className="btn_delete" onClick={() => handleChangeItem({ id, type: "delete" })}>Xóa</button>
                <button type="button" className="btn_update" onClick={() => handleChangeItem({ id, type: "update" })}>Sửa</button>
            </div>
        </li>
        return html
    }
    return (html
        // <li className="main_item">
        //     <Link className="item_link" to="/users/tenuser">
        //         <div className="item_img">
        //             <img src="https://d2fba2yi4kvwh0.cloudfront.net/images/movie/backdrop/t9K8ycUBCplWiICDOKRNRYcEH9e.jpg" alt="img movie" />
        //             <div className="item_name">
        //                 <p className="">{name}</p>
        //             </div>
        //         </div>
        //     </Link>
        //     <div className="item_btn">
        //         <button type="button" className="btn_delete" onClick={() => handleChangeItem({ id, type: "delete" })}>Xóa</button>
        //         <button type="button" className="btn_update" onClick={() => handleChangeItem({ id, type: "update" })}>Sửa</button>
        //     </div>
        // </li>
    )
}

export default ItemDashBoard