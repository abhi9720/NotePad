import { Button } from "@material-ui/core";
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsContent.css"


const NewsContent = ({ newsArray, newsResults, loadmore, setloadmore }) => {
  return (



    <div className="content" >


      {
        newsArray.map((newsItem) => (
          <NewsCard newsItem={newsItem} key={newsItem.name} />
        ))
      }


      {
        loadmore <= newsResults && (
          <>
            <hr />
            <Button variant="text" className="loadMore" onClick={() => setloadmore(loadmore + 20)}>
              Load  More
            </Button>
          </>

        )
      }

    </div >

  );
};

export default NewsContent;
