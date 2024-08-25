
import { Outlet } from "react-router-dom";
import { useState, createContext } from 'react';

import  NavBar  from '../components/NavBar.jsx';


export const userContext = createContext(null);

export default function Root() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <>
            <userContext.Provider value={{ currentUser: currentUser, setCurrentUser: setCurrentUser }}>
                <NavBar/>
                <Outlet/>
            </userContext.Provider>
        </>
    );
}