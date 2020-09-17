import React from 'react'; 
import PropTypes from 'prop-types';
import ConferenceSubtitle from './ConferenceSubtitle';
import ConferenceContent from './ConferenceContent';
import RegularCard from 'components/common/cards/RegularCard';


const ConferenceItem = props => {
    const {conference, onAttend, onWithdraw, onJoin} = props;
    const {name, location, speakers} = conference; 
    const speaker = speakers.find(speaker => speaker.isMainSpeaker)
    return <RegularCard
                cardTitle={name}
                cardSubtitle={<ConferenceSubtitle location={location} speaker={speaker}/>}
                content={<ConferenceContent onJoin={onJoin} onWithdraw={onWithdraw} onAttend={onAttend} conference={conference}/>}/>
}

ConferenceItem.propTypes = {
    conference: PropTypes.object.isRequired,
    onAttend: PropTypes.func,
    onWithdraw: PropTypes.func, 
    onJoin: PropTypes.func
}

export default ConferenceItem