import gql from 'graphql-tag'

export const TABLE_DATA = gql`
  query tableData {
    allGames {
      title
      id,
      console
      genre
      score
      year
    }
  }
`