import React, {useEffect, useReducer, useCallback} from 'react'; 
import MyConference from './MyConference';
import { useTranslation } from 'react-i18next';
import { useHeader } from 'providers/AreasProvider';
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader';
import SaveButton from 'components/common/buttons/SaveButton';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import { reducer, initialConference } from 'features/myConference/edit/ConferenceState';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { CONFERENCE_QUERY } from '../queries/ConferenceQuery';
import { useQuery, useMutation } from '@apollo/client';
import { useToast } from 'hooks/toasts';
import { useEmail } from 'hooks/useEmail';
import { UPDATE_CONFERENCE_MUTATION } from '../mutations/UpdateConference';


const MyConferenceContainer = () => {
    const {t} = useTranslation();
    const [, setHeader] = useHeader();
    const addToast = useToast();
    const match = useRouteMatch();
    const conferenceId = match.params.id; 
    const isNew = conferenceId === "new";
    const history = useHistory();
    const [organizerEmail] = useEmail();


    const [conference, dispatch] = useReducer(reducer, initialConference);

    const { loading, data } = useQuery(CONFERENCE_QUERY, {
        variables: { id: conferenceId, isNew },
        onCompleted: data => data?.conference && dispatch({ type: 'resetData', payload: data?.conference }),
        onError: error => addToast(error, 'error', false)
    });

    const [saveConference] = useMutation(UPDATE_CONFERENCE_MUTATION, {
        onCompleted: result => {
            addToast(t("Conferences.SuccessfullySaved"), 'success');
            if(isNew) {
                //history.push(`/myConferences/${result?.saveConference?.id}`);
                history.push(`/myConferences`);
                return
            }
            result?.saveConference && dispatch({ type: 'resetData', payload: result?.saveConference })
        },
        onError: error => addToast(error, 'Could not save conference', false)
    });

    const handleSave = useCallback(localConference => () => {
        const { id, name, startDate, endDate, deletedSpeakers, type, category, location, speakers } = localConference;
        const { city, country, county, ...locationData } = location;
        const input = {
            id, name, startDate, endDate, deletedSpeakers, type, category, 
            location: {
                ...locationData, 
                cityId: city.id, 
                countryId: country.id, 
                countyId: county.id
            }, 
            speakers, 
            organizerEmail
        }
        saveConference({ variables: { input } })
    }, [saveConference, organizerEmail]);

    useEffect(() => () => setHeader(null), [setHeader])
    useEffect(() => {
        setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton onClick={handleSave(conference)} title={t("General.Buttons.Save")} />} />)
    }, [handleSave, conference, setHeader, t])


    if(loading) {

        return <LoadingFakeText lines={10}/>
    }

    return <MyConference
        conference={conference}
        dispatch={dispatch}
        types={data?.typeList}
        categories={data?.categoryList}
        countries={data?.countryList}
        counties={data?.countyList}
        cities={data?.cityList}
/>

}

export default MyConferenceContainer