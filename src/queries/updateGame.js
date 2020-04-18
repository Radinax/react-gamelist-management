import gql from 'graphql-tag'

export const UPDATE_GAME = gql`
mutation UpdateGame(
  $id: ID!,
  $title: String!,
  $console: String!,
  $genre: String!,
  $score: String!,
  $year: String!,
  $description: String!,
  $summary: String!,
  $graphics: String!,
  $music: String!,
  $img: String!,
  $gameplay: String!,
  $conclusion: String!) {
  updateGame(
    id: $id,
    title: $title,
    console: $console,
    genre: $genre,
    score: $score,
    year: $year,
    description: $description,
    summary: $summary,
    graphics: $graphics,
    music: $music,
    img: $img,
    gameplay: $gameplay,
    conclusion: $conclusion,
  ) {
    id
    title
    console
    genre
    score
    year
    description
    summary
    graphics
    music
    img
    gameplay
    conclusion
  }
}`
