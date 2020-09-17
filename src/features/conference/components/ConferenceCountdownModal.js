import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import Typography from 'components/common/inputs/Typography';
import PropTypes from 'prop-types';
import { useInterval } from 'hooks/useInterval';
import moment from 'moment';

const ConferenceCountdownModal = props => {
    const { conferenceDate } = props;
    const { t } = useTranslation();
    const then = moment(conferenceDate);
    const now = moment();
    const countdown = moment(then - now);

    const [months, setMonths] = useState();
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    useInterval(() => {
      setMonths(countdown.format('M'));
      setDays(countdown.format('D'));
      setHours(countdown.format('HH'));
      setMinutes(countdown.format('mm'));
      setSeconds(countdown.format('ss'));
    }, 1000);

    return <Grid container justify={"center"}>
        <Grid item spacing={2}>
          {months && (<Typography> {months}  {t("DateTime.Months")}- </Typography> )}
        </Grid>
        <Grid item spacing={2}>
          {days && (<Typography> {days}  {t("DateTime.Days")}- </Typography>)}
        </Grid>
        <Grid item spacing={2}>
          {hours && (<Typography> {hours}  {t("DateTime.Hours")}- </Typography>)}
        </Grid>
        <Grid item spacing={2}>
          {minutes && (<Typography> {minutes}  {t("DateTime.Minutes")}- </Typography>)}
        </Grid>
        <Grid item spacing={2}>
          {seconds && (<Typography> {seconds}  {t("DateTime.Seconds")}</Typography>)}
        </Grid>
    </Grid>
}

ConferenceCountdownModal.propTypes = {
    conferenceDate: PropTypes.instanceOf(Date)
}

export default ConferenceCountdownModal