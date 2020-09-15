import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Info, LocationOn, Face } from '@material-ui/icons'
import IconCard from 'components/common/cards/IconCard'
import CardTitle from 'components/common/cards/CardTitle'
import AddButton from 'components/common/buttons/AddButton'
import MyConferenceInfo from './MyConferenceInfo';
import MyConferenceLocation from './MyConferenceLocation';
import MyConferenceSpeakers from './MyConferenceSpeakers';


const MyConference = props => {
    const { types, categories, countries, counties, cities, conference, dispatch } = props
    const { location, speakers } = conference;
    const { t } = useTranslation()

    const handleAddNewSpeaker = useCallback(() => dispatch({ type: 'addSpeaker' }), [dispatch])

    return <>
        <IconCard
            icon={Info}
            title={t("Conference.Info")}
            content={
                <MyConferenceInfo
                    types={types}
                    categories={categories}
                    conference={conference}
                    dispatch={dispatch}
                />
            }
        />
        <IconCard
            icon={LocationOn}
            title={t("Conference.Location")}
            content={
                <MyConferenceLocation
                    countries={countries}
                    counties={counties}
                    cities={cities}
                    location={location}
                    dispatch={dispatch}
                />
            }
        />
        <IconCard
            icon={Face}
            title={
                <CardTitle
                    title={t("Conference.Speakers")}
                    actions={[<AddButton key='addButton' title={t("General.Buttons.AddSpeaker")} onClick={handleAddNewSpeaker} />]}
                />
            }
            content={
                <MyConferenceSpeakers
                    speakers={speakers}
                    dispatch={dispatch}
                />
            }
        />
    </>
}

MyConference.propTypes = {
    types: PropTypes.array,
    categories: PropTypes.array,
    countries: PropTypes.array,
    counties: PropTypes.array,
    cities: PropTypes.array, 
    conference: PropTypes.object, 
    dispatch: PropTypes.func
}

export default MyConference