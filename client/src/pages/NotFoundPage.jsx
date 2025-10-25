import React from 'react';
import styles from './pages.module.scss';

const NotFoundPage = () => {
    return (
        <div className={styles['page-padding']}>
            <h2>Error 404: Not Found Page</h2>
        </div>
    );
};

export default NotFoundPage;