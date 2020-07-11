import gql from "graphql-tag";

/*
example query with params
const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;
*/

export const REPOS = gql`
  query getRepo {
    organization(login: "facebook") {
      repositories(first: 10) {
        totalCount
        nodes {
          id
          pushedAt
          pullRequests(first: 10) {
            totalCount
            nodes {
              id
              title
              url
              reviews(last: 10) {
                nodes {
                  comments(last: 10) {
                    totalCount
                    nodes {
                      diffHunk
                      bodyHTML
                      url
                      author {
                        avatarUrl(size: 50)
                      }
                    }
                  }
                }
                totalCount
              }
            }
          }
        }
      }
    }
  }
`;
