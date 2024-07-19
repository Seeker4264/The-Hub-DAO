import React from 'react';
import styles from './Communities.module.css';


function Communities() {
    return (
        <div className={styles.container}>
            <div className={styles.communityContainer}>
                <div className={styles.containerHeader}>
                    Search by tags
                </div>
                <div className={styles.containerContent}>
                    Wawa
                </div>
            </div>
        </div>
    )
};

export default Communities;