import React, { useEffect, useRef, useState } from 'react'
import userApi from '../../apis/userApi';
import ItemDashBoard from './ItemDashBoard'
import { connect, useDispatch } from 'react-redux';
import { LocalStorage_TokenName } from '../../constants/actionsType';
import *as Yup from 'yup';
import { DeleteUser, UpdatedUser } from '../../actions/Actions';
import { Field, Form, Formik } from 'formik';


function UserDashBoard(props) {
    const { init, setTotalPages, } = props;
    const dispatch = useDispatch();
    const refFormUser = useRef();
    console.log('initUser:', init)
    const [userArr, setUserArr] = useState();
    const [userId, setUserId] = useState({
        type: "",
        id: ""
    });

    const [initForm, setInitForm] = useState(null);
    const initvalue = {
        username: "",
        role: 0,
    };

    const userSchema = Yup.object().shape({
        username: Yup.string()
            .min(6, 'Tên người dùng quá ngắn!')
            .max(50, 'Tên người dùng quá dài!')
            .required('Bạn cần nhập tên của bạn!'),
        role: Yup.number().integer(),

    });


    useEffect(() => {
        const { type } = userId;
        const getUsers = async () => {
            try {
                console.log('initEffect', init)
                if (localStorage[LocalStorage_TokenName] && init) {
                    const resp = await userApi.getAll({
                        ...init,
                        token: localStorage[LocalStorage_TokenName]
                    });
                    setUserArr(resp.users);
                    setTotalPages(resp.totalPages)
                }

            } catch (error) {
                console.log(error)
            }
        };

        const getOne = async (id) => {
            try {
                const resp = await userApi.getOne(id);
                const { user } = resp;
                setInitForm({ ...initForm, ...user })
            } catch (error) {
                throw error;
            }
        };

        if (type === "delete") {
            const { id } = userId;
            dispatch(DeleteUser(id))
            getUsers();
        };

        if (type === "update") {
            const { id } = userId;
            getOne(id)
        }
        getUsers();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userId, init.pages, init.search]);

    const handleChange = (data) => {
        setUserId({ ...userId, ...data })
    };

    const showUser = (users) => {
        let html = null;
        if (users) {
            html = users.map(item => {
                const { _id: id, username } = item
                return (<ItemDashBoard
                    key={id}
                    id={id}
                    name={username}
                    handleChange={handleChange}
                    typeItem="user"
                />)
            })
            return html
        }
    };
    const handleCancel = () => {
        refFormUser.current.classList.toggle('d-none');
        setUserId({
            type: "",
            id: ""
        })
    };
    return (
        <>
            {userId.type === "update" ? (
                <div className="dashboard_user" ref={refFormUser}>
                    <h1 className="">Cập nhật thông tin người dùng</h1>
                    <Formik
                        initialValues={initForm || initvalue}
                        enableReinitialize={true}
                        validationSchema={userSchema}
                        onSubmit={(values, actions) => {
                            dispatch(UpdatedUser(values))
                            setInitForm(null)
                            setUserId({
                                type: "",
                                id: ""
                            })
                            actions.resetForm();
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="dashboard_user_form">
                                <div className="field_wrapper">
                                    <Field className="" name="username" placeholder="Nhập tên của bạn!" />
                                    {errors.username || touched.username ? (<div className="field_message">{errors.username}</div>) : null}
                                </div>
                                <div className="field_wrapper">
                                    <Field className="" as="select" name="role">
                                        <option value="0">0 - Người dùng cấp 0</option>
                                        <option value="1">1 - Người dùng cấp 1</option>
                                        <option value="2">2 - Người dùng cấp 2</option>
                                        <option value="3">3 - Người dùng cấp 3</option>
                                        <option value="4">4 - Người dùng cấp 4</option>
                                        <option value="5">5 - Người dùng cấp 5</option>
                                    </Field>
                                    {errors.role || touched.role ? (<div className="field_message">{errors.role}</div>) : null}
                                </div>
                                <div className="btn_group">
                                    <button type="submit"  >Cập nhật</button>
                                    <button type="button" onClick={() => handleCancel()}>Hủy</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            ) : null}

            <h1 className="title_list"> Danh sách người dùng</h1>
                <h3>{ userArr?.length > 0 ? null: 'Không tìm thấy người dùng!'}</h3>
            <ul className="main_list">
                {userArr && showUser(userArr)}
            </ul>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        info: state.user,
    }
}
export default connect(mapStateToProps, null)(UserDashBoard)