import React from 'react'; 
import PropTypes from 'prop-types';
import ConferenceSubtitle from './ConferenceSubtitle';
import ConferenceContent from './ConferenceContent';
import RegularCard from 'components/common/cards/RegularCard';


const ConferenceItem = props => {
    const {conference} = props;
    const {name, location, speakers} = conference; 
    const speaker = speakers.find(speaker => speaker.isMainSpeaker)
    return <RegularCard
                cardTitle={name}
                cardSubtitle={<ConferenceSubtitle location={location} speaker={speaker}/>}
                content={<ConferenceContent conference={conference}/>}/>
}

ConferenceItem.propTypes = {
    conference: PropTypes.object.isRequired
}

export default ConferenceItem