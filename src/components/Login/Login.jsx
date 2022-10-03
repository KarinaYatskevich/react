import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import s from './Login.module.css';
import {connect} from "react-redux";
import {Navigate} from 'react-router-dom';
import {login} from "../../redux/auth-reduse";


const validateLoginForm = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Введите email';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    return errors;
};

const validationSchemaLoginForm = Yup.object().shape({

    password: Yup.string()
        .min(2, "Must be longer than 2 characters")
        .max(10, "Must be shorter than 10 characters")
        .required("Введите пароль")
});

const Login = (props) => {

    if (props.isAuth) return <Navigate to='/profile'/>

    return (
        <div className={s.login}>
            <div className={s._container}>
                <h1>Log in</h1>
                <Formik
                    initialValues={{email: '', password: '', rememberMe: false, messages: null}}
                    validate={validateLoginForm}
                    validationSchema={validationSchemaLoginForm}

                    onSubmit={(values) => {
                        props.login(values.email, values.password, values.rememberMe);
                    }}
                >
                    {() => (
                        <Form>
                            <div>
                                <Field type='email' name='email' placeholder='e-mail'/>
                                <ErrorMessage className={s.errors} name='email' component='p'/>
                            </div>
                            <div>
                                <Field className={s.pass} type='password' name='password' placeholder='password'/>
                                <ErrorMessage className={s.errors} name='password' component='p'/>
                            </div>
                            <div>
                                <Field type='checkbox' name='rememberMe'/>
                                <label htmlFor='rememberMe'>remember me</label>
                            </div>
                            <button className={s.log_button} type='submit'>Log in</button>
                            <p>{props.messageError}</p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};


let mapStateToProps = (state) => {
    return {
        messageError: state.auth.messageError,
        isAuth: state.auth.isAuth
    }
}


export default connect(mapStateToProps, {login})(Login);