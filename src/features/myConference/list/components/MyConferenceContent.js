import React, {useCallback} from 'react'; 
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Typography from 'components/common/inputs/Typography';
import Button from 'components/common/buttons/Button';
import { useHistory } from 'react-router-dom';

const MyConferenceContent = props => {
    const { conference } = props;
    const { startDate, endDate, type, category, id } = conference;
    const {t} = useTranslation();
    const history = useHistory();

    const handleEditButton = useCallback(() => history.push(`myConferences/${id}`), [history, id]);

    const startDateFormatted = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } });
    const endDateFormatted = t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm' } });

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography>{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{`${type?.name}, ${category?.name}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button right color="danger" size={"sm"}>{t('MyConferences.Delete')}</Button>
                <Button right color="info" size={"sm"} onClick={handleEditButton} >{t('MyConferences.Edit')}</Button>
            </Grid>
        </Grid>
    )
}

MyConferenceContent.propTypes = {
    conference: PropTypes.object.isRequired
}
export default MyConferenceContent