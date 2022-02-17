import React from 'react';
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';


function Auth(props) {
    console.log("props:", props)
    const { authRoute } = props;
    let body;
    body = (
        <>
            {authRoute === "login" && <LoginForm />}
            {authRoute === "register" && <RegisterForm />}
        </>
    )
    return (
        <div className="auth">
            {body}
        </div>
    )
}

export default Auth