import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Register } from '../../../actions/Actions';


const registerSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, 'Bạn cần nhập ít nhất 6 kí tự!')
        .max(50, 'Tên người dùng quá dài!')
        .required('Bạn cần nhập tên người dùng!'),
    password: Yup.string()
        .min(6, 'Mật khấu quá ngắn')
        .max(50, 'Mật khẩu quá dài!')
        .required('Bạn cần nhập mật khẩu'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu không chính xác")
        .required("Bạn cần nhập lại mật khẩu !")
});

function RegisterForm(props) {

    const dispatch = useDispatch();
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const { username, password, confirmPassword } = registerForm;
    const navigated = useNavigate();

    const { info } = props;
    const { userAuthenticated, message} = info;
    useEffect(() => {
        if (userAuthenticated) {
            navigated('/info/tenfilm-id', { replace: true })
        };
    }, [navigated, userAuthenticated]);

    useEffect(() => {
        const getRegister = async () => {
            try {
                if (username !== "" && password !== "" && confirmPassword !== "") {
                    dispatch(Register(registerForm))
                }

            } catch (error) {
                throw error
            }
        };
        getRegister();

        return () => {
        }

    }, [confirmPassword, dispatch, password, registerForm, username])


    return (
        <div className="login">
                <h2 className="login_title">Đăng ký</h2>
                <Formik
                    initialValues={registerForm}
                    validationSchema={registerSchema}
                    onSubmit={(values, actions) => {
                        setRegisterForm(values)
                        console.log(values);

                    }}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit} className="login_form">
                        <h2>{message}</h2>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.username}
                                name="username"
                                className="login_input"
                                placeholder="Nhập tên người dùng..."
                            />
                            {props.errors.username && <div className="error">{props.errors.username}</div>}
                            <input
                                type="password"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.password}
                                name="password"
                                className="login_input"
                                placeholder="Nhập mật khẩu của bạn"
                            />
                            {props.errors.password && <div className="error">{props.errors.password}</div>}
                            <input
                                type="password"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.confirmPassword}
                                name="confirmPassword"
                                className="login_input"
                                placeholder="Nhập lại mật khẩu của bạn"
                            />
                            {props.errors.confirmPassword && <div className="error">{props.errors.confirmPassword}</div>}

                            <div className="login_wrapper">
                                <button type="submit" className="login_btn btn_login">Đăng Ký</button>
                                <Link to="/" className="login_btn btn_cancel">Hủy</Link>
                            </div>
                            <h4 className="login_desc">Bạn đã có tài khoản. Hãy đăng nhập <Link to="/login" className="">Tại đây</Link></h4>
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
export default connect(mapStateToProps, null)(RegisterForm)