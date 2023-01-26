import React from 'react'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import './newsapp.css'
import Footer from "./components/Footer/Footer";
import NavInshorts from "./components/NavInshorts";
import NewsContent from "./components/NewsContent/NewsContent";
import apikey from "./data/config";
import { CircularProgress } from '@material-ui/core';

const NewAPP = () => {

    const [category, setCategory] = useState("general");
    const [newsArray, setnewsArray] = useState([]);
    const [newsResults, setnewsResults] = useState();
    const [loadmore, setloadmore] = useState(20);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null)

    const newsApi = async () => {

        try {
            setloading(true);

            const news = await axios.get(
                `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}&category=${category}&pageSize=${loadmore}`
            );
            setnewsArray(news.data.articles);
            setnewsResults(news.data.totalResults);

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