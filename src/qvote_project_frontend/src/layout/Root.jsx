
import { Outlet } from "react-router-dom";
import { useState, useEffect, createContext } from 'react';
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/qvote_project_backend/index";
import { AuthClient, LocalStorage } from "@dfinity/auth-client";

import  NavBar  from '../components/NavBar.jsx';


export const userContext = createContext(null);

export const useAuthClient = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [identity, setIdentity] = useState(null);
    const [principal, setPrincipal] = useState(null);
    const [mainActor, setMainActor] = useState(null);
    
    useEffect(() => {
        AuthClient.create({
            idleOptions: {
                idleTimeout: 1000 * 60 * 30,
                disableDefaultIdleCallback: true
            },
            identityProvider: "http://iosdy-auaaa-aaaaa-qabqa-cai.localhost:4943/",
            storage: new LocalStorage(),
            keyType: 'Ed25519',
        }).then(async (client) => {
            handleUpdate(client);
        });
    }, [])

    const handleUpdate = async (client) => {
        const isAuthenticatedTemp = await client.isAuthenticated();
        setIsAuthenticated(isAuthenticatedTemp);

        const identityTemp = client.getIdentity();
        setIdentity(identityTemp);

        const principalTemp = identityTemp.getPrincipal();
        setPrincipal(principalTemp);

        setCurrentUser(client);


        const identity = await client.getIdentity();
        const agent = new HttpAgent({ identity });

        const actor = Actor.createActor(idlFactory, {
            agent,
            canisterId: process.env.CANISTER_ID_QVOTE_PROJECT_BACKEND,
        });

        Actor.agentOf(actor).replaceIdentity(
            await client.getIdentity()
        );
        
        
        setMainActor(actor);
        
    }

    const handleLogin = () => {
        currentUser.login({
            maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days in nanoseconds
            onSuccess: async () => {
                handleUpdate(currentUser)
            },
            onError: async () => {
                console.log("error: cannot authenticate at this moment")
            },
            windowOpenerFeatures: `
            left=${window.screen.width / 2 - 525 / 2},
            top=${window.screen.height / 2 - 705 / 2},
            toolbar=0,location=0,menubar=0,width=525,height=705
            `,
        });
    };

    const handleLogout = async () => {
        await currentUser.logout();
        await handleUpdate(currentUser);
    };


    return {
        currentUser,
        isAuthenticated,
        identity,
        principal,
        mainActor,
        handleLogin,
        handleLogout,
    };
}

export default function Root() {
    const authenticationClient = useAuthClient();


    return (
        <>
            <userContext.Provider value={{ authenticationClient: authenticationClient }}>
                <NavBar/>
                <Outlet/>
            </userContext.Provider>
        </>
    );
}