import React from 'react'
import { Typography } from '@mui/material'
import './App.css'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar/Navbar'

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

        <>
            <Navbar />
            <div className='Cardlist'>
                <NavLink to="/todo">
                    <Card imgurl={'../../../Icon-todo.png'} text="ToDo"></Card>
                </NavLink >
                <NavLink to="/notepad">
                    <Card imgurl={'../../../Icon-notepad.png'} text="Note Pad"></Card>
                </NavLink>

            </div>
        </>
    )
}

export default Home