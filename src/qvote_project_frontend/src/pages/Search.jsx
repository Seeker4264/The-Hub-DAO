import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { qvote_project_backend } from 'declarations/qvote_project_backend';
import styles from './Search.module.css';


function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchList, setSearchList] = useState([]);

    const query = searchParams.get("q");


    useEffect(() => {
        async function fetcher() {
            let searchCriteria = [];
            
            await qvote_project_backend.getSearchDaos().then((bQuery) => {
                for(let i in bQuery) {
                    console.log(bQuery[i]);
                    if(bQuery[i].name.includes(query) ||
                        bQuery[i].manifesto.includes(query) ||
                        bQuery[i].name.toLowerCase().includes(query) ||
                        bQuery[i].manifesto.toLowerCase().includes(query) ||
                        bQuery[i].name.toUpperCase().includes(query) ||
                        bQuery[i].manifesto.toUpperCase().includes(query)) {
                        searchCriteria.push(bQuery[i]);
                    };
                };
            });
            

    
            setSearchList(searchCriteria);
        };

        fetcher();
    }, [query]);
    
    const renderDAOs = () => {
        let liste = searchList;


        return liste.map((querky, index) => {
            return (
                <div key={index} className={styles.forum}>
                    <h2>{querky.name}</h2>
                    <p>{querky.manifesto}</p>
                </div>
            );
        });
        
    };

    

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <div className={styles.containerHeader}>
                    Results for the search "{query}"
                </div>
                <div className={styles.containerContent}>{renderDAOs()}</div>
            </div>
        </div>
    )
};

export default Search;