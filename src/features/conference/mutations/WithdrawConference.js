import { gql } from '@apollo/client';

export const WITHDRAW_CONFERENCE_MUTATION = gql`
mutation withdraw($input: AttendeeInput!) {
    withdraw(input: $input)
},
`