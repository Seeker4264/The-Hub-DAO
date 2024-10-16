
import { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { qvote_project_backend } from 'declarations/qvote_project_backend';
import { Transition } from '@headlessui/react';
import { userContext } from '../layout/Root';

import logo from '../assets/logo.svg';


function NavBar() {
    const [sideOpen, setSideOpen] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { authenticationClient } = useContext(userContext); // AuthClient Context

    // Search Bar
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(search) {
            navigate(`/search?q=${search.toLowerCase()}`);
        }
    };

    /*useEffect(() => {
        console.log(sideOpen);
    }, [sideOpen]);*/

    const handleClick = async () => {
        setSideOpen((v) => !v);
    };


    return (
        <header>
            <div className="bg-custom-green
            overflow-hidden
            select-none">
                <Link to='/'>
                    <div className="flex justify-center items-center
                    float-left
                    border-b-custom-green
                    mx-0 mt-2 lg:mt-1
                    p-0">
                        <img className="w-20 lg:w-16 m-0 p-0" src={logo} alt="TheHubDao" />
                    </div>
                </Link>
                <NavLink to='/' className={({ isActive, isPending, isTransitioning }) =>
                    [
                        isPending ? "pending" : "",
                        isActive ? "[&>div]:text-custom-whitegreen" : "",
                        isTransitioning ? "transitioning" : "",
                    ].join(" ") + "hidden lg:block"
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
                    ].join(" ") + "hidden lg:block"
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
                px-1 lg:px-3 py-3">

                    <form className="flex flex-nowrap items-center" onSubmit={handleSubmit}>

                        <input className="border-none
                        rounded-l-full
                        outline-none
                        w-[8rem] sm:w-[12rem] md:w-[24rem] lg:w-[32rem]
                        bg-custom-green-searchbar
                        text-custom-lightgreen-highlighted
                        px-3 py-3 lg:py-1 m-0
                        placeholder:text-custom-lightgreen
                        placeholder:opacity-100" type="text" placeholder='Search Hub' onChange={(e) => {
                            setSearch(e.target.value);
                        }} />

                        <button className="flex justify-center items-center
                        border-none
                        rounded-r-full
                        max-w-fit
                        h-12 lg:h-8
                        cursor-pointer
                        outline-none
                        bg-custom-green-searchbar
                        m-0
                        px-3 py-2
                        hover:bg-custom-green-searchbar-highlighted">
                            <svg className="h-6 w-6 text-white"
                            width="24" height="24" viewBox="0 0 24 24"
                            strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <circle cx="10" cy="10" r="7" />
                                <line x1="21" y1="21" x2="15" y2="15" />
                            </svg>
                        </button>

                    </form>

                </div>
                
                {/*
                {!authenticationClient.isAuthenticated &&
                <div className="hidden lg:block
                    cursor-pointer
                    text-custom-lightgreen
                    text-center no-underline
                    font-semibold
                    px-5 py-4
                    float-right
                    hover:bg-custom-green-highlighted
                    hover:text-custom-lightgreen-highlighted"
                    onClick={authenticationClient.handleLogin}>Sign In</div>}
                
                {authenticationClient.isAuthenticated &&
                <div className="hidden lg:block
                    cursor-pointer
                    text-custom-lightgreen
                    text-center no-underline
                    font-semibold
                    px-5 py-4
                    float-right
                    hover:bg-custom-green-highlighted
                    hover:text-custom-lightgreen-highlighted"
                    onClick={authenticationClient.handleLogout}>Logout</div>}
                */}



                {/* Mobile Navbar */}

                <button className="block lg:hidden
                    cursor-pointer
                    text-custom-lightgreen
                    text-center no-underline
                    font-semibold
                    px-[0.60rem] py-5
                    float-right
                    hover:bg-custom-green-highlighted
                    hover:text-custom-lightgreen-highlighted"
                    onClick={handleClick}>
                    <svg className="h-8 w-8 text-white"
                    width="24" height="24" viewBox="0 0 24 24"
                    strokeWidth="2" stroke="currentColor" fill="none"
                    strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </button>

                <div className="absolute lg:hidden">
                    <Transition show={sideOpen}>
                    <div className={`${sideOpen ? 'block' : 'hidden'} fixed
                        top-0 right-0 z-[50]
                        w-full h-full
                        bg-black
                        opacity-80
                        duration-300
                        data-[closed]:opacity-0`} />
                    </Transition>

                    <div className={`${sideOpen ? 'right-0' : '-right-2/3'} block
                        fixed top-0 z-[60]
                        w-2/3 md:w-1/3 h-full
                        ease-in-out duration-300
                        bg-custom-green`}>
                        <ul className="inline-block
                        w-full">
                            <Link to={"/"}>
                                <li className="flex
                                border-b-2 border-custom-green-searchbar
                                px-8 py-4 justify-end select-none
                                hover:bg-custom-green-searchbar active:bg-custom-green-searchbar-highlighted"
                                onClick={() => {setSideOpen(false);window.scrollTo(0, 0)}}>
                                    <p className="flex justify-center items-center text-base font-semibold font-dm-sans text-custom-lightgreen">HOME</p>
                                    <svg className="h-8 w-8 ml-4 text-custom-lightgreen"
                                    width="24" height="24" viewBox="0 0 24 24"
                                    strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="5 12 3 12 12 3 21 12 19 12" />
                                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                    </svg>
                                </li>
                            </Link>

                            <Link to={"/communities"}>
                                <li className="flex
                                border-b-2 border-custom-green-searchbar
                                px-8 py-4 justify-end select-none
                                hover:bg-custom-green-searchbar active:bg-custom-green-searchbar-highlighted"
                                onClick={() => {setSideOpen(false);window.scrollTo(0, 0)}}>
                                    <p className="flex justify-center items-center text-base font-semibold font-dm-sans text-custom-lightgreen">COMMUNITIES</p>
                                    <svg className="h-8 w-8 ml-4 text-custom-lightgreen"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                </li>
                            </Link>

                            <li className="flex
                            border-b-2 border-custom-green-searchbar
                            px-8 py-4 justify-end select-none
                            hover:bg-custom-green-searchbar active:bg-custom-green-searchbar-highlighted"
                            onClick={() => {setSideOpen(false);window.scrollTo(0, 0)}}>
                                <p className="flex justify-center items-center text-base font-semibold font-dm-sans text-custom-lightgreen">BACK</p>
                                <svg className="h-8 w-8 ml-4 text-custom-lightgreen" width="24" height="24" viewBox="0 0 24 24"
                                strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
                                </svg>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* button to test auth functionality */}
                {/*<div className="hidden lg:block 
                    text-custom-lightgreen
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
                    }}>Test</div>*/}
            </div>
        </header>
    )
};

export default NavBar;