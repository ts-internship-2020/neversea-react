import React from 'react';
import ParticipantList from './ParticipantList';
import PropTypes from 'prop-types';
//import Card from 'components/common/cards/Card';


const ParticipantListContainer = props => {
    const { conferenceId } = props;
    return <ParticipantList conferenceId={conferenceId}/>
}

ParticipantListContainer.propTypes = {
    conferenceId: PropTypes.number
}

export default ParticipantListContainer;