
import { useState } from 'react';
import { qvote_project_backend } from 'declarations/qvote_project_backend';
import Sidebar from '../components/Sidebar.jsx';


function Home() {
    const [forumState, setForumState] = useState(false);
    const [buttonState, setButtonState] = useState(false);

    const handleForum = async (e) => {
        e.preventDefault();
        setButtonState(true);
        const name = document.getElementById('name').value;
        const manifiesto = document.getElementById('manifiesto').value;
        const token = document.getElementById('token').value;
        const symbol = document.getElementById('symbol').value;

        if(
            name === null || name === "" ||
            manifiesto === null || manifiesto === "" ||
            token === null || token === "" ||
            symbol === null || symbol === "" || symbol.length > 5 || symbol.length < 3
        ) {
            setButtonState(false);
            return;
        };

        try {
            await qvote_project_backend.createDao(name, manifiesto, token, symbol.toUpperCase());
        } catch (error) {
            console.log(error);
            setButtonState(false);
            return;
        };

        window.location.reload();
    };


    return (
        <>
            <div className="flex justify-center items-center">
                
                <div className="bg-custom-darkgreen
                min-w-[90%] lg:min-w-[70%] w-fit
                min-h-96
                mx-auto my-8 lg:my-12
                rounded-3xl">
                    <div className="bg-custom-green
                    rounded-t-3xl
                    px-5 py-3
                    text-2xl font-semibold
                    text-custom-lightgreen">
                        Discover your new meeting point with other users or create your own!
                    </div>
                    <div className="flex flex-col p-5">
                        <ul>
                            <li className='border-t-2 border-b-2
                            border-custom-darkgreen-highlighted
                            px-0 py-4'>
                                <button className='px-2
                                text-2xl font-medium
                                text-custom-whitegreen
                                hover:scale-105'
                                onClick={() => setForumState(e => !e)}>
                                    Create Forum
                                </button>
                                
                                {forumState && <form className="flex flex-col justify-center items-center mx-4 my-6" onSubmit={handleForum}>

                                    <ul className='flex flex-row justify-center gap-12 mb-5'>
                                        <li className='flex flex-col w-[60%]'>
                                            <label className="mb-3
                                            text-xl font-semibold
                                            text-custom-whitegreen"
                                            htmlFor="name">Name</label>
                                            <input className="border-none
                                            rounded-xl
                                            outline-none
                                            w-[100%] px-2 py-1 mb-3
                                            text-custom-lightgreen-highlighted
                                            bg-custom-green-searchbar
                                            placeholder:text-custom-lightgreen"
                                            id="name" type="text" placeholder="Name" />

                                            <label className="mb-3
                                            text-xl font-semibold
                                            text-custom-whitegreen"
                                            htmlFor="manifiesto">Manifiesto</label>
                                            <input className="border-none
                                            rounded-xl
                                            outline-none
                                            w-[100%] px-2 py-1 mb-3
                                            text-custom-lightgreen-highlighted
                                            bg-custom-green-searchbar
                                            placeholder:text-custom-lightgreen"
                                            id="manifiesto" type="text" placeholder="Manifiesto" />
                                        </li>

                                        <li className='flex flex-col w-[60%]'>
                                            <label className="mb-3
                                            text-xl font-semibold
                                            text-custom-whitegreen"
                                            htmlFor="token">Token Name</label>
                                            <input className="border-none
                                            rounded-xl
                                            outline-none
                                            w-[100%] px-2 py-1 mb-3
                                            text-custom-lightgreen-highlighted
                                            bg-custom-green-searchbar
                                            placeholder:text-custom-lightgreen"
                                            id="token" type="text" placeholder="Token" />

                                            <label className="mb-3
                                            text-xl font-semibold
                                            text-custom-whitegreen"
                                            htmlFor="symbol">Symbol of the Token</label>
                                            <input className="border-none
                                            rounded-xl
                                            outline-none
                                            w-[100%] px-2 py-1 mb-3
                                            text-custom-lightgreen-highlighted
                                            bg-custom-green-searchbar
                                            placeholder:text-custom-lightgreen"
                                            id="symbol" type="text" placeholder="TKN" />
                                        </li>
                                    </ul>

                                    <button className="rounded-[1rem]
                                    w-[60%] px-5 py-1
                                    text-lg font-semibold
                                    text-custom-whitegreen
                                    bg-custom-green-searchbar
                                    hover:rounded-xl
                                    hover:bg-custom-green-searchbar-highlighted"
                                    disabled={buttonState}>
                                        Create
                                    </button>

                                </form>}
                            </li>
                            {/*
                            <li className='border-t-2 border-b-2
                            border-custom-darkgreen-highlighted
                            px-0 py-4'>
                                <h2 className='text-2xl font-medium
                                text-custom-whitegreen'>
                                    Search Forum
                                </h2>
                            </li>
                            */}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;