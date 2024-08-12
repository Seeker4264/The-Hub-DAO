import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Communities.module.css';


function Communities() {
    const [tag, setTag] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (txt) => {
        navigate(`/search?q=${txt.target.textContent}`);
    }

    return (
        <div className={styles.container}>
            <div className={styles.communityContainer}>
                <div className={styles.containerHeader}>
                    Search by tags
                </div>
                <div className={styles.containerContent}>
                    <div>
                        <h3 onClick={handleSubmit}>Entertainment</h3>
                        <p onClick={handleSubmit}>
                            Movies
                        </p>
                        <p onClick={handleSubmit}>
                            Literature
                        </p>
                        <p onClick={handleSubmit}>
                            Music
                        </p>
                        <p onClick={handleSubmit}>
                            Art
                        </p>
                        <p onClick={handleSubmit}>
                            Videogame
                        </p>
                        <p onClick={handleSubmit}>
                            Manga
                        </p>
                        <p onClick={handleSubmit}>
                            Anime
                        </p>
                        <p onClick={handleSubmit}>
                            Sports
                        </p>
                    </div>
                    <div>
                        <h3 onClick={handleSubmit}>Technology</h3>
                        <p onClick={handleSubmit}>
                            Web Development
                        </p>
                        <p onClick={handleSubmit}>
                            Programming
                        </p>
                        <p onClick={handleSubmit}>
                            AI
                        </p>
                        <p onClick={handleSubmit}>
                            Devops
                        </p>
                        <p onClick={handleSubmit}>
                            Software
                        </p>
                        <p onClick={handleSubmit}>
                            VR
                        </p>
                        <p onClick={handleSubmit}>
                            Hardware
                        </p>
                        <p onClick={handleSubmit}>
                            Electronics
                        </p>
                    </div>
                    <div>
                        <h3 onClick={handleSubmit}>Culture</h3>
                        <p onClick={handleSubmit}>
                            News
                        </p>
                        <p onClick={handleSubmit}>
                            Politics
                        </p>
                        <p onClick={handleSubmit}>
                            Famous
                        </p>
                        <p onClick={handleSubmit}>
                            Influencers
                        </p>
                        <p onClick={handleSubmit}>
                            Viral
                        </p>
                    </div>
                    <div>
                        <h3 onClick={handleSubmit}>Bussiness</h3>
                        <p onClick={handleSubmit}>
                            Investment
                        </p>
                        <p onClick={handleSubmit}>
                            Trading
                        </p>
                        <p onClick={handleSubmit}>
                            Money
                        </p>
                        <p onClick={handleSubmit}>
                            Jobs
                        </p>
                        <p onClick={handleSubmit}>
                            Work
                        </p>
                        <p onClick={handleSubmit}>
                            Real Estate
                        </p>
                    </div>
                    <div>
                        <h3 onClick={handleSubmit}>Discussions</h3>
                        <p onClick={handleSubmit}>
                            Frequent Questions
                        </p>
                        <p onClick={handleSubmit}>
                            Questions And Answers
                        </p>
                        <p onClick={handleSubmit}>
                            Stories
                        </p>
                        <p onClick={handleSubmit}>
                            Trending
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Communities;