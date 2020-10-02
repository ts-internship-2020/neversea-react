import { gql } from '@apollo/client';


export const ATTENDEE_LIST_QUERY = gql`
  query attendeeList($conferenceId: Int!) {
    attendeeList(conferenceId: $conferenceId){
      attendeeEmail
      conferenceId
      statusId
    }
  }
`