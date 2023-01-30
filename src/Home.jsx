import React from 'react'
import { Typography } from '@mui/material'
import './App.css'
import { Link, NavLink } from 'react-router-dom'
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
                <Typography variant="h5" align='center'>
                    {text}
                </Typography>
            </div>
        </div>
    )
}

const Home = () => {
    return (

        <div className='Homepage'>
            <Navbar />
            <div className='Cardlist'>
                <Typography variant='h2' className='homepageheading'>
                    Pick Your Rapidly Used Apps at
                    <br />
                    <span className='highlight'>
                        <b>one spot</b>
                    </span>

                </Typography>
                <div className='cardwrapper'>
                    <NavLink to="/todo">
                        <Card imgurl={'../../../Icon-todo.png'} text="ToDo"></Card>
                    </NavLink >
                    <NavLink to="/notepad">
                        <Card imgurl={'../../../Icon-notepad.png'} text="Note Pad"></Card>
                    </NavLink>
                    <NavLink to="/news">
                        <Card imgurl={'../../../NewsAppicon.png'} text="News"></Card>
                    </NavLink>

                </div>
            </div>

            <div className='connect_withme'>
                <Link className='sociallink' href="https://github.com/abhi9720" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon />
                </Link>
                <Link className='sociallink' href="https://www.linkedin.com/in/abhi9720" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon />
                </Link>
                <Link className='sociallink' href="https://www.instagram.com/abhi9720_" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />
                </Link>

            </div>
        </div>
    )
}

export default Home