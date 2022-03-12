import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import classnames from 'classname';
import { useResolvedPath, useMatch, Link, Routes, Route, useLocation, } from 'react-router-dom';
import MovieDashBoard from '../../components/dashboard/MovieDashBoard';
import UserDashBoard from '../../components/dashboard/UserDashBoard';




function DashBoard() {
  const [init, setInit] = useState({
    pages: 1,
    limit: 10,
    search: ""
  });
  const [totalPages, setTotalPages] = useState()
  const { pathname } = useLocation();
  console.log('params:', pathname)

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
  };
  useEffect(() => {
    setInit({
      ...init,
      search:"",
      pages:1
    })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pathname]);

  useEffect(() => {
    if (init.search !== "") {
      setInit({
        ...init,
        pages: 1,
      })
    }
    return () => {
      setInit({
        pages: 1,
        limit: 10,
        search: ""
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init.search]);


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
            initialValues={{ search: '', }}
            onSubmit={(values, actions) => {
              console.log(values);
              setInit({ ...init, search: values.search, pages: 1 });
              actions.resetForm();
            }}
          >
            {() => (
              <Form className="form_search">
                <Field type="text" name="search" placeholder="Bạn muốn tìm gì?" />
                <button type="submit">Search</button>
              </Form>
            )}
          </Formik>

          {/* Route children */}
          <Routes>
            <Route
              index
              element={<MovieDashBoard
                init={init}
                setInit={(data) => setInit(data)}
                totalPages={totalPages}
                setTotalPages={(num) => setTotalPages(num)}

              />}

            />
            <Route
              path="users"
              element={<UserDashBoard
                init={init}
                setInit={(data) => setInit(data)}
                totalPages={totalPages}
                setTotalPages={(num) => setTotalPages(num)}
              />}

            />
          </Routes>

          {/* pagination movie */}
          <div className="dashboard_pagination">
            <button type="button"
              onClick={() => init.pages <= 1 ? setInit({ ...init, pages: 1 }) : setInit({ ...init, pages: init.pages - 1 })}
              disabled={init.pages === 1 ? true : false}
            >
              <i className="fa-solid fa-arrow-left-long"></i>
            </button>
            <span className="dashboard_page">{init.pages}</span>
            <button type="button"
              onClick={() => init.pages >= totalPages ? setInit({ ...init, pages: totalPages }) : setInit({ ...init, pages: init.pages + 1 })}
              disabled={init.pages === totalPages ? true : false}
            >
              <i className="fa-solid fa-arrow-right-long"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard