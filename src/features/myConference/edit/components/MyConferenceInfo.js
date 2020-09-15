import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import DateTime from 'components/common/inputs/DateTime';
import CustomTextField from 'components/common/inputs/CustomTextField';
import Autocomplete from 'components/common/select/Autocomplete';
import { onTextBoxChange } from 'utils/propertyChangeAdapters/index';

const MyConferenceInfo = (props) => {
    const { types, categories, conference, dispatch } = props;
    const { name, startDate, endDate, type, category } = conference;
    const { t } = useTranslation();

    const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value })


    return <Grid container spacing={3}>
        <Grid item container lg={9} spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
                <CustomTextField
                    label={t('Conference.Name')}
                    fullWidth
                    value={name}
                    onChange={onTextBoxChange(handleDispatch("name"))}
                />
            </Grid>
        </Grid>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <DateTime
                    label={t('Conference.StartDate')}
                    showTime={true}
                    value={startDate}
                    onChange={handleDispatch("startDate")}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <DateTime
                    label={t('Conference.EndDate')}
                    showTime={true}
                    value={endDate}
                    onChange={handleDispatch("endDate")}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Conference.Type')}
                    createdLabel='Conference.Type'
                    fullWidth
                    isClearable
                    isSearchable
                    creatable
                    options={types}
                    value={type}
                    onChange={handleDispatch("type")}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Conference.Category')}
                    createdLabel='Conference.Category'
                    fullWidth
                    isClearable
                    isSearchable
                    creatable
                    options={categories}
                    value={category}
                    onChange={handleDispatch("category")}
                />
            </Grid>
        </Grid>
    </Grid >
}

MyConferenceInfo.propTypes = {
    types: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired, 
    conference: PropTypes.object, 
    dispatch: PropTypes.func
}

export default MyConferenceInfo;