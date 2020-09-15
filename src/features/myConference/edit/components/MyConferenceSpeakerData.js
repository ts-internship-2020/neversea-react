import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles, Checkbox } from '@material-ui/core';
import { Tr, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import tableStyle from 'assets/jss/components/common/tableStyle';
import CustomTextField from 'components/common/inputs/CustomTextField';
import DeleteButton from 'components/common/buttons/DeleteButton';
import { onTextBoxChange, onCheckBoxChange } from 'utils/propertyChangeAdapters/index';


const useStyles = makeStyles(tableStyle);

const MyConferenceSpeakerData = (props) => {

    const { index, speaker, dispatch } = props;
    const { t } = useTranslation();
    const classes = useStyles();
    const { name, nationality, rating, isMainSpeaker} = speaker;

    const handleDispatch = actionType => value => dispatch({type: actionType, payLoad: value, index})

    return <Tr>
        <Td className={classes.tableContent}>
            <CustomTextField
                fullWidth
                value={name}
                onChange={onTextBoxChange(handleDispatch("speakerName"))}
            />
        </Td>
        <Td className={classes.tableContent}>
            <CustomTextField
                fullWidth
                value={nationality}
                onChange={onTextBoxChange(handleDispatch("nationality"))}
            />
        </Td>
        <Td className={classes.tableContent}>
            <CustomTextField
                fullWidth
                isNumeric
                value={rating}
                onChange={handleDispatch("rating")}
            />
        </Td>
        <Td className={classes.tableContent}>
            <Checkbox
                color='secondary'
                checked={!!isMainSpeaker}
                onChange={onCheckBoxChange(handleDispatch("isMainSpeaker"))}
            />
        </Td>
        <Td className={classes.tableContent}>
            <DeleteButton 
                title={t('General.Buttons.DeleteSpeaker')}
                onClick={handleDispatch('deleteSpeaker')} />
        </Td>
    </Tr>
};

MyConferenceSpeakerData.propTypes = {
    speaker: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
}

export default MyConferenceSpeakerData;