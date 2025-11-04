import React from 'react';
import CONSTANTS from '../../constants';
import styles from './filter.module.scss';

const FilterOrder = (props) => {
    const { setStatus, setMethod, setUser, status, method, user } = props;
    const showStatus = (status) => <option key={status} value={status}>{status}</option>;
    const showMethod = (method) => <option key={method} value={method}>{method}</option>;
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };
    const handleChangeMethod = (event) => {
        setMethod(event.target.value);
    };
    const handleChangeUser = (event) => {
        setUser(event.target.value);
    };
    return (
        <div className={styles['filter-form']}>
            <div>
                <span>User</span>
                <input type="text" value={user} onChange={handleChangeUser} />
            </div>
            <div>
                <span>Status</span>
                <select value={status} onChange={handleChangeStatus}>
                    <option></option>
                    {
                        CONSTANTS.ORDER_STATUS.map(showStatus)
                    }
                </select>
            </div>
            <div>
                <span>Method</span>
                <select value={method} onChange={handleChangeMethod}>
                    <option></option>
                    {
                        CONSTANTS.SHIPPING_METHOD.map(showMethod)
                    }
                </select>
            </div>
        </div>
    );
};

export default FilterOrder;