
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Communities() {
    const [tag, setTag] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (txt) => {
        navigate(`/search?q=${txt.target.textContent}`);
    }

    return (
        <>
            {/*<div className="flex justify-center items-center">*/}
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
                        Search by tags
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-5
                    p-5
                    text-custom-lightgreen text-base">
                        <div className="max-w-40">
                            <h3 className="pb-2
                            text-xl
                            font-semibold
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>Entertainment</h3>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Movies
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Literature
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Music
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Art
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Videogame
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Manga
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Anime
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Sports
                            </p>
                        </div>
                        <div className="max-w-40">
                            <h3 className="pb-2
                            text-xl
                            font-semibold
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>Technology</h3>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Web Development
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Programming
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                AI
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Devops
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Software
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                VR
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Hardware
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Electronics
                            </p>
                        </div>
                        <div className="max-w-40">
                            <h3 className="pb-2
                            text-xl
                            font-semibold
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>Culture</h3>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                News
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Politics
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Famous
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Influencers
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Viral
                            </p>
                        </div>
                        <div className="max-w-40">
                            <h3 className="pb-2
                            text-xl
                            font-semibold
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>Bussiness</h3>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Investment
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Trading
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Money
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Jobs
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Work
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Real Estate
                            </p>
                        </div>
                        <div className="max-w-40">
                            <h3 className="pb-2
                            text-xl
                            font-semibold
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>Discussions</h3>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Frequent Questions
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Questions And Answers
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Stories
                            </p>
                            <p className="text-base
                            font-extralight
                            hover:text-white
                            hover:cursor-pointer" onClick={handleSubmit}>
                                Trending
                            </p>
                        </div>
                    </div>
                </div>
            {/*</div>*/}
        </>
    )
};

export default Communities;