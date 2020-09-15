import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';
import MyConferenceItem from './MyConferenceItem';

const MyConferenceList = props => {
    const {conferences} = props;
    return <Grid container spacing={2}>
        {conferences.map((conference) => (
        <Grid item key={conference.id} xs={12} lg={4} >
            <MyConferenceItem  conference={conference} />
        </Grid>
        ))}
    </Grid>
}

MyConferenceList.propTypes = {
    conferences: PropTypes.array.isRequired
}

export default MyConferenceList;