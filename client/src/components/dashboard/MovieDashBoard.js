import React, { useEffect, useRef, useState } from 'react'
import { Field, Form, Formik } from 'formik';
import MyTextArea from '../form/custumform/textarea/MyTextArea';
import ItemDashBoard from './ItemDashBoard';
import *as Yup from 'yup';
import filmApi from '../../apis/filmApi';
import { useDispatch, connect } from 'react-redux';
import { AddFilm, DeleteFilm, UpdateFilm } from '../../actions/Actions';
import { LocalStorage_TokenName } from '../../constants/actionsType';
import classnames from 'classname';



function MovieDashBoard(props) {
    const { filmsInfo } = props;
    const { isLoading } = filmsInfo;
    const formGrid = useRef();
    const dispatch = useDispatch();
    const [films, setFilms] = useState();
    const [movieId, setMovieId] = useState({
        id: "",
        type: ""
    });
    const [initForm, setInitForm] = useState(null);
    const initialValuesFormIk = {
        filmName: '',
        category: 'phimle',
        url: '',
        country: '',
        poster: '',
        year: '',
        actorName: "",
        description: "",
    };
    const filmSchema = Yup.object().shape({
        filmName: Yup.string()
            .required('Bạn cần nhập tên phim'),
        category: Yup.string(),
        url: Yup.string().required('Bạn cần nhập Link phim'),
        country: Yup.string(),
        poster: Yup.string(),
        year: Yup.number(),
        actorName: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
        description: Yup.string(),
    });

    useEffect(() => {
        const { id, type } = movieId;
        const getFilms = async () => {
            try {
                const films = await filmApi.getAll(localStorage[LocalStorage_TokenName]);
                if (films.listFilm) {
                    setFilms(films.listFilm)
                }
            } catch (error) {
                throw error
            }
        };
        const getOneFilmUpdate = async (id) => {
            try {
                const filmData = await filmApi.getOne(id)
                if (filmData) {
                    const { film } = filmData;
                    setInitForm(film)
                }
            } catch (error) {
                throw error
            };
        };
        if (type === "update") {
            getOneFilmUpdate(id)
        }
        if (type === "delete") {
            dispatch(DeleteFilm(id))
            setMovieId({ ...movieId, id: "", type: "" })
        }
        getFilms();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, movieId, isLoading,]);

    const handleChange = (data) => {
        setMovieId({ ...movieId, ...data })
    };
    const showMovieItem = (films) => {
        let html = null;
        html = films.map(film => {
            const { url, filmName, poster, _id: id } = film
            return (<ItemDashBoard
                key={id}
                url={url}
                id={id}
                filmName={filmName}
                poster={poster}
                typeItem="movie"
                handleChange={handleChange}
            />)
        })
        return html
    };
    const handleShowForm =(value)=>{
        const classForm = formGrid.current.classList;
        if(value){
            classForm.remove('d-none');
            classForm.add('d-grid');
        }else{
            classForm.remove('d-grid');
            classForm.add('d-none');
            setInitForm(null)
            setMovieId({ ...movieId, type:""})
        }
    }
    return (
        <>
            {/* Add movie */}
            <div className="btn_addFilm" onClick={() =>{handleShowForm(true )}}>
                Thêm phim
            </div>
            <Formik
                initialValues={initForm || initialValuesFormIk}
                enableReinitialize={true}
                validationSchema={filmSchema}
                onSubmit={(values, actions) => {
                    console.log(values);
                    if (movieId.type === "update") {
                        values.updateAt = Date.now();
                        dispatch(UpdateFilm(values))
                        setMovieId({ ...movieId, id: "", movieId: "" });
                    } else {
                        dispatch(AddFilm(values));
                    }
                    handleShowForm(false)
                    setInitForm(null)
                    actions.resetForm();
                }}
            >
                {(propsFormik) => (
                    <Form className={classnames(movieId.type === "update"? "d-grid":"", "form_create d-none")} ref={formGrid}>
                        <div className="item_wrapper">
                            <Field className="form_item" name="filmName" placeholder="Tên phim..." />
                            {propsFormik.errors.filmName && propsFormik.touched.filmName ? (<div>{propsFormik.errors.filmName}</div>) : null}
                        </div>
                        <div className="item_wrapper">
                            <Field className="form_item" as="select" name="category">
                                <option value="phimle">Phim Lẻ</option>
                                <option value="phimbo">Phim Bộ</option>
                                <option value="phimhanhdong">Phim Hành Động</option>
                                <option value="phimtinhcam">Phim Tình Cảm</option>
                                <option value="phimvientuong">Phim Viễn Tưởng</option>
                            </Field>
                            {propsFormik.errors.category && propsFormik.touched.category ? (<div>{propsFormik.errors.category}</div>) : null}
                        </div>
                        <div className="item_wrapper">
                            <Field className="form_item" name="url" placeholder="Link phim..." />
                            {propsFormik.errors.url && propsFormik.touched.url ? (<div>{propsFormik.errors.url}</div>) : null}
                        </div>
                        <div className="item_wrapper">
                            <Field className="form_item" name="poster" placeholder="Link hình ảnh..." />
                            {propsFormik.errors.poster && propsFormik.touched.poster ? (<div>{propsFormik.errors.poster}</div>) : null}
                        </div>
                        <div className="item_wrapper">
                            <Field className="form_item" name="country" placeholder="Tên quốc gia..." />
                            {propsFormik.errors.country && propsFormik.touched.country ? (<div>{propsFormik.errors.country}</div>) : null}
                        </div>
                        <div className="item_wrapper">
                            <Field className="form_item" name="actorName" placeholder="Tên diễn viên..." />
                            {propsFormik.errors.actorName && propsFormik.touched.actorName ? (<div>{propsFormik.errors.actorName}</div>) : null}
                        </div>
                        <div className="item_wrapper">
                            <Field className="form_item" name="year" placeholder="Năm phát hành..." />
                            {propsFormik.errors.year && propsFormik.touched.year ? (<div>{propsFormik.errors.year}</div>) : null}
                        </div>

                        <div className="form_textarea">
                            <MyTextArea {...propsFormik} name="description" className="" placeholder="Nội dung phim..." />
                            {propsFormik.errors.description && propsFormik.touched.description ? (<div>{propsFormik.errors.description}</div>) : null}
                        </div>

                        <div className="form_create_btn">
                            <button type="submit">{movieId.type === "update" ? "Cập Nhật" : "Thêm Phim"}</button>
                            <button type="button" onClick={() =>handleShowForm(false)}>Hủy</button>
                        </div>
                    </Form>
                )
                }
            </Formik>

            {/* list item movie */}
            <h1 className="title_list"> Danh sách phim</h1>
            <ul className="main_list">
                {films && showMovieItem(films)}
            </ul>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        filmsInfo: state.film
    }
}
export default connect(mapStateToProps, null)(MovieDashBoard)