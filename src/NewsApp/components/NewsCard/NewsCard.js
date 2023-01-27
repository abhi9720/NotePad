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

        <div className="newcardimg">
          {newsItem.image && <img
            src={

              newsItem.image.thumbnail.contentUrl

            }
            width={newsItem.image.thumbnail.contentUrl?.width}
            height={newsItem.image.thumbnail.contentUrl?.height || 236}
            alt={newsItem.name}
            className="newsImage"
          />
          }

        </div>
        <div className="newsText">
          <div>
            {<Typography variant="h5" className="title">{newsItem.name}</Typography>}

            <br />
            <Typography className="author" variant="caption" display="block" gutterBottom>

              <a href={newsItem.url} target="__blank">
                <b>short </b>
              </a>{" "}

              <span className="muted">
                {" "}
                by {newsItem?.provider[0].name ? newsItem?.provider[0].name : "unknown"} / {" "}
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

                <b>{newsItem?.provider[0].name}</b>

              </span>
            </div>
          </div>
        </div>
      </a>
    </div>

  );
};

export default NewsCard;
