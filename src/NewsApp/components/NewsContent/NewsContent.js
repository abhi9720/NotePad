
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsContent.css"


const NewsContent = ({ newsArray }) => {
  return (



    <div className="content" >


      {
        newsArray.map((newsItem) => (
          <NewsCard newsItem={newsItem} key={newsItem.name} />
        ))
      }




    </div >

  );
};

export default NewsContent;
