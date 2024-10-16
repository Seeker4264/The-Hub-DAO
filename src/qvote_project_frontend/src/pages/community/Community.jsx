
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { qvote_project_backend } from 'declarations/qvote_project_backend';
import { userContext } from '../../layout/Root';


function Community() {
    const { name } = useParams();
    const { authenticationClient } = useContext(userContext);
    const [canisterId, setCanisterId] = useState("");
    const [daoData, setDaoData] = useState({
        daoName: ""
    });

    const [followState, setFollowState] = useState(false);
    const [postState, setPostState] = useState(false);
    const [commentState, setCommentState] = useState(false);
    const [showCommentState, setShowCommentState] = useState(false);
    const [buttonState, setButtonState] = useState(false);

    const _ = {
        daoName: "Couldn't find the community",
        daoManifesto: "Try again later or seacrh another community",
    };

    useEffect(() => {
        async function fetcher() {
            const principal = await qvote_project_backend.getDaoPrincipal(name);
            setCanisterId(principal.ok);

            try {
                const daoName = await qvote_project_backend.getDaoName(principal.ok);
                const daoManifesto = await qvote_project_backend.getDaoManifesto(principal.ok);
                const daoGoals = await qvote_project_backend.getDaoGoals(principal.ok);
                const daoMembers = await qvote_project_backend.getAllDaoMembers(principal.ok);
                const daoPostsRaw = await qvote_project_backend.getAllDaoPosts(principal.ok);
                const daoPosts = daoPostsRaw.reverse();

                daoPosts.map((q) => {
                    const modComments = q.comments.reverse();
                    return { ...q, comments: modComments };
                });

                console.log(daoPosts)

                setDaoData({ daoName: daoName.toUpperCase(), daoManifesto, daoGoals, daoMembers, daoPosts });
            } catch (error) {
                console.log(error)
                setDaoData({
                    daoName: "Couldn't find the community",
                    daoManifesto: "Try again later or seacrh another community",
                });
            };
        };

        fetcher();
    }, []);

    const findUserPrincipal = () => {
        const userPrincipal = authenticationClient.principal.toText();
        for(let i = 0; i < daoData.daoMembers.length; i++) {
            if(daoData.daoMembers[i].principal.toText() === userPrincipal) {
                return true;
            } else {
                continue;
            };
        };
        return false;
    };

    const handleFollow = async (e) => {
        e.preventDefault();
        setButtonState(true);
        const user = document.getElementById('user').value;
        const age = Number(document.getElementById('age').value);

        if(user === null || age === null || user === "" || age < 18) {
            setButtonState(false);
            return;
        };

        try {
            await qvote_project_backend.addDaoMember(canisterId, user, age)
        } catch (error) {
            console.log(error);
            setButtonState(false);
            return;
        };

        window.location.reload();
    };

    const handlePost = async (e) => {
        e.preventDefault();
        setButtonState(true);
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        if(title === null || content === null || title === "" || content === "") {
            setButtonState(false);
            return;
        };
        
        const PostContent = {
            title,
            content
        };

        try {
            await qvote_project_backend.createDaoPost(canisterId, PostContent);
        } catch (error) {
            console.log(error);
            setButtonState(false);
            return;
        };

        window.location.reload();
    };

    const handleComment = async (e, id) => {
        e.preventDefault();
        setButtonState(true);
        const comment = document.getElementById('comment').value;

        if(comment === null || comment === "") {
            setButtonState(false);
            return;
        };

        try {
            await qvote_project_backend.commentDaoPost(canisterId, comment, id);
        } catch (error) {
            console.log(error);
            setButtonState(false);
            return;
        };

        window.location.reload();
    };

    const handleLike = async (e, id) => {
        e.preventDefault();
        setButtonState(true);

        try {
            await qvote_project_backend.likeDaoPost(canisterId, id);
        } catch (error) {
            console.log(error);
            setButtonState(false);
            return;
        };

        window.location.reload();
    };


    const renderComments = (commsArray) => {
        return commsArray.map((quarry, index) => {
            const date = new Date(Math.floor(Number(quarry.created)/1000000));
            const formDate = date.toISOString().slice(0, -5).replace("T", " - ");

            return (
                <div key={index} className="border-t-2 border-b-2
                border-custom-darkgreen-highlighted
                px-0 py-4 mx-2">
                    <div>
                        <p className='text-lg mb-3
                        text-custom-lightgreen'>{quarry.content}</p>
                    </div>

                    <div className='flex flex-row justify-between'>
                        <h3 className='text-sm text-slate-600'>{quarry.author.toText()}</h3>
                        <h3 className='text-sm text-slate-600'>{formDate}</h3>
                    </div>
                </div>
            );
        });
    };

    const renderPosts = () => {
        return daoData.daoPosts.map((querky, index) => {
            const date = new Date(Math.floor(Number(querky.created)/1000000));
            const formDate = date.toISOString().slice(0, -5).replace("T", " - ");

            return (
                <div key={index} className="border-t-2 border-b-2
                border-custom-darkgreen-highlighted
                px-0 py-4">
                    <div className='pb-3'>
                        <h2 className='text-3xl font-semibold mb-1
                        text-custom-lightgreen'>{querky.content.title}</h2>
                        <p className='text-lg mb-3
                        text-custom-lightgreen'>{querky.content.content}</p>

                        <div className='flex flex-row gap-3'>
                            {findUserPrincipal() ?
                            <button className='flex flex-row gap-2
                            rounded-full
                            p-2 mb-2
                            bg-custom-green-searchbar
                            hover:rounded-[1.25rem]
                            hover:bg-custom-green-searchbar-highlighted'
                            onClick={async (e) => await handleLike(e, querky.id)}
                            disabled={buttonState}>
                                <h3 className='px-1 font-bold text-custom-whitegreen'>{querky.likes.length}</h3>
                                <svg className="h-5 w-5 text-custom-whitegreen"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                </svg>
                            </button>
                            :
                            <div className='flex flex-row gap-2
                            rounded-full
                            p-2 mb-2
                            bg-custom-green-searchbar'>
                                <h3 className='px-1 font-bold text-custom-whitegreen'>{querky.likes.length}</h3>
                                <svg className="h-5 w-5 text-custom-whitegreen"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                </svg>
                            </div>}

                            {findUserPrincipal() ?
                            <button className='flex flex-row gap-2
                            rounded-full
                            p-2 mb-2
                            bg-custom-green-searchbar
                            hover:rounded-[1.25rem]
                            hover:bg-custom-green-searchbar-highlighted'
                            onClick={() => setCommentState(e => !e)}
                            disabled={buttonState}>
                                <h3 className='px-1 font-bold text-custom-whitegreen'>{querky.comments.length}</h3>
                                <svg className="h-5 w-5 text-custom-whitegreen"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                </svg>
                            </button>
                            :
                            <div className='flex flex-row gap-2
                            rounded-full
                            p-2 mb-2
                            bg-custom-green-searchbar'>
                                <h3 className='px-1 font-bold text-custom-whitegreen'>{querky.comments.length}</h3>
                                <svg className="h-5 w-5 text-custom-whitegreen"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                </svg>
                            </div>}

                            <button className='flex flex-row gap-2
                            rounded-full
                            p-2 mb-2
                            bg-custom-green-searchbar
                            hover:rounded-[1.25rem]
                            hover:bg-custom-green-searchbar-highlighted'
                            onClick={() => setShowCommentState(e => !e)}
                            disabled={buttonState}>
                                <h3 className='px-1 font-bold text-custom-whitegreen'>See comments</h3>
                            </button>
                        </div>

                        <div className='flex flex-row justify-between'>
                            <h3 className='text-sm text-slate-600'>{querky.author.toText()}</h3>
                            <h3 className='text-sm text-slate-600'>{formDate}</h3>
                        </div>
                    </div>
                    <div className={`${commentState ? "block" : "hidden"}
                    p-4
                    text-custom-whitegreen`}>
                        <form className="flex flex-col" onSubmit={async (e) => await handleComment(e, querky.id)}>

                            <label className="mb-3
                            text-xl font-semibold"
                            htmlFor="comment">Comment</label>
                            <textarea className="border-none
                            rounded-xl
                            outline-none
                            resize-none
                            w-[30%] overflow-y-auto px-2 py-1 mb-6
                            text-custom-lightgreen-highlighted
                            bg-custom-green-searchbar
                            placeholder:text-custom-lightgreen"
                            id="comment" placeholder="Comment" />

                            <button className="rounded-[1rem]
                            w-fit px-2 py-1
                            text-lg font-semibold
                            bg-custom-green-searchbar
                            hover:rounded-xl
                            hover:bg-custom-green-searchbar-highlighted"
                            disabled={buttonState}>
                                Comment on Post
                            </button>

                        </form>
                    </div>
                    <div className={`${showCommentState ? "block" : "hidden"}`}>
                        {renderComments(querky.comments)}
                    </div>
                </div>
            );
        });
    };

    const renderLoading = () => {
        return (
            <>
                <div className="border-t-2 border-b-2
                border-custom-darkgreen-highlighted
                px-0 py-4">
                    <div className='rounded-full
                    w-[9rem]
                    p-5 mb-3
                    bg-custom-darkgreen-highlighted' />
                    <div className='rounded-full
                    w-[22rem]
                    p-2
                    bg-custom-darkgreen-highlighted' />
                </div>
                <div className="border-t-2 border-b-2
                border-custom-darkgreen-highlighted
                px-0 py-4">
                    <div className='rounded-full
                    w-[13rem]
                    p-5 mb-3
                    bg-custom-darkgreen-highlighted' />
                    <div className='rounded-full
                    w-[32rem]
                    p-2
                    bg-custom-darkgreen-highlighted' />
                </div>
                <div className="border-t-2 border-b-2
                border-custom-darkgreen-highlighted
                px-0 py-4">
                    <div className='rounded-full
                    w-[10rem]
                    p-5 mb-3
                    bg-custom-darkgreen-highlighted'></div>
                    <div className='rounded-full
                    w-[25rem]
                    p-2
                    bg-custom-darkgreen-highlighted'></div>
                </div>
            </>
        );
    };

    if(postState) {
        const textarea = document.getElementById('content');

        textarea.addEventListener('input', () => {
            textarea.style.height = `${textarea.scrollHeight}px`;
        });
    };
    if(commentState) {
        const textarea = document.getElementById('comment');

        textarea.addEventListener('input', () => {
            textarea.style.height = `${textarea.scrollHeight}px`;
        });
    };


    
    return (
        <div className="bg-custom-darkgreen
        min-w-[90%] lg:min-w-[80%] max-w-[90%] lg:max-w-[90%] w-fit
        min-h-96
        mx-auto my-8 lg:my-12
        rounded-3xl">
            <div className="bg-custom-green
            rounded-t-3xl
            px-5 py-3
            text-custom-lightgreen text-xl
            font-normal">
                {daoData.daoName === "" ?
                <>
                    <div className='rounded-full
                    w-[10rem]
                    p-5 mt-1 mb-3
                    bg-custom-green-highlighted' />
                    <div className='rounded-full
                    w-[32rem]
                    p-3
                    bg-custom-green-highlighted' />
                </>
                :
                <>
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-semibold">
                            {daoData.daoName}
                        </h1>
                        <h2 className="text-2xl font-light mt-2">
                            {daoData.daoManifesto}
                        </h2>
                    </div>
                    <div className="flex items-center">
                        {findUserPrincipal() &&
                        <button className="flex items-center
                        rounded-full
                        p-3 mx-2
                        font-medium
                        text-custom-whitegreen
                        bg-custom-green-searchbar
                        hover:rounded-[1.25rem]
                        hover:bg-custom-green-searchbar-highlighted"
                        onClick={() => setPostState(e => !e)}>
                            <h3 className="mr-2">
                                Post
                            </h3>
                            <svg className="h-8 w-8 text-custom-whitegreen"
                            width="24" height="24" viewBox="0 0 24 24"
                            strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                            </svg>
                        </button>}

                        <button className="flex items-center
                        rounded-full
                        p-3 mx-2
                        font-medium
                        text-custom-whitegreen
                        bg-custom-green-searchbar
                        hover:rounded-[1.25rem]
                        hover:bg-custom-green-searchbar-highlighted">
                            <h3 className="mr-2">
                                Goals
                            </h3>
                            <svg className="h-8 w-8 text-custom-whitegreen"
                            width="24" height="24" viewBox="0 0 24 24"
                            strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="12" r="5" />
                                <circle cx="12" cy="12" r="9" />
                            </svg>
                        </button>

                        {findUserPrincipal() ?
                        <button className="rounded-full
                        p-3 mx-2
                        bg-custom-green-searchbar
                        hover:rounded-[1.25rem]
                        hover:bg-custom-green-searchbar-highlighted"
                        onClick={async () => {
                            setButtonState(true);
                            await qvote_project_backend.removeDaoMember(canisterId);
                            window.location.reload();
                        }}
                        disabled={buttonState}>
                            <svg className="h-8 w-8 text-custom-whitegreen"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <line x1="23" y1="11" x2="17" y2="11" />
                            </svg>
                        </button>
                        :
                        <button className="rounded-full
                        p-3 mx-2
                        bg-custom-green-searchbar
                        hover:rounded-[1.25rem]
                        hover:bg-custom-green-searchbar-highlighted"
                        onClick={() => setFollowState(e => !e)}
                        disabled={buttonState}>
                            <svg className="h-8 w-8 text-custom-whitegreen"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <line x1="20" y1="8" x2="20" y2="14" />
                                <line x1="23" y1="11" x2="17" y2="11" />
                            </svg>
                        </button>}
                    </div>
                </div>
                </>}
            </div>
            
            <div className={`${followState ? "block" : "hidden"}
            p-4
            text-custom-whitegreen`}>
                <form className="flex flex-col" onSubmit={handleFollow}>

                    <label className="mb-3
                    text-xl font-semibold"
                    htmlFor="user">Username</label>
                    <input className="border-none
                    rounded-xl
                    outline-none
                    w-[30%] px-2 py-1 mb-3
                    text-custom-lightgreen-highlighted
                    bg-custom-green-searchbar
                    placeholder:text-custom-lightgreen"
                    id="user" type="text" placeholder="Username" />

                    <label className="mb-3
                    text-xl font-semibold"
                    htmlFor="age">Age</label>
                    <input className="border-none
                    rounded-xl
                    outline-none
                    w-[30%] px-2 py-1 mb-3
                    text-custom-lightgreen-highlighted
                    bg-custom-green-searchbar
                    placeholder:text-custom-lightgreen"
                    id="age" type="text" placeholder="Age" />

                    <button className="rounded-[1rem]
                    w-fit px-2 py-1
                    text-lg font-semibold
                    bg-custom-green-searchbar
                    hover:rounded-xl
                    hover:bg-custom-green-searchbar-highlighted"
                    disabled={buttonState}>
                        Follow
                    </button>

                </form>
            </div>

            <div className={`${postState ? "block" : "hidden"}
            p-4
            text-custom-whitegreen`}>
                <form className="flex flex-col" onSubmit={handlePost}>

                    <label className="mb-3
                    text-xl font-semibold"
                    htmlFor="title">Title of the Post</label>
                    <input className="border-none
                    rounded-xl
                    outline-none
                    w-[30%] px-2 py-1 mb-3
                    text-custom-lightgreen-highlighted
                    bg-custom-green-searchbar
                    placeholder:text-custom-lightgreen"
                    id="title" type="text" placeholder="Title" />

                    <label className="mb-3
                    text-xl font-semibold"
                    htmlFor="content">Content</label>
                    <textarea className="border-none
                    rounded-xl
                    outline-none
                    resize-none
                    w-[30%] overflow-y-auto px-2 py-1 mb-6
                    text-custom-lightgreen-highlighted
                    bg-custom-green-searchbar
                    placeholder:text-custom-lightgreen"
                    id="content" placeholder="Content" />

                    <button className="rounded-[1rem]
                    w-fit px-2 py-1
                    text-lg font-semibold
                    bg-custom-green-searchbar
                    hover:rounded-xl
                    hover:bg-custom-green-searchbar-highlighted"
                    disabled={buttonState}>
                        Publish post
                    </button>

                </form>
            </div>

            <div className="flex flex-col
            p-5
            text-custom-lightgreen text-base">
                {daoData.daoName === "" ?
                renderLoading() :
                renderPosts()}
            </div>
        </div>
    )
}

export default Community