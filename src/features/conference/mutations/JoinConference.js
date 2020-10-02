import { gql } from '@apollo/client';

export const JOIN_CONFERENCE_MUTATION = gql`
mutation join($input: AttendeeInput!) {
    join(input: $input)
},
`