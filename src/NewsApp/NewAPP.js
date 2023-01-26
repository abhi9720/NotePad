import React from 'react'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import './newsapp.css'
import Footer from "./components/Footer/Footer";
import NavInshorts from "./components/NavInshorts";
import NewsContent from "./components/NewsContent/NewsContent";
// import apikey from "./data/config";
import { CircularProgress } from '@material-ui/core';

const NewAPP = () => {

    const [category, setCategory] = useState("India");
    const [newsArray, setnewsArray] = useState([]);
    const [newsResults, setnewsResults] = useState();
    const [loadmore, setloadmore] = useState(20);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null)

    const newsApi = async () => {
        const options = {
            method: 'GET',
            url: 'https://bing-news-search1.p.rapidapi.com/news',
            params: {
                count: '30',
                offset: '50',
                originalImg: 'true',
                category: `${category}`,
                cc: 'IN',
                safeSearch: 'Off',
                textFormat: 'Raw'
            },
            headers: {
                'X-BingApis-SDK': 'true',
                'X-RapidAPI-Key': '41599ae506msh68285b0f476e7aep1fe9d9jsn13b33e53059e',
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
    }, [newsResults, category, loadmore]);

    return (
        <div className="App">
            <NavInshorts setCategory={setCategory} />
            {
                loading ?
                    <div className='loadercss'>
                        <CircularProgress />
                        <p>Loading...</p>
                    </div>

                    :
                    <NewsContent setloadmore={setloadmore} loadmore={loadmore} newsArray={newsArray} newsResults={newsResults} />
            }
            {
                error && <>
                    <p>{error}</p>
                </>
            }
            <Footer />
        </div>
    )
}

export default NewAPP