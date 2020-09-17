import React from 'react'; 
import PropTypes from 'prop-types';
import attendeeStatus from 'constants/attendeeStatus';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Typography from 'components/common/inputs/Typography';
import Button from 'components/common/buttons/Button';



const ConferenceContent = props => {
    const { conference, onAttend, onWithdraw, onJoin } = props;
    const { status, startDate, endDate, type, category } = conference;
    const {t} = useTranslation();

    const noStatusSet = t("Conferences.StatusNotSet");
    const startDateFormatted = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } });
    const endDateFormatted = t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm' } });

    const showJoin = status?.id === attendeeStatus.Attended
    const showWithdraw = status?.id === attendeeStatus.Attended || status?.id === attendeeStatus.Joined
    const showAttend = status?.id === attendeeStatus.Withdrawn || !status?.id

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="subtitle1" color="error">{status?.name || noStatusSet}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{`${type?.name}, ${category?.name}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                {showJoin && <Button right size="sm" color="success" 
                                        onClick={onJoin(conference)}>{t("Conferences.Join")}</Button>}
                {showWithdraw && <Button right size="sm" color="danger"
                                        onClick={onWithdraw(conference)}>{t("Conferences.Withdraw")}</Button>}
                {showAttend && <Button right size="sm" color="info"
                                        onClick={onAttend(conference)}>{t("Conferences.Attend")}</Button>}
            </Grid>
        </Grid>
    )
}

ConferenceContent.propTypes = {
    conference: PropTypes.object.isRequired,
    onAttend: PropTypes.func,
    onWithdraw: PropTypes.func,
    onJoin: PropTypes.func
}
export default ConferenceContent