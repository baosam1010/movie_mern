/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams, 
  useSearchParams
} from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import filmApi from '../../apis/filmApi';




function ListPage() {
  const [films, setFilms] = useState();
  const [totalPages, setTotalPages] = useState();
  const params = useParams();
  const navigated = useNavigate();
  let [searchParams,] = useSearchParams();

  const [init, setInit] = useState(
    {
      arrangement: 'createdAt',
      category: '',
      search: '',
      pages: 1,
      limit: 12,
    }
  )
  let { slug } = params;

  const title = {
    phimle: "Phim lẻ",
    phimbo: "Phim bộ",
    phimhanhdong: "Phim hành động",
    phimvientuong: "Phim viễn tưởng",
    phimtinhcam: "Phim tình cảm",

  };

  useEffect(() => {
    if (slug && title.hasOwnProperty(slug)) {
      if (slug !== init.category) {
        setInit({ ...init, category: slug, search: "", pages: 1 })

      } else {
        setInit({ ...init, category: slug, search: "" })
      }
    }
    else if (searchParams) {
      let search = searchParams.get('search');
      let category = searchParams.get('category');
      let arrangement = searchParams.get('arrangement');
      setInit({ ...init, search, category, arrangement })
    };

    const getFilms = async () => {
      const resp = await filmApi.getFilms(init);
      // console.log('resp', resp)
      if (resp) {
        setFilms(resp.listFilm)
        setTotalPages(resp.totalPages)
      }
    };

    getFilms();

    return () => {
      setFilms();
      setInit({
        arrangement: 'createdAt',
        category: '',
        search: '',
        pages: 1,
        limit: 12,
      })
    };
  }, [
    slug,
    init.arrangement,
    init.search,
    init.pages,
    init.category,
    searchParams.get('search'),
    searchParams.get('arrangement'),
    searchParams.get('category')
  ]);


  const showFilms = (films) => {
    let html = null;
    if (films) {
      html = films.map(item => {
        const { poster, filmName, _id: id } = item
        return (
          <li key={poster} className="listfilm_item ">
            <span>HD-VietSub</span>
            <Link to={`/info/${id}`}  >
              <img src={poster} alt="" />
              <p>{filmName}</p>
            </Link>
          </li>
        )
      })
    }
    return html;
  };


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
              {title[slug] || searchParams.get('search')}
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
              const { arrangement, category } = values
              setFilms();
              if (category !== "" || arrangement !== "") {
                let keyWord = searchParams.get('search');
                if (keyWord) {
                  navigated(`/list?search=${keyWord}
                    &arrangement=${arrangement}
                    &category=${category}`)
                } else {
                  navigated(`/list?search=&arrangement=${arrangement}&category=${category}`)
                }
              }
            }}
          >
            {() => (
              <Form className="form">
                {(!title.hasOwnProperty(slug)) && (
                  <Field className="form_select form_item" as="select" name="category">
                    <option>Chọn thể loại</option>
                    <option value="phimbo">{title.phimbo}</option>
                    <option value="phimle">{title.phimle}</option>
                    <option value="phimhanhdong">{title.phimhanhdong}</option>
                    <option value="phimtinhcam">{title.phimtinhcam}</option>
                    <option value="phimvientuong">{title.phimvientuong}</option>
                  </Field>
                )}
                <Field className="form_select form_item" as="select" name="arrangement">
                  <option value="createdAt">Thời gian cập nhật</option>
                  {/* <option value="view">Lượt xem</option> */}
                  <option value="year">Năm sản xuất</option>
                </Field>
                <button type="submit" className="form_submit form_item">Tìm kiếm</button>
              </Form>
            )}
          </Formik>
        </div>

        {/* item substance  */}
        {(films && films.length === 0) && <h2 className="color-white mt-10">Không tìm thấy phim !!!</h2>}
        <ul className="listfilm_list">
          {films && showFilms(films)}
        </ul>

        {/* pagination */}
        <div className="pagination">
          <div className="pagination_wrapper">
            <button type="button "
              onClick={() => init.pages <= 1 ? setInit({ ...init, pages: 1 }) : setInit({ ...init, pages: init.pages - 1 })}
              disabled={init.pages === 1 ? true : false}
            >
              <i className="fa-solid fa-arrow-left-long"></i>
            </button>
            <span className="page">{init.pages}</span>
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
};

export default ListPage;