import styled from 'styled-components'
import tw from 'tailwind.macro'
import { Link } from 'react-router-dom'

// Main Container
export const Nav = styled.nav`${tw`
  flex items-center justify-between flex-wrap bg-gray-800 p-6 w-full z-10 top-0 left-0 flex-row
`}`

// NavTitle
export const NavTitleContainer = styled.div`
  ${tw`flex items-center flex-shrink-0 text-white mr-6`}
`
export const NavTitleLink = styled(Link)`
  ${tw`text-white no-underline hover:text-white hover:no-underline`}
`
export const NavTitleText = styled.span`
  ${tw`text-2xl pl-2`}
`

// NavLinks
export const NavMenuContainer = styled.div`${tw`
  w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0`}
  display: ${props => props.toggle ? 'block' : 'hidden'}
`
export const NavMenu = styled.ul`${tw`
  list-reset lg:flex justify-end flex-1 items-center
`}`
export const NavLink = styled(Link)`${tw`
  no-underline mr-3 inline-block no-underline hover:text-gray-200 hover:text-underline py-2 px-4`}
  color: ${props => props.active === 'active' ? 'white' : 'gray'}
`

// Burguer Menu
export const BurguerMenuContainer = styled.div`${tw`
  block lg:hidden`}
`
export const BurguerButton = styled.button`${tw`
  flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white
`}`
export const BurguerIcon = styled.svg`${tw`
  fill-current h-3 w-3`
}`
