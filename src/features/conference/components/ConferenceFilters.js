import React, { useCallback, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import IconCard from 'components/common/cards/IconCard';
import { useTranslation } from 'react-i18next';
import DateTime from 'components/common/inputs/DateTime';
import { Grid } from '@material-ui/core';
import Button from 'components/common/buttons/Button';
import PropTypes from 'prop-types';
import { generateDefaultFilters } from 'utils/functions'


const ConferenceFilters = (props) => {
    const {filters, onApplyFilters} = props;
    const [startDate, setStartDate] = useState(filters.startDate); 
    const [endDate, setEndDate] = useState(filters.endDate); 

    const {t} = useTranslation();

    const handleApplyFilters = useCallback(() => onApplyFilters({startDate, endDate}),[endDate,startDate,onApplyFilters]);
    const handleResetFilters = useCallback(() => {
        const defaultFilters = generateDefaultFilters(); 
        setStartDate(defaultFilters.startDate);
        setEndDate(defaultFilters.endDate);
    }, []);
    const handleKeyPressed = useCallback(({keyCode}) => (keyCode === 13 && handleApplyFilters()),[handleApplyFilters]);

    return  <>
            <IconCard
                icon={SearchIcon}
                iconColor="theme"
                content={
                    <Grid container spacing={2}
                            onKeyDown={handleKeyPressed}>
                        <Grid item xs={12} lg={3}>
                            <DateTime
                                value={startDate}
                                onChange={setStartDate}
                                label={t('Conferences.Filters.StartDate')}
                                clearable/>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <DateTime
                                value={endDate}
                                onChange={setEndDate}
                                label={t("Conferences.Filters.EndDate")}
                                clearable/>
                        </Grid>
                    </Grid>
                }>

            </IconCard> 
            <Button size="sm" color="primary" right={true} onClick={handleResetFilters}>
                {t("General.Buttons.ResetFilters")}
            </Button>
            <Button size="sm" color="primary" right={true} onClick={handleApplyFilters}>
                {t("General.Buttons.ApplyFilters")}
            </Button>
        </>
}

ConferenceFilters.propTypes = {
    filters: PropTypes.shape({startDate:  PropTypes.any, endDate: PropTypes.any}).isRequired, 
    onApplyFilters: PropTypes.func.isRequired
}

export default ConferenceFilters;