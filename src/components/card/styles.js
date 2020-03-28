import styled from 'styled-components'
import tw from 'tailwind.macro'

//  Home
export const Container = styled.div`${tw`
  flex flex-row items-center justify-center flex-wrap bg-white rounded-lg p-4 m-4
  hover:shadow-2xl hover:cursor-pointer sm:w-3/12`}
`
export const Img = styled.img`${tw`
  `}
`
export const Description = styled.p`${tw`
  flex items-center justify-center flex-wrap p-4`}
`
// Modal
export const ModalContainer = styled.div`${tw`
  flex flex-col justify-center w-8/12 ml-auto mr-auto sm:mt-40`}
  margin-top 856px;
`
export const Title = styled.span`${tw`
  text-center`}
  text-transform: capitalize;
  width: fit-content;
`
export const ModalDescription = styled.p`${tw`
  flex items-center flex-wrap p-4`}
`
