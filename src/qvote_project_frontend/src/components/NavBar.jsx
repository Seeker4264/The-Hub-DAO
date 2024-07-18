import React from 'react'
import styles from './NavBar.module.css'

function NavBar() {


    return (
        <div className={styles.topnav}>
            <div className={styles.logo}>Logo</div>
            <div className={styles.left}>Home</div>
            <div className={styles.left}>Popular</div>
            <div className={styles.left}>Communities</div>
            <div className={styles.searchbar}><input type="text" placeholder='Search Hub' /></div>
            <div className={styles.right}>Register</div>
        </div>
    )
}

export default NavBar