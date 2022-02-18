import { Formik } from 'formik';
import React from 'react'
import { Link } from 'react-router-dom';

function RegisterForm() {
    return (
        <div className="login">
            <h2 className="login_title">Register</h2>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    confirmPassword: '',

                }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit} className="login_form">
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.name}
                            name="name"
                            className="login_input"
                            placeholder="Nhập tên người dùng..."
                        />
                        {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                            name="password"
                            className="login_input"
                            placeholder="Nhập mật khẩu của bạn"
                        />
                        {props.errors.password && <div id="feedback">{props.errors.password}</div>}
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.confirmPassword}
                            name="confirmPassword"
                            className="login_input"
                            placeholder="Nhập lại mật khẩu của bạn"
                        />
                        {props.errors.confirmPassword && <div id="feedback">{props.errors.confirmPassword}</div>}

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

export default RegisterForm