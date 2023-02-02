import React from "react";
import "./Newscard.css";
import { IconButton, Typography } from "@material-ui/core";
import ShareIcon from '@mui/icons-material/Share';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
const NewsCard = ({ handleShare, newsItem, displaymsg }) => {
  // console.log(newsItem);

  const fulldate = new Date(newsItem.datePublished);
  // console.log("FULLDATE IS" ,fulldate);
  var date = fulldate.toString().split(" ");
  // console.log("AFTER SPLITING" ,date);
  const hour = parseInt(date[4].substring(0, 2));
  // console.log("HOUR-", hour);

  const time = hour > 12 ? true : false;

  const CopyLink = async () => {
    await navigator.clipboard.writeText(newsItem.url);
    displaymsg()
  };


  const handleClick = async () => {

    handleShare(newsItem.title, newsItem.description, newsItem.url)

  };



  return (

    <div className="newsCard">


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
          {<Typography variant="h5" className="title">
            {newsItem.title}
            <span className="newsactionbtn">
              <IconButton onClick={CopyLink}>
                <InsertLinkIcon></InsertLinkIcon>
              </IconButton>

              <IconButton onClick={handleClick}>
                <ShareIcon></ShareIcon>
              </IconButton>
            </span>

          </Typography>}


          <br />
          <Typography className="author" variant="caption" display="block" gutterBottom>

            <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
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



            <a className="readmore" href={newsItem.url} target="_blank" rel="noopener noreferrer">
              Read more at ‎ <b>{` ${newsItem?.provider.name}`}</b>
            </a>





          </div>
        </div>
      </div>

    </div>

  );
};

export default NewsCard;
