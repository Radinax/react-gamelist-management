import styled from 'styled-components'
import tw from 'tailwind.macro'

//  Home
export const Container = styled.div`${tw`
  flex flex-row items-center justify-center flex-wrap bg-white m-4
  hover:shadow-2xl hover:cursor-pointer sm:w-3/12`}
`
export const Img = styled.img`${tw`
  w-full`}
`
export const Description = styled.p`${tw`
  flex items-center justify-center flex-wrap p-4`}
`
// Modal
export const ModalContainer = styled.div`${tw`
  block ml-auto mr-auto rounded-lg`}
`
export const Title = styled.span`${tw`
  text-center font-bold`}
  text-transform: capitalize;
  width: fit-content;
`
export const ModalDescription = styled.p`${tw`
  flex items-center flex-wrap pt-4 pb-4`}
`
