import { Button, Container } from "@material-ui/core";
import React, { Fragment } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsContent.css"
import { Breadcrumbs, Chip } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import NewspaperIcon from '@mui/icons-material/Newspaper';
import HomeIcon from '@mui/icons-material/Home';

const NewsContent = ({ newsArray, newsResults, loadmore, setloadmore }) => {
  return (
    <Container className="NewsContentContainer">

      <div className="breadcum">
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            to="/"
          >

            <Chip icon={<HomeIcon />} label="Home" />



          </NavLink>

          <NavLink
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            to="/todo"
          >

            <Chip icon={<NewspaperIcon />} label="News" />


          </NavLink>
        </Breadcrumbs>
      </div>

      <div div className="content" >


        {
          newsArray.map((newsItem) => (
            <NewsCard newsItem={newsItem} key={newsItem.title} />
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
    </Container>
  );
};

export default NewsContent;
