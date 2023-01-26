import React from "react";
import "./Newscard.css";

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
    <a href={newsItem.url} target="__blank" className="source">
      <div className="newsCard">
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
            {<span className="title">{newsItem.name}</span>}

            <br />

            <span className="author">
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
            </span>
            <div className="lowernewsText">
              <div className="description">{newsItem.description}</div>
              <span className="readmore">
                read more at{" "}

                <b>{newsItem?.provider[0].name}</b>

              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
