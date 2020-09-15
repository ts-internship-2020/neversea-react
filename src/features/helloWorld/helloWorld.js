import { useQuery } from '@apollo/client';
import React from 'react';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import { MY_FIRST_QUERY } from './queries/MyFirstQuery';



function HelloWorld () {
    const { loading, data } = useQuery(MY_FIRST_QUERY);

    if(loading) {
        return <LoadingFakeText lines={5}/>
    }

    return data?.myFirstEndpoint;
}

export default HelloWorld