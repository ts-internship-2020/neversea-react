import { gql } from '@apollo/client';

export const ATTEND_CONFERENCE_MUTATION = gql`
mutation attend($input: AttendeeInput!) {
    attend(input: $input)
},
`