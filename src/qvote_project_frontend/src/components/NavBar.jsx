
import { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { qvote_project_backend } from 'declarations/qvote_project_backend';
import { userContext } from '../layout/Root';

import logo from '../assets/The_Hub_DAO_Presentation.png';
import searchImg from '../assets/search.svg';


function NavBar() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { authenticationClient } = useContext(userContext); // AuthClient Context

    // Search Bar
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(search) {
            navigate(`/search?q=${search}`);
        }
    };


    return (
        <div className="bg-custom-green
        overflow-hidden
        select-none">
            <Link to='/'>
                <div className="flex justify-center items-center
                float-left
                border-b-custom-green
                m-0
                p-0"><img className="w-16
                m-0
                p-0" src={logo} alt="" /></div>
            </Link>
            <NavLink to='/' className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? "[&>div]:text-custom-whitegreen" : "",
                    isTransitioning ? "transitioning" : "",
                ].join(" ")
            }>
                <div className="text-custom-lightgreen
                text-center no-underline
                font-semibold
                px-5 py-4
                float-left
                hover:bg-custom-green-highlighted
                hover:text-custom-lightgreen-highlighted">Home</div>
            </NavLink>

            <NavLink to='/communities' className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? "[&>div]:text-custom-whitegreen" : "",
                    isTransitioning ? "transitioning" : "",
                ].join(" ")
            }>
                <div className="text-custom-lightgreen
                text-center no-underline
                font-semibold
                px-5 py-4
                float-left
                hover:bg-custom-green-highlighted
                hover:text-custom-lightgreen-highlighted">Communities</div>
            </NavLink>
            <div className="float-left
            px-5 py-3">

                <form className="flex flex-nowrap items-center
                gap-0" onSubmit={handleSubmit}>

                    <input className="border-none
                    rounded-l-full
                    outline-none
                    w-[32rem]
                    min-w-64 max-w-[32rem]
                    bg-custom-green-searchbar
                    text-custom-lightgreen-highlighted
                    px-3 py-1
                    placeholder:text-custom-lightgreen
                    placeholder:opacity-100" type="text" placeholder='Search Hub' onChange={(e) => {
                        setSearch(e.target.value);
                    }} />

                    <button className="flex justify-center items-center
                    border-none
                    rounded-r-full
                    max-w-fit
                    h-8
                    cursor-pointer
                    outline-none
                    bg-custom-green-searchbar
                    m-0
                    px-3 py-2
                    hover:bg-custom-green-searchbar-highlighted">
                        <img className="w-6
                        m-0
                        p-0
                        filter invert" src={searchImg} alt="Search" />
                    </button>

                </form>

            </div>
            
            {!authenticationClient.isAuthenticated &&
            <div className="text-custom-lightgreen
                text-center no-underline
                font-semibold
                px-5 py-4
                float-right
                hover:bg-custom-green-highlighted
                hover:text-custom-lightgreen-highlighted"
                onClick={authenticationClient.handleLogin}>Sign In</div>}
            
            {authenticationClient.isAuthenticated &&
            <div className="text-custom-lightgreen
                text-center no-underline
                font-semibold
                px-5 py-4
                float-right
                hover:bg-custom-green-highlighted
                hover:text-custom-lightgreen-highlighted"
                onClick={authenticationClient.handleLogout}>Logout</div>}

            {/* button to test auth functionality */}
            <div className="text-custom-lightgreen
                text-center no-underline
                font-semibold
                px-5 py-4
                float-right
                hover:bg-custom-green-highlighted
                hover:text-custom-lightgreen-highlighted"
                onClick={async () => {
                    console.log(authenticationClient.currentUser)
                    console.log(typeof authenticationClient.currentUser)
                    console.log(authenticationClient.identity)
                    console.log(typeof authenticationClient.identity)
                    console.log(authenticationClient.principal.toText())
                    console.log(typeof authenticationClient.principal.toText())
                    console.log(authenticationClient.isAuthenticated)
                }}>Test</div>
        </div>
    )
};

export default NavBar;