import React from 'react';
import Welcome from '@material-ui/icons/Dashboard';
import EventIcon from '@material-ui/icons/Event';
import EventNote from '@material-ui/icons/EventNote';



const menuItems = [
    { icon: <Welcome />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome'},
    { icon: <EventIcon />, text: 'NavBar.Conferences', path: '/conferences', name: 'Conferences' },
    { icon: <EventNote />, text: 'NavBar.MyConferences', path: '/myConferences', name: 'MyConferences' }

]

export default menuItems