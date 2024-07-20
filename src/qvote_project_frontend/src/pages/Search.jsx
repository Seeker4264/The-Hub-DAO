import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { qvote_project_backend } from 'declarations/qvote_project_backend';
import styles from './Search.module.css';


function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [greeting, setGreeting] = useState('');

    const query = searchParams.get("q");

    function handleSubmit() {
        const name = query;
        qvote_project_backend.greet(name).then((greeting) => {
            setGreeting(greeting);
        });
        return false;
    };

    handleSubmit();

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <div className={styles.containerHeader}>
                    Results for the search "{query}"
                </div>
                <div className={styles.containerContent}>
                    {greeting}
                </div>
            </div>
        </div>
    )
};

export default Search;