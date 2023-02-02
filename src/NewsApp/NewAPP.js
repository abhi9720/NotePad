import React from 'react'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import './newsapp.css'
import Footer from "./components/Footer/Footer";
import NavInshorts from "./components/NavInshorts";
import NewsContent from "./components/NewsContent/NewsContent";
// import apikey from "./data/config";
import { Breadcrumbs, Chip, CircularProgress, IconButton, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SearchIcon from '@mui/icons-material/Search';
const NewAPP = () => {
    const apicode = process.env.REACT_APP_API_CODE;
    const [category, setCategory] = useState("Politics");
    const [newsArray, setnewsArray] = useState(() =>
        localStorage.getItem("News") ? JSON.parse(localStorage.getItem("News")) : []
    );

    // const [newsResults, setnewsResults] = useState();
    // const [loadmore, setloadmore] = useState(20);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null)



    const [searchTerm, setSearchTerm] = useState('');


    const [showMessage, setShowMessage] = useState(false);
    const displaymsg = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const options = {
            method: 'GET',
            url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
            params: {
                q: searchTerm,
                pageNumber: '1',
                pageSize: '50',
                autoCorrect: 'true',
                fromPublishedDate: 'null',
                toPublishedDate: 'null'
            },
            headers: {
                'X-RapidAPI-Key': apicode,
                'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
        };

        setloading(true);
        await axios.request(options)
            .then(news => {
                setnewsArray(news.data.value);
                localStorage.setItem("News", JSON.stringify(news.data.value))
                setError(null)
            })
            .catch(error => {
                console.log(error);
                setError(error.code)
                setnewsArray(() =>
                    localStorage.getItem("News") ? JSON.parse(localStorage.getItem("News")) : [])
            })
            .finally(() => {
                setloading(false);
            })
    };


    const newsApi = async () => {
        const options = {
            method: 'GET',
            url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
            params: {
                q: category,
                pageNumber: '1',
                pageSize: '50',
                autoCorrect: 'true',
                fromPublishedDate: 'null',
                toPublishedDate: 'null'
            },
            headers: {
                'X-RapidAPI-Key': apicode,
                'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
        };


        setloading(true);
        await axios.request(options)
            .then(news => {
                setnewsArray(news.data.value);
                setError(null);
                localStorage.setItem("News", JSON.stringify(news.data.value));
            })
            .catch(error => {
                console.log(error);
                setError(error.code);
                setnewsArray(() =>
                    localStorage.getItem("News") ? JSON.parse(localStorage.getItem("News")) : [])
            })
            .finally(() => {
                setloading(false);
            })


    };

    // console.log(newsArray);

    useEffect(() => {
        newsApi();
        // eslint-disable-next-line
    }, [category]);


    const handleShare = async (title, text, link) => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: title,
                    text: text,
                    url: link,
                });
                console.log('Link was shared successfully');
            } else {
                console.log('The Web Share API is not supported by this browser.');
            }
        } catch (error) {
            console.log('Error occurred while sharing the link', error);
        }
    };


    return (
        <>
            <div className="App">
                <NavInshorts setCategory={setCategory} />
                <div className="newsAppWrapper">
                    <div className="breadcum">
                        <Breadcrumbs aria-label="breadcrumb">
                            <NavLink
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                to="/"
                            >

                                <Chip icon={<HomeIcon />} label="Home" />



                            </NavLink>

                            <NavLink
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                to="/news"
                            >

                                <Chip icon={<NewspaperIcon />} label="News" />


                            </NavLink>
                            <Typography>

                                {searchTerm.length !== 0 ? searchTerm : category}
                            </Typography>
                        </Breadcrumbs>
                    </div>

                    <div className="searchBar">
                        <div className="searchBarWrapper">
                            <form onSubmit={handleSubmit}>
                                <input

                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />

                                <IconButton type="submit" aria-label="search">
                                    <SearchIcon />

                                </IconButton>
                            </form>
                        </div>
                    </div>



                    {
                        error &&

                        <div className='errormsg'>

                            <p >
                                ⚠️
                                Showing Offfline Saved News Check Your Internet Connection
                            </p>

                        </div>
                    }
                    {
                        loading &&
                        <div className='loadercss'>
                            <CircularProgress />
                            <p>Loading...</p>
                        </div>
                    }
                    {
                        !loading &&
                        <NewsContent handleShare={handleShare} displaymsg={displaymsg} category={category} newsArray={newsArray} />
                    }




                </div>



                {showMessage && (
                    <div className="displaynotification" style={{ display: 'block' }}>
                        <p>
                            <span>
                                Link Copied
                            </span>
                        </p>
                    </div>
                )}
                < Footer />
            </div>


        </>
    )
}

export default NewAPP