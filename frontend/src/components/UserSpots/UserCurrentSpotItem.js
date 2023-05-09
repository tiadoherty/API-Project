import React from 'react';

import SpotIndexItem from '../ReadSpots/SpotIndexItem';

const UserCurrentSpotItem = ({ userSpot }) => {
    return (
        <SpotIndexItem spot={userSpot} canDeleteAndEdit={true} />
    )
}

export default UserCurrentSpotItem
