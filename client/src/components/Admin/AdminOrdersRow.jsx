import React from 'react';
import AdminOrdersForm from './AdminOrdersForm';
import styles from './Admin.module.scss';

const AdminOrdersRow = (props) => {
    const { order } = props;
    const { user, products, shippingPhone, shippingMethod, shippingAddress, shippingPrice, totalSum, status } = order;
    const showProduct = (product) => <tr key={product?.productId._id}>
        <td className={styles['product-title']}>{product?.productId?.title}</td>
        <td className={styles['product-price']}>{product?.productPrice}</td>
        <td>{product?.quantity}</td>
    </tr>
    return (
        <tr>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td>{shippingPhone}</td>
            <td>{shippingMethod}</td>
            <td>{shippingAddress}</td>
            <td>{shippingPrice}</td>
            <td>
                <table className={styles['product-info']}>
                    <tbody>
                        {products?.map(showProduct)}
                    </tbody>
                </table>
            </td>
            <td>{totalSum}</td>
            <td>{status}</td>
            <td>
                <AdminOrdersForm order={order} />
            </td>
        </tr>
    );
};

export default AdminOrdersRow;