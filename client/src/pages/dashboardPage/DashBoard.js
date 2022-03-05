import React from 'react';
import { Field, Form, Formik } from 'formik';
import classnames from 'classname';
import { useResolvedPath, useMatch, Link, Routes, Route, } from 'react-router-dom';
import MovieDashBoard from '../../components/dashboard/MovieDashBoard';
import UserDashBoard from '../../components/dashboard/UserDashBoard';




function DashBoard() {

  function CustomLink(linkProps) {
    const { to, lable } = linkProps;

    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <li
        className={classnames(
          match !== null ? "activeLink" : null,
          "sidebar_item"
        )}
      >
        <Link to={to} >{lable} </Link>
      </li>
    );
  }

  return (
    <div className='dashboard'>

      {/* sidebar */}
      <div className="dashboard_sidebar">
        <div className="sidebar_wrapper">
          <ul className="sidebar_list">
            <CustomLink lable="Danh Sách Phim" to="/dashboard" />
            <CustomLink lable="Danh Sách Người Dùng" to="/dashboard/users" />
          </ul>
        </div>
      </div>


      <div className="dashboard_main">
        <div className="main_wrapper">

          {/* Search  */}
          <Formik
            initialValues={{ movie: '', }}
            onSubmit={(values, actions) => {
              console.log(values);
            }}
          >
            {() => (
              <Form className="form_search">
                <Field type="text" name="movie" placeholder="Bạn muốn tìm gì?" />
                <button type="submit">Search</button>
              </Form>
            )}
          </Formik>

          {/* Route children */}
          <Routes>
            <Route index element={<MovieDashBoard />} />
            <Route path="users" element={<UserDashBoard  />} />
          </Routes>

          {/* pagination movie */}
          <div className="dashboard_pagination">
            <span><i className="fa-solid fa-arrow-left-long"></i></span>
            <span className="dashboard_page">1</span>
            <span><i className="fa-solid fa-arrow-right-long"></i></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard