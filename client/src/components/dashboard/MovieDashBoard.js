import React, { useEffect, useRef, useState } from 'react'
import { Field, Form, Formik, FieldArray, getIn } from 'formik';
import MyTextArea from '../form/custumform/textarea/MyTextArea';
import ItemDashBoard from './ItemDashBoard';
import *as Yup from 'yup';
import filmApi from '../../apis/filmApi';
import { useDispatch, connect } from 'react-redux';
import { AddFilm, DeleteFilm, UpdateFilm } from '../../actions/Actions';
// import { LocalStorage_TokenName } from '../../constants/actionsType';
import classnames from 'classname';



function MovieDashBoard(props) {
    const { filmsInfo, init, setTotalPages, } = props;
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
        episode: [{
            episodeName: "",
            episodeUrl: "",
        }],
    };

    function equalTo(msg) {
        let message = msg || null;
        return this.test({
            name: 'equalTo',
            exclusive: false,
            params: {},
            message: message,
            test: function (value) {
                // console.log('value this:', this);
                return value
            }
        })
    };

    Yup.addMethod(Yup.string, 'equalTo', equalTo);

    const filmSchema = Yup.object().shape({
        filmName: Yup.string().trim()
            .required('Bạn cần nhập tên phim'),
        category: Yup.string().trim(),
        url: Yup.string().trim()
            .when(
                'category',
                (category) => {
                    if (category !== 'phimbo') {
                        return Yup.string().required('Bạn cần nhập Link phim')
                    }
                }
            ),
        country: Yup.string().trim(),
        poster: Yup.string().trim(),
        year: Yup.number(),
        actorName: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
        description: Yup.string(),
        episode: Yup.array().of(
            Yup.object().shape({
                episodeName: Yup.string(),                    
                episodeUrl: Yup.string(),
                // .when(
                //     '$category',
                //     (category) => {
                //         if (category === 'phimbo') {
                //             console.log('category2:', category)
                //             return Yup.string().required('Bạn cần nhập Link phim !!!!')
                //         }
                //     }
                // ),
            })
        )

    });

    const ErrorMessage = (name) => (
        <Field
            name={name}
        >{
                ({ form }) => {

                    const error = getIn(form.errors, name.name);
                    const touch = getIn(form.touched, name.name);
                    return touch && error ? error : null;
                }
            }
        </Field>
    );

    useEffect(() => {
        const { id, type } = movieId;
        const getFilms = async () => {
            try {
                const films = await filmApi.getFilms({ ...init });
                // console.log('films:', films)
                // console.log('lengthFilms:',films.listFilm.length)
                if (films.listFilm && films.listFilm.length > 0) {
                    setTotalPages(films.totalPages)
                    setFilms(films.listFilm)
                }else{
                    setFilms()
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
            dispatch(DeleteFilm(id));
            setInitForm(null)
            setMovieId({ ...movieId, id: "", type: "" });
        }
        getFilms();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, movieId, isLoading, init.pages, init.search]);

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

    const handleShowForm = (value) => {
        const classForm = formGrid.current.classList;
        if (value) {
            classForm.remove('d-none');
            classForm.add('d-grid');
        } else {
            classForm.remove('d-grid');
            classForm.add('d-none');
            setInitForm(null)
            setMovieId({ ...movieId, type: "" })
        }
    };



    return (
        <>
            {/* Add movie */}
            <div className="btn_addFilm" onClick={() => { handleShowForm(true) }}>
                Thêm phim
            </div>
            <Formik
                initialValues={initForm || initialValuesFormIk}
                enableReinitialize={true}
                validationSchema={filmSchema}
                onSubmit={(values, actions) => {
                    // console.log(values);
                    if (movieId.type === "update") {
                        values.updateAt = Date.now();
                        dispatch(UpdateFilm(values))
                        setMovieId({ ...movieId, id: "", movieId: "" });
                    } else {
                        // console.log(values)
                        dispatch(AddFilm(values));
                    }
                    handleShowForm(false)
                    setInitForm(null)
                    actions.resetForm();
                }}
            >
                {(propsFormik) =>
                (
                    <Form className={classnames(movieId.type === "update" ? "d-grid" : "", "form_create d-none")} ref={formGrid}>
                        <div className="item_wrapper">
                            <Field className="form_item" name="filmName" placeholder="Tên phim..." />
                            {propsFormik.errors.filmName && propsFormik.touched.filmName ? (<div style={{ color: "red" }}>{propsFormik.errors.filmName}</div>) : null}
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
                            {propsFormik.values.category === "phimbo" ? (
                                <FieldArray
                                    name="episode"
                                    render={arrayHeplers => (
                                        <>
                                            {(propsFormik.values.episode && propsFormik.values.episode.length > 0) ? (
                                                <>
                                                    {propsFormik.values.episode.map((item, index) => (
                                                        <div key={index} className="episode mb-10">
                                                            <Field type="text" key={"episodeName" + index} className="form_item" name={`episode[${index}].episodeName`} placeholder="Tên tập phim..." />
                                                            <ErrorMessage name={`episode[${index}].episodeName`} />

                                                            <Field type="text" key={"episodeUrl" + index} className="form_item mt-10" name={`episode[${index}].episodeUrl`} placeholder="Link tập phim..." />
                                                            <ErrorMessage name={`episode[${index}].episodeUrl`} />
                                                            <button type="button" className="delete_item mb-10" onClick={() => arrayHeplers.remove(index)}>Xóa {item.episodeName}</button>
                                                        </div>
                                                    ))}
                                                    <button type="button" className="add_item mb-10" onClick={() => arrayHeplers.push({ episodeUrl: "", episodeName: "" })}>Thêm tập mới</button>
                                                </>) : (
                                                <button type="button" className="add_item mb-10" onClick={() => arrayHeplers.push({ episodeUrl: "", episodeName: "" })}>Thêm tập mới</button>

                                            )}
                                        </>
                                    )
                                    }

                                />
                            ) : (
                                <>
                                    <Field className="form_item" name="url" placeholder="Link phim..." />
                                    {propsFormik.errors.url && propsFormik.touched.url ? (<div style={{ color: "red" }}>{propsFormik.errors.url}</div>) : null}
                                </>
                            )}
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
                            <button type="button" onClick={() => handleShowForm(false)}>Hủy</button>
                        </div>
                    </Form>
                )
                }

            </Formik>

            {/* list item movie */}
            <h1 className="title_list"> Danh sách phim</h1>
            {films && films.length>0 ?(
                <ul className="main_list">
                {films && showMovieItem(films)}
            </ul>
            ):(<h2>Không tím thấy phim</h2>)}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        filmsInfo: state.film
    }
}
export default connect(mapStateToProps, null)(MovieDashBoard)