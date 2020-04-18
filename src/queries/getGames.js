import gql from 'graphql-tag'

export const GET_GAMES = gql`
  query getGames {
    allGames {
      summary
      title
      description
      img
      graphics
      music
      gameplay
      conclusion
    }
  }
`
