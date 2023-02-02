
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsContent.css"


const NewsContent = ({ handleShare, newsArray, displaymsg }) => {
  return (



    <div className="content" >


      {
        newsArray.map((newsItem) => (
          <NewsCard handleShare={handleShare} displaymsg={displaymsg} newsItem={newsItem} key={newsItem.name} />
        ))
      }




    </div >

  );
};

export default NewsContent;
