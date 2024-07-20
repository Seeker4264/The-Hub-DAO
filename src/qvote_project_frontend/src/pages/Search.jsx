import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Search.module.css';


function Search() {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("q");

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <div className={styles.containerHeader}>
                    Results for the search "{query}"
                </div>
                <div className={styles.containerContent}>
                    
                </div>
            </div>
        </div>
    )
};

export default Search;