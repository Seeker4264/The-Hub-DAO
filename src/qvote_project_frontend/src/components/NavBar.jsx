import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';

import searchImg from '../assets/search.svg';


function NavBar() {
    const [search, setSearch] = useState('');

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        if(search) {
            console.log(search);
            navigate(`/search?q=${search}`);
        }
    };

    return (
        <div className={styles.topnav}>
            <div className={styles.logo}>Logo</div>
            <NavLink to='/' className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? styles.active : "",
                    isTransitioning ? "transitioning" : "",
                ].join(" ")
            }>
                <div className={styles.left}>Home</div>
            </NavLink>

            <NavLink to='/communities' className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? styles.active : "",
                    isTransitioning ? "transitioning" : "",
                ].join(" ")
            }>
                <div className={styles.left}>Communities</div>
            </NavLink>
            <div className={styles.searchbar}>
                <form className={styles.searching} onSubmit={handleSubmit}>
                    <input type="text" placeholder='Search Hub' onChange={(e) => {
                        setSearch(e.target.value);
                    }} />
                    <button><img src={searchImg} alt="Search" /></button>
                </form>
            </div>
            <div className={styles.right}>Register</div>
        </div>
    )
};

export default NavBar;