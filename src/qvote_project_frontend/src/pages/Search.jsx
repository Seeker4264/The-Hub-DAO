
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
                    console.log(bQuery[i]);
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

        fetcher();
    }, [query]);
    
    const renderDAOs = () => {
        let liste = searchList;


        return liste.map((querky, index) => {
            return (
                <div key={index} className="border-t-custom-darkgreen-highlighted
                border-b-custom-darkgreen-highlighted
                px-0 py-4">
                    <h2 className='mb-5'>{querky.name}</h2>
                    <p>{querky.manifesto}</p>
                </div>
            );
        });
        
    };

    

    return (
        <>
            {/*<div className="flex justify-center items-center">*/}
                <div className="bg-custom-darkgreen
                min-w-[70%] max-w-fit
                min-h-96
                ml-auto mr-auto my-12
                rounded-3xl">
                    <div className="bg-custom-green
                    rounded-t-3xl
                    px-[3%] py-[1%]
                    text-custom-lightgreen text-xl
                    font-normal">
                        Results for the search "{query}"
                    </div>
                    <div className="text-custom-green-highlighted
                    text-base
                    p-5">{renderDAOs()}</div>
                </div>
            {/*</div>*/}
        </>
    )
};

export default Search;