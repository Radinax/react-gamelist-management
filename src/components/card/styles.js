import styled from 'styled-components'
import tw from 'tailwind.macro'

// GameList
export const Container = styled.div`${tw`
  flex flex-row items-center justify-center flex-wrap bg-white rounded-lg p-4 m-4 w-3/12
  hover:shadow-2xl hover:cursor-pointer`}
`
export const Img = styled.img`${tw`
  `}
`
export const Description = styled.p`${tw`
  flex items-center justify-center flex-wrap p-4`}
`
