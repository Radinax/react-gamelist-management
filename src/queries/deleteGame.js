import gql from 'graphql-tag'

export const DELETE_GAME = gql`
mutation RemoveGame($id: ID!) {
  removeGame(id: $id) {
    id
  }
}`
