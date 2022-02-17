import { Formik } from 'formik';
import React from 'react'

function RegisterForm() {
  return (
    <div className="login">
            <h2>Register Form</h2>
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
                {props => console.log("Formik Props",props)
                    
                    /* <form onSubmit={props.handleSubmit}>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.username}
                            name="username"
                            className=""
                            placeholder="Nhập tên người dùng..."
                        />
                        {props.errors.username && <div id="feedback">{props.errors.username}</div>}
                        
                        <button type="submit">Submit</button>
                    </form> */
                
                }
            </Formik>
        </div>
  )
}

export default RegisterForm