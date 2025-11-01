import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminStatsThunk } from '../../store/adminSlice';
import styles from './Admin.module.scss';

const AdminStatistic = () => {
    const dispatch = useDispatch();
    const { stats, error } = useSelector((state) => state.admin);
    useEffect(() => {
        if (stats?.length === 0) {
            dispatch(getAdminStatsThunk());
        }
    }, [dispatch, stats?.length]);
    return (
        <section className={styles['admin-table']}>
            <h2>Statistics</h2>
            <table className={styles['table-stats']}>
                <thead>
                    <tr>
                        <th>users</th>
                        <th>orders</th>
                        <th>products</th>
                    </tr>
                </thead>
                <tbody>
                    {error && <tr><td>{error}</td></tr>}
                    <tr>
                        <td>{stats.users}</td>
                        <td>{stats.orders}</td>
                        <td>{stats.products}</td> 
                    </tr>
                </tbody>
            </table>
        </section>
    );
};

export default AdminStatistic;