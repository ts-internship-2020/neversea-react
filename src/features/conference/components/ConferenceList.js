import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';
import ConferenceItem from './ConferenceItem';

const ConferenceList = props => {
    const {conferences, onAttend, onWithdraw, onJoin} = props;
    return <Grid container spacing={2}>
        {conferences.map((conference) => (
        <Grid item key={conference.id} xs={12} lg={4} >
            <ConferenceItem onJoin={onJoin} onAttend={onAttend} onWithdraw={onWithdraw} conference={conference} />
        </Grid>
        ))}
    </Grid>
}

ConferenceList.propTypes = {
    conferences: PropTypes.array.isRequired,
    onAttend: PropTypes.func,
    onWithdraw: PropTypes.func,
    onJoin: PropTypes.func
}

ConferenceList.defaultProps = {
    conferences: []
}

export default ConferenceList;