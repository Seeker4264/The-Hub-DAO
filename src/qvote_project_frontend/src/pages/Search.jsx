
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { qvote_project_backend } from 'declarations/qvote_project_backend';


function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchList, setSearchList] = useState([]);

    const query = searchParams.get("q");


    useEffect(() => {
        async function fetcher() {
            let searchCriteria = [];
            
            await qvote_project_backend.getSearchDaos().then((bQuery) => {
                for(let i in bQuery) {
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

        setSearchList([]);
        fetcher();
        console.log(searchList.length);
    }, [query]);
    
    const renderDAOs = () => {
        let liste = searchList;


        return liste.map((querky, index) => {
            return (
                <div key={index} className="border-t-2 border-b-2
                border-custom-darkgreen-highlighted
                px-0 py-4">
                    <h2 className='text-3xl mb-2
                    text-custom-lightgreen'>{querky.name}</h2>
                    <p className='text-base
                    text-custom-lightgreen'>{querky.manifesto}</p>
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
                    bg-custom-darkgreen-highlighted'></div>
                    <div className='rounded-full
                    w-[22rem]
                    p-2
                    bg-custom-darkgreen-highlighted'></div>
                </div>
                <div className="border-t-2 border-b-2
                border-custom-darkgreen-highlighted
                px-0 py-4">
                    <div className='rounded-full
                    w-[13rem]
                    p-5 mb-3
                    bg-custom-darkgreen-highlighted'></div>
                    <div className='rounded-full
                    w-[32rem]
                    p-2
                    bg-custom-darkgreen-highlighted'></div>
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

    

    return (
        <>
            {/*<div className="flex justify-center items-center">*/}
                <div className="bg-custom-darkgreen
                min-w-[90%] lg:min-w-[70%] w-fit max-w-[90%]
                min-h-96
                mx-auto my-8 lg:my-12
                rounded-3xl">
                    <div className="bg-custom-green
                    rounded-t-3xl
                    px-5 py-3
                    text-custom-lightgreen text-xl
                    font-normal">
                        Results for "{query}"
                    </div>
                    <div className="text-custom-green-highlighted
                    text-base
                    p-5">
                        {searchList.length === 0 ?
                        renderLoading() :
                        renderDAOs()}
                    </div>
                </div>
            {/*</div>*/}
        </>
    )
};

export default Search;