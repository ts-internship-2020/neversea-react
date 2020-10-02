import React from 'react';
import ParticipantItem from './ParticipantItem';
import { Grid } from '@material-ui/core';
import { ATTENDEE_LIST_QUERY } from '../queries/AttendeeList';
import { useQuery } from '@apollo/client';
import { useToast } from 'hooks/toasts';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import PropTypes from 'prop-types';
import Typography from 'components/common/inputs/Typography';
import { useTranslation } from 'react-i18next';
import { useInterval } from 'hooks/useInterval';


const ParticipantList = props => {
    const { conferenceId } = props;
    const addToast = useToast();
    const { t } = useTranslation();

    const { loading, data, refetch } = useQuery(ATTENDEE_LIST_QUERY, {
        variables: { conferenceId },
        onError: error => addToast(error, t("Error.LoadingData"), false)
    });

    useInterval(() => {
        refetch()
        console.log('boo')
      }, 10000);

    const attendees = data?.attendeeList;
    const onlineAttendees = attendees?.filter(attendee => {
        return attendee.statusId === 1;
    });
    const offlineAttendees = attendees?.filter(attendee => {
        return attendee.statusId === 3 && attendee.attendeeEmail.length > 0 ;
    });

    console.log(offlineAttendees)

    if(loading) {
        return <LoadingFakeText lines={10}/>
    }

    return <>
    <Grid container xs={12}>
        <Grid item xs={12}>
            <Typography variant="h6">{t("General.Online")} ({onlineAttendees?.length})</Typography>
        </Grid>
            {onlineAttendees?.map((attendee) => (
            <Grid item key={attendee.attendeeEmail} xs={12} >
                <ParticipantItem email={attendee.attendeeEmail}/>
            </Grid>))}
        <Grid item xs={12}>
            <Typography variant="h6">{t("General.Offline")} ({offlineAttendees?.length})</Typography>
        </Grid>
            {offlineAttendees?.map((attendee) => (
            <Grid item key={attendee.attendeeEmail} xs={12} >
                <ParticipantItem email={attendee.attendeeEmail}/>
            </Grid>))}
    </Grid>
    </>
}

ParticipantList.propTypes = {
    conferenceId: PropTypes.number
}

export default ParticipantList;