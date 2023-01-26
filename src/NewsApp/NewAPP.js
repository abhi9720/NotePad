import React from 'react'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import './newsapp.css'
import Footer from "./components/Footer/Footer";
import NavInshorts from "./components/NavInshorts";
import NewsContent from "./components/NewsContent/NewsContent";
import apikey from "./data/config";

const NewAPP = () => {

    const [category, setCategory] = useState("general");
    const [newsArray, setnewsArray] = useState([]);
    const [newsResults, setnewsResults] = useState();
    const [loadmore, setloadmore] = useState(20);

    const newsApi = async () => {

        try {

            const news = await axios.get(
                `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}&category=${category}&pageSize=${loadmore}`
            );
            setnewsArray(news.data.articles);
            setnewsResults(news.data.totalResults);
            console.log(news.data.articles)
            console.log(news.data.totalResults)

        } catch (error) {
            console.log(error);
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
            <NewsContent setloadmore={setloadmore} loadmore={loadmore} newsArray={newsArray} newsResults={newsResults} />
            <Footer />
        </div>
    )
}

export default NewAPP