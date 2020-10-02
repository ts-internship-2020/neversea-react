import React, { useState, useCallback } from 'react';
import { Typography, Grid} from '@material-ui/core';
import CustomIconButton from 'components/common/buttons/IconButton';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import CustomTextField from 'components/common/inputs/CustomTextField';
import { useTranslation } from 'react-i18next';
import { emptyString } from 'utils/constants';
import { useEmail } from 'hooks/useEmail';
import { validateEmail } from 'utils/functions';

function Welcome() {
    const {t} = useTranslation();

    const [email, setEmail] = useEmail();
    const [textFieldValue, setTextFieldValue] = useState(email); 
    const [showError, setShowError] = useState(false);

    const textChangedHandler = useCallback(event => setTextFieldValue(event.target.value),[]);

    const handleButtonClick = useCallback(() => {
        const isEmailValid = validateEmail(textFieldValue)
        setEmail(isEmailValid ? textFieldValue : emptyString)
        setShowError(!isEmailValid)
    }, [setEmail, textFieldValue]);

    const handleKeyDown = useCallback(event => {
        if(event.keyCode === 13) {
            handleButtonClick();
        }
    }, [handleButtonClick]);
   

    return (

            <Grid container spacing = {10}
                    direction="column"
                    justify="center"
                    alignItems="center"
                    alignContent="center">
                <Grid item xs={4}>
                    <Typography variant="h5">
                        {t("LandingPage.Title")}
                    </Typography>
                </Grid>
                <Grid item xs={4}
                        container
                        spacing={1}
                        direction="column"
                        justify="center"
                        alignItems="center"
                        alignContent="center">
                        <Grid item xs={12}>
                            <Typography variant="caption">
                                {t("LandingPage.Subtitle")}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField 
                                fullWidth
                                endAdornment={(
                                    <CustomIconButton size="small" color="theme" aria-label="go"
                                                        onClick={handleButtonClick}>
                                        <KeyboardReturnIcon fontSize="small"/>
                                    </CustomIconButton>
                                )}
                                value={textFieldValue}
                                onChange={textChangedHandler}
                                onKeyDown={handleKeyDown}
                                debounceBy={0}
                                error= {showError}
                                helperText = {showError && t("LandingPage.BadEmail")}/>
                        </Grid>
                </Grid>
            
            </Grid>
    
    );
}

export default Welcome;