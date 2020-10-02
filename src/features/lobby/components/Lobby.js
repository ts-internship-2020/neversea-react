import React from 'react';
import { Grid } from '@material-ui/core';
import ConferenceScreen from './ConferenceScreen';
import ParticipantListContainer from './ParticipantListContainer';
import { useLocation } from 'react-router-dom';


const Lobby = _props => {
    const location = useLocation(); 
    console.log(location)

    return <>
        <Grid container>
            <Grid item xs={8}>
                <ConferenceScreen />
            </Grid>
            <Grid item xs={4}>
                <ParticipantListContainer conferenceId={parseInt(location.state.conferenceId)}/>
            </Grid>
        </Grid>
    </>
}

export default Lobby;