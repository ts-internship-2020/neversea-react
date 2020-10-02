import React from 'react';
import Typography from 'components/common/inputs/Typography';
import PropTypes from 'prop-types';


const ParticipantItem = props => {
    const { email } = props;
    return <Typography>{email}</Typography>
}

ParticipantItem.propTypes = {
    email: PropTypes.string
}

export default ParticipantItem;