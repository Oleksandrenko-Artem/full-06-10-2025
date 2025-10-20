import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../store/authSlice';
import { loginValidateSchema } from '../../validation/user.validate';

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
                <Form>
                    <h2>Sign in</h2>
                    {error && <p>Invalid data</p>}
                    <label>
                        <Field name="email" type="email" placeholder="email" />
                        <ErrorMessage name="email" />
                    </label>
                    <label>
                        <Field name="password" type="password" placeholder="password" />
                        <ErrorMessage name="password" />
                    </label>
                    <button type='submit'>Login</button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;