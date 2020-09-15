import React from 'react'; 
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Typography from 'components/common/inputs/Typography';
import { useTranslation } from 'react-i18next';


const ConferenceSubtitle = props => {
    const {location, speaker} = props;
    const {t} = useTranslation();

    return (
        <Grid container item lg={12}>
            <Grid item lg={1}>
                <PermIdentityIcon />
            </Grid>
            <Grid item lg={11}>
                <Typography>{t("Conferences.Speaker")}</Typography>
                <Typography>{speaker?.name}</Typography>
            </Grid>
            <Grid item lg={1}>
                <RoomIcon />
            </Grid>
            <Grid item lg={11}>
                <Typography>{`${location?.city.name}, ${location?.county.name}, ${location?.country.name}`}</Typography>
            </Grid>
        </Grid>
    )
}

ConferenceSubtitle.propTypes = {
    location: PropTypes.object,
    speaker: PropTypes.object.isRequired
}

export default ConferenceSubtitle