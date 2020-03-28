import styled from 'styled-components'
import tw from 'tailwind.macro'

// GameList
export const MainContainer = styled.div`${tw`
  flex flex-col items-center justify-center flex-wrap bg-white rounded-lg p-4`}
  display: inline-flex  
`
export const ToolbarContainer = styled.div`${tw`
  flex flex-row justify-between flex-wrap w-full`}  
`
export const Button = styled.button`${tw`
  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1 ml-1`}
`
export const Page = styled.div`${tw`
  flex justify-center bg-transparent`}
`

// Home
export const HomePage = styled.div`${tw`
  flex justify-center flex-col`}
`
export const HomeContainer = styled.div`${tw`
  flex flex-col justify-center bg-white w-6/12`}
`
export const HomeTitle = styled.span`${tw`
  text-4xl text-center`}
`
export const HomeIntro = styled.p`${tw`
  font-sans text-xl p-12 font-light`}
`

// Card
export const CardContainer = styled.div`${tw`
  flex justify-center flex-wrap flex-col sm:flex-row`}
`
