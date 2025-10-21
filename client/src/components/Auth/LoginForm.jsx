import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../store/authSlice';
import { loginValidateSchema } from '../../validation/user.validate';
import styles from './authForm.module.scss';

const LoginForm = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const onSubmit = (values) => {
        dispatch(loginUserThunk(values)).unwrap().then(() => {
            navigate('/');
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit} validationSchema={loginValidateSchema}>
            {() => (
                <Form className={styles.form}>
                    <h2>Sign in</h2>
                    {error && error.includes('401') && <p>Invalid data</p>}
                    <label>
                        <Field name="email" type="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" className={styles.error} />
                    </label>
                    <label>
                        <Field name="password" type="password" placeholder="Password" />
                        <ErrorMessage name="password" component="div" className={styles.error} />
                    </label>
                    <button type='submit'>Login</button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;