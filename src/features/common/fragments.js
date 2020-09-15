import { gql } from "@apollo/client";

const CommonFragments = {
  paginationInfo: gql`
    fragment paginationInfo on Page {
      page
      pageSize
  }`,
  type: gql`
    fragment type on Type {
      id 
      name
    }`,
  category: gql`
    fragment category on Category {
      id 
      name
    }`,
  county: gql`
    fragment county on County {
      id 
      name
    }`,
  city: gql`
    fragment city on City {
      id 
      name
    }`,
  country: gql`
    fragment country on Country {
      id 
      name
    }`
}

export default CommonFragments;