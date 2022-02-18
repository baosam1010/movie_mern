import React from 'react'
import { Formik } from 'formik';
import { Link } from 'react-router-dom';


function LoginForm() {

    return (
        <div className="login">
            <h2 className="login_title">Login</h2>
            <Formik
                initialValues={{ name: '', password: '' }}
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

export default LoginForm