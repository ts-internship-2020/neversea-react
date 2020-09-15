import React from 'react'
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import Typography from 'components/common/inputs/Typography';
import qr from "assets/img/qr.jpg";
import PropTypes from 'prop-types';


const ConferenceCodeModal = props => {
    const { code } = props;

    const { t } = useTranslation();

    return <Grid container justify={"center"}>
        <Grid item>
            <img src={qr} alt="QR" />
        </Grid>
        <Grid item>
            <Typography>{t("Conferences.QRCodeMessage", { code })}</Typography>
        </Grid>
    </Grid>
}

ConferenceCodeModal.propTypes = {
    code: PropTypes.string.isRequired
}

export default ConferenceCodeModal