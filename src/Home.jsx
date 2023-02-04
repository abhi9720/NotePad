import React from 'react'
import { Avatar, Typography } from '@mui/material'
import './App.css'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Card = ({ imgurl, text }) => {
    return (
        <div className='card'>
            <div className='cardmedia'>
                <img src={imgurl} alt="" width="100" height="100" />
            </div>
            <div className='cardtext'>
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}

const Home = () => {
    return (
        <>
            <Navbar />
            <div className='Homepage'>


                <div className='contentWrapper'>
                    <div className="homeheadingwrapper">
                        <Typography variant='h2' className='homepageheading'>
                            Pick Your Rapidly Used Apps at
                            <br />
                            <span className='highlight'>
                                <b>One Spot</b>
                            </span>

                        </Typography>



                    </div>
                    <div className='cardwrapper'>
                        <NavLink to="/task-tracker">
                            <Card imgurl={'../../../Icon-todo.png'} text="Task Tracker"></Card>
                        </NavLink >
                        <NavLink to="/notepad">
                            <Card imgurl={'../../../Icon-notepad.png'} text="Note Pad"></Card>
                        </NavLink>
                        <NavLink to="/news">
                            <Card imgurl={'../../../NewsAppicon.png'} text="News"></Card>
                        </NavLink>
                        <NavLink to="/img-compress">
                            <Card imgurl={'../../../imgresizer.png'} text="ImgResizer"></Card>
                        </NavLink>

                    </div>
                </div>

                <div className='connect_withme'>
                    <a href="https://github.com/abhi9720" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon />
                    </a>
                    <a href="https://www.linkedin.com/in/abhi9720" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon />
                    </a>
                    <a href="https://www.instagram.com/abhi9720_" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                    </a>

                    <a className="avatar" href="https://abhi-9720.github.io" target="_blank" rel="noopener noreferrer">
                        <Avatar alt="abhi-9720.github.io" src="../abhi9720.png"
                            style={{ width: 34, height: 34 }} />
                    </a>


                </div>
            </div>
        </>
    )
}

export default Home