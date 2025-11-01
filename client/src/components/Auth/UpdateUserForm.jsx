import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserValidateSchema } from '../../validation/user.validate';
import { updateUserThunk } from '../../store/authSlice';
import styles from './authForm.module.scss';

const UpdateUserForm = (props) => {
    const { setIsUpdate } = props;
    const { user, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const onSubmit = (values) => {
        const data = {};
        if (values.name) {
            data.name = values.name;
        }
        if (values.email) {
            data.email = values.email;
        }
        if (values.password) {
            data.password = values.password;
        }
        dispatch(updateUserThunk({ id: user._id, values: data }));
        setIsUpdate(false);
    };
    return (
        <Formik initialValues={{name: user?.name || '', email: user?.email || '', password: ''}} validationSchema={updateUserValidateSchema} onSubmit={onSubmit}>
            {() => {
                return <Form className={styles.form}>
                    <h2>Update personal info</h2>
                    {error && error.includes('409') && <p>Email already exists</p>}
                    <label>
                        <Field name="name" type="text" placeholder="Name" />
                        <ErrorMessage name="name" />
                    </label>
                    <label>
                        <Field name="email" type="email" placeholder="Email" />
                        <ErrorMessage name="email" />
                    </label>
                    <label>
                        <Field name="password" type="password" placeholder="Password" />
                        <ErrorMessage name="password" />
                    </label>
                    <button type='submit'>Update</button>
                </Form>
            }}
        </Formik>
    );
};

export default UpdateUserForm;