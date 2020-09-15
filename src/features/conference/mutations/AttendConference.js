import { gql } from '@apollo/client';

export const ATTEND_CONFERENCE_MUTATION = gql`
mutation attend($input: Attendee!) {
    attend(input: $input)
},
`