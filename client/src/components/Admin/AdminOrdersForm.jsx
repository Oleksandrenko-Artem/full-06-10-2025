import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { updateOrderStatusThunk } from '../../store/ordersSlice';
import CONSTANTS from '../../constants';

const AdminOrdersForm = (props) => {
    const { order } = props;
    const dispatch = useDispatch();
    const showStatus = (status) => (<option key={status} value={status}>{status}</option>);
    const onSubmit = (value) => {
        dispatch(updateOrderStatusThunk({ id: order._id, status: value.status }));
    };
    return (
        <Formik initialValues={{ status: order?.status }} onSubmit={onSubmit}>
            <Form>
                <Field as="select" name="status">
                    {
                        CONSTANTS.ORDER_STATUS.map(showStatus)
                    }
                </Field>
                <button type='submit'>Save</button>
            </Form>
        </Formik>
    );
};

export default AdminOrdersForm;