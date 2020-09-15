import React, {useEffect, useReducer} from 'react'; 
import MyConference from './MyConference';
import {useTranslation} from 'react-i18next';
import {useHeader} from 'providers/AreasProvider';
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader';
import SaveButton from 'components/common/buttons/SaveButton';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import { reducer, initialConference } from 'features/myConference/edit/ConferenceState';
import { useRouteMatch } from 'react-router-dom';
import { CONFERENCE_QUERY } from '../queries/ConferenceQuery';
import { useQuery } from '@apollo/client';
import { useToast } from 'hooks/toasts';




const MyConferenceContainer = () => {
    const {t} = useTranslation();
    const [, setHeader] = useHeader();
    const addToast = useToast();
    const match = useRouteMatch();
    const conferenceId = match.params.id; 
    const isNew = conferenceId === "new";


    const [conference, dispatch] = useReducer(reducer, initialConference);

    const { loading, data } = useQuery(CONFERENCE_QUERY, {
        variables: { id: conferenceId, isNew },
        onCompleted: data => data?.conference && dispatch({ type: 'resetData', payload: data?.conference }),
        onError: error => addToast(error, 'error', false)
    });

    useEffect(() => () => setHeader(null), [setHeader])
    useEffect(() => {
        setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t("General.Buttons.Save")} />} />)
    }, [conference.name, setHeader, t])


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