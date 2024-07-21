import React from 'react';
import styles from './Home.module.css';

import Sidebar from '../components/Sidebar.jsx';


function Home() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.popularContainer}>
                <div className={styles.containerHeader}>
                    Communities
                </div>
                <div className={styles.containerContent}>
                                        
                </div>
            </div>
        </div>
    )
};

export default Home;