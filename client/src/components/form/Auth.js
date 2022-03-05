import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';
import { useNavigate } from 'react-router-dom';


function Auth(props) {

    const { authRoute, info } = props;
    const {userAuthenticated} = info;
    const navigated = useNavigate();

    useEffect(() => {
        if(userAuthenticated){
            navigated('/',{ replace: true })
        }
      return () => {
      }
    }, [navigated, userAuthenticated]);

    let body;

        body = (
            <>
                {authRoute === "login" && <LoginForm />}
                {authRoute === "register" && <RegisterForm />}
            </>
        )   
    
    return (
        <div className="auth">
            <div className="container auth_wrapper">
                {body}
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        info: state.user,
    }
}
export default connect(mapStateToProps, null)(Auth)