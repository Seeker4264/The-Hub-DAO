import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {

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
            <div className={styles.searchbar}><input type="text" placeholder='Search Hub' /></div>
            <div className={styles.right}>Register</div>
        </div>
    )
}

export default NavBar