import React from "react";
import "./Newscard.css";
import { Typography } from "@material-ui/core";

const NewsCard = ({ newsItem }) => {
  // console.log(newsItem);

  const fulldate = new Date(newsItem.datePublished);
  // console.log("FULLDATE IS" ,fulldate);
  var date = fulldate.toString().split(" ");
  // console.log("AFTER SPLITING" ,date);
  const hour = parseInt(date[4].substring(0, 2));
  // console.log("HOUR-", hour);

  const time = hour > 12 ? true : false;

  return (

    <div className="newsCard">
      <a href={newsItem.url} target="__blank" className="source">

        <div className="newcardimg" style={newsItem.image?.url ? {} : { maxHeight: '200px' }}>
          <img
            src={
              newsItem.image.url
            }
            className="orginalnewsImage"
            alt={newsItem.title}
          />

        </div>
        <div className="newsText">
          <div>
            {<Typography variant="h5" className="title">{newsItem.title}</Typography>}

            <br />
            <Typography className="author" variant="caption" display="block" gutterBottom>

              <a href={newsItem.url} target="__blank">
                <b>Source : </b>
              </a>{" "}

              <span className="muted">
                {" "}
                {newsItem?.provider?.name ? newsItem?.provider?.name : "unknown"} / {" "}
                {time
                  ? `${hour - 12}:${date[4].substring(3, 5)} pm`
                  : `${hour}:${date[4].substring(3, 5)} am`}{" "}
                on {date[2]} {date[1]} {date[3]}, {date[0]}
              </span>

            </Typography>
            <div className="lowernewsText">
              <div className="description">{newsItem.description}</div>
              <span className="readmore">
                <span >read more at{" "}</span>

                <b>{newsItem?.provider.name}</b>

              </span>
            </div>
          </div>
        </div>
      </a>
    </div>

  );
};

export default NewsCard;
