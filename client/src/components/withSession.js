import React from 'react';

import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from '../queries';

const withSession = Component => props => (
    <Query query={GET_CURRENT_USER} >
        {({ data, loading, refetch }) => {
            if (loading) return null;
            console.log(data);
            return (
                <Component {...props} refetch={refetch} /> // *refetch get info of the user log from the redirect
            )
        }}
    </Query>
);

export default withSession;