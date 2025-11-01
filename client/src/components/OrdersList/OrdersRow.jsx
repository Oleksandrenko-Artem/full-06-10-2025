import React from 'react';

const OrdersRow = (props) => {
    const { order, setIdOrder } = props;
    const { _id, createdAt, totalSum, status } = order;
    const handleViewDetails = () => {
        setIdOrder(_id);
    };
    return (
        <tr>
            <td>{_id}</td>
            <td>{createdAt.slice(0, 10)}</td>
            <td>${totalSum}</td>
            <td>{status}</td>
            <td><button onClick={handleViewDetails}>view details</button></td>
        </tr>
    );
};

export default OrdersRow;