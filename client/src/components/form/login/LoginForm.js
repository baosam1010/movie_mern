import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, connect } from 'react-redux';
import { Login } from '../../../actions/Actions';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, 'Bạn cần nhập ít nhất 6 kí tự!')
        .max(50, 'Tên người dùng quá dài!')
        .required('Bạn cần nhập tên người dùng'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

function LoginForm(props) {
    const { info } = props;
    const { message, userAuthenticated } = info;
    const [formLogin, setFormLogin] = useState({
        username: "",
        password: "",
    });

    let navigated = useNavigate();
    let dispatch = useDispatch();


    useEffect(() => {
        const getLogin = async () => {
            try {

                if (formLogin.username !== "" && formLogin.password !== "") {
                    dispatch(Login(formLogin))
                }

            } catch (error) {
                    throw error
            }
        }
        getLogin();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formLogin]);
    useEffect(() => {
        if (userAuthenticated) {
            navigated('/info/tenfilm-id', { replace: true })
        }
    }, [navigated, userAuthenticated])

    return (
        <div className="login">
            <h2 className="login_title">Đăng nhập</h2>
            <Formik
                initialValues={formLogin}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                    setFormLogin({ ...formLogin, ...values })
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit} className="login_form">
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.username}
                            name="username"
                            className="login_input"
                            placeholder="Nhập tên người dùng..."
                        />
                        {message ? (<div>{message}</div>) : (props.errors.username && <div className="error">{props.errors.username}</div>)}
                        <input
                            type="password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                            name="password"
                            className="login_input"
                            placeholder="Nhập mật khẩu của bạn"
                        />
                        {message ? (<div>{message}</div>) : (props.errors.password && <div className="error">{props.errors.password}</div>)}
                        <div className="login_wrapper">
                            <button type="submit" className="login_btn btn_login">Đăng Nhập</button>
                            <Link to="/" className="login_btn btn_cancel">Hủy</Link>
                        </div>
                        <h4 className="login_desc">Nếu bạn chưa có tài khoản. Hãy đăng ký <Link to="/register" className="">Tại đây</Link></h4>
                    </form>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        info: state.user
    }
}
export default connect(mapStateToProps, null)(LoginForm)