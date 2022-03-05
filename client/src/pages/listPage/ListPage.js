/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';


function ListPage() {
  const params = useParams();
  const { slug } = params;

  const title = {
    phimle: "Phim lẻ",
    phimbo: "Phim bộ",
    phimhanhdong: "Phim hành động",
    phimvientuong: "Phim viễn tưởng",
    phimtinhcam: "Phim tình cảm",

  };
  const [init, setInit] = useState({
    category: '',
    arrangement: 'time'
  })
  useEffect(() => {
    setInit({ ...init, category: slug })
    return () => {

    }
  }, [slug]);


  return (
    <div className="listfilm">
      <div className="container">

        {/* bread crumb */}
        <ul className="breadcrumb">
          <li>
            <Link to="/">
              Trang Chủ
            </Link>
          </li>
          <li>
            <Link to="/">
              {title[slug]}
            </Link>
          </li>
        </ul>

        <div className="listfilm_title">
          <span>Phim Lẻ</span> mới nhất ,Tổng hợp danh sách Phim Lẻ hay được web cập nhật liên tục.Tải Phim Lẻ năm 2022, Xem Phim Lẻ vietsub, thuyết minh mới nhất, Tổng hợp Phim Lẻ hay nhất 2022
        </div>

        {/* heading */}
        <div className="heading">
          <h1 className="heading_title">{title[slug]}</h1>
          <Formik
            initialValues={init}
            enableReinitialize={true}
            onSubmit={(values) => {
              setInit({ ...init, ...values })
            }}
          >
            {() => (
              <Form className="form">
                <Field className="form_select form_item" as="select" name="category">
                  <option value="phimbo">{title.phimbo}</option>
                  <option value="phimle">{title.phimle}</option>
                  <option value="phimhanhdong">{title.phimhanhdong}</option>
                  <option value="phimtinhcam">{title.phimtinhcam}</option>
                  <option value="phimvientuong">{title.phimvientuong}</option>
                </Field>
                <Field className="form_select form_item" as="select" name="arrangement">
                  <option value="time">Thời gian cập nhật</option>
                  <option value="view">Lượt xem</option>
                  <option value="year">Năm sản xuất</option>
                </Field>
                <button type="submit" className="form_submit form_item">Tìm kiếm</button>
              </Form>
            )}
          </Formik>
        </div>

        {/* item substance  */}
        <ul className="listfilm_list">
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>
          <li className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to="/info/tenphim-id"  >
              <img src="https://i3.wp.com/img.phimmoichill.net/images/info/un-plan-parfait.jpg" alt="" />
              <p>Tên phim</p>
            </Link>
          </li>

        </ul>

        {/* pagination */}
        <div className="pagination">
          <div className="pagination_wrapper">
            <Link to="/" className="active">1</Link>
            <Link to="/">2</Link>
            <Link to="/">3</Link>
            <Link to="/">4</Link>
            <Link to="/">5</Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ListPage;