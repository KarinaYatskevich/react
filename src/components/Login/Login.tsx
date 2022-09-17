import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import {login} from "./../../redux/auth-reduse"
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import s from './Login.module.css'


const validateLoginForm = (values:any) => {
    const errors:any = {};
    if (!values.email) {
        errors.email = 'Required 1';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( values.email )
    ) {
        errors.email = 'Invalid email address';
    }
    return errors;
};

const validationSchemaLoginForm = Yup.object().shape( {

    password: Yup.string()
        .min( 2, "Must be longer than 2 characters" )
        .required( "Required 2" )
} );

const Login = (props:any) => {

    if (props.isAuth){
        return <Navigate to="/profile"/>
        
    }
    return (
        <div>
            <h2>Login</h2>
            <LoginForm/>
        </div>
    )
}

const LoginForm = (props:any) => {

    
let onSubmit = (values:any, onSubmitProps:any) => {
    props.login(values.email, values.password, values.rememberMe, onSubmitProps.setStatus, onSubmitProps.setSubmitting);
    onSubmitProps.setSubmitting(true);
  };

    return(
        <div className={s.loginWraper}>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    rememberMe: false
                }}
                validateOnBlur
                onSubmit={onSubmit}
                validationSchema={validationSchemaLoginForm}
            >
            {({ errors, touched, isValid, dirty, status }) => (
                <Form>
                <div> {status}
                <div>
                    <Field name={'email'} type={'text'} placeholder={'e-mail'} />
                </div>
                <ErrorMessage name="email" component="div" />
                                {touched.email && errors.email && (
                                <div className={s.error}>{errors.email}</div>)}
                <div>
                    <Field name={'password'} type={'password'} placeholder={'password'} />
                </div>
                <ErrorMessage name="password" component="div" />

                <div>
                    <Field type={'checkbox'} name={'rememberMe'} id='rememberMe' />
                    <label htmlFor={'rememberMe'}> remember me </label>
                </div>

                <button type={'submit'}>Login</button>
                </div>
            </Form>
            )}
        </Formik>
        </div>
            )}

const mapStateToProps = (state:any) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login);