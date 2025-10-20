import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { registerUserThunk } from '../../store/authSlice';
import { registerValidateSchema } from '../../validation/user.validate';
import styles from './authForm.module.scss';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const onSubmit = (values) => {
        dispatch(registerUserThunk(values)).unwrap().then(() => {
            navigate('/login');
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <Formik initialValues={{ name: '', email: '', birthYear: 2000, password: '' }} onSubmit={onSubmit} validationSchema={registerValidateSchema}>
            {() => (
                <Form className={styles.form}>
                    <h2>Sign up</h2>
                    {error && error.includes('409') && <p>Email already exists</p>}
                    <label>
                        <Field name="name" type="text" placeholder="name" />
                        <ErrorMessage name="name" component="div" className={styles.error} />
                    </label>
                    <label>
                        <Field name="email" type="email" placeholder="email" />
                        <ErrorMessage name="email" component="div" className={styles.error} />
                    </label>
                    <label>
                        <Field name="birthYear" type="number" placeholder="number" />
                        <ErrorMessage name="birthYear" component="div" className={styles.error} />
                    </label>
                    <label>
                        <Field name="password" type="password" placeholder="password" />
                        <ErrorMessage name="password" component="div" className={styles.error} />
                    </label>
                    <button type='submit'>Register</button>
                </Form>
            )}
        </Formik>
    );
}

export default RegisterForm;