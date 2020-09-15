import React from 'react'; 
import PropTypes from 'prop-types';
import MyConferenceSubtitle from './MyConferenceSubtitle';
import MyConferenceContent from './MyConferenceContent';
import RegularCard from 'components/common/cards/RegularCard';


const MyConferenceItem = props => {
    const {conference} = props;
    const {name, location, speakers} = conference; 
    const speaker = speakers.find(speaker => speaker.isMainSpeaker)
    return <RegularCard
                cardTitle={name}
                cardSubtitle={<MyConferenceSubtitle location={location} speaker={speaker}/>}
                content={<MyConferenceContent conference={conference}/>}/>
}

MyConferenceItem.propTypes = {
    conference: PropTypes.object.isRequired
}

export default MyConferenceItem