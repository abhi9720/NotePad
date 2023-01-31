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
    const [newsArray, setnewsArray] = useState([]);
    const [newsResults, setnewsResults] = useState();
    const [loadmore, setloadmore] = useState(20);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null)



    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const options = {
            method: 'GET',
            url: 'https://bing-news-search1.p.rapidapi.com/news/search',
            params: {
                q: searchTerm,
                freshness: 'Day',
                originalImg: 'true',
                textFormat: 'Raw',
                safeSearch: 'Off'
            },
            headers: {
                'X-BingApis-SDK': 'true',
                'X-RapidAPI-Key': apicode,
                'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
            }
        };


        try {
            setloading(true);

            const news = await axios.request(options);

            setnewsArray(news.data.value);
            setnewsResults(news.data.value.length);

            setError(null)
        } catch (error) {
            console.log(error);
            setError(error)
        }
        finally {
            setloading(false);
        }
    };


    const newsApi = async () => {
        const options = {
            method: 'GET',
            url: 'https://bing-news-search1.p.rapidapi.com/news/search',
            params: {
                originalImg: 'true',
                category: `${category}`,
                cc: 'IN',
                safeSearch: 'Off',
                textFormat: 'Raw'
            },
            headers: {
                'X-BingApis-SDK': 'true',
                'X-RapidAPI-Key': apicode,
                'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
            }
        };
        try {
            setloading(true);

            const news = await axios.request(options);


            // const news = await axios.get(
            //     `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}&category=${category}&pageSize=${loadmore}`
            // );
            setnewsArray(news.data.value);
            setnewsResults(news.data.value.length);

            setError(null)
        } catch (error) {
            console.log(error);
            setError(error)
        }
        finally {
            setloading(false);
        }
    };

    // console.log(newsArray);

    useEffect(() => {
        newsApi();
        // eslint-disable-next-line
    }, [category]);

    return (
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
                                autoFocus
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
                    loading ?
                        <div className='loadercss'>
                            <CircularProgress />
                            <p>Loading...</p>
                        </div>

                        :
                        <>

                            <NewsContent category={category} setloadmore={setloadmore} loadmore={loadmore} newsArray={newsArray} newsResults={newsResults} />
                        </>
                }
                {
                    error && <>
                        <p>{error}</p>
                    </>
                }
            </div>
            <Footer />
        </div>
    )
}

export default NewAPP