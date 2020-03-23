import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { 
  Nav,
  NavTitleContainer, NavTitleLink, NavTitleText, 
  NavMenuContainer, NavMenu, NavLink,
  BurguerMenuContainer, BurguerButton, BurguerIcon
} from './styles'

const links = [
  { name: 'Home', path: './', url: '/' },
  { name: 'Game List', path: './game-list', url: '/game-list' }
]

const Navbar = () => {
  const [toggleValue, setToggleValue] = useState(false)
  const history = useHistory()
  const currentUrl = history.location.pathname

  const handleActiveClass = (currentUrl, url) => {
    if(currentUrl === url) return 'active'
  }
  const handleToggle = () => !toggleValue ? setToggleValue(true) : setToggleValue(false)
  

  const NavTitle = (
    <NavTitleContainer>
			<NavTitleLink to='./'>
				<NavTitleText>ADRIAN JRPG SITE</NavTitleText>
			</NavTitleLink>
		</NavTitleContainer>
  )

  const NavLinks = (
    <NavMenuContainer toggle={toggleValue}>
      <NavMenu>
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            active={handleActiveClass(currentUrl, link.url)}>{link.name}</NavLink>
        ))}
      </NavMenu>
    </NavMenuContainer>
  )

  const BurgerMenu = (
    <BurguerMenuContainer onClick={handleToggle}>
			<BurguerButton>
				<BurguerIcon className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></BurguerIcon>
			</BurguerButton>
		</BurguerMenuContainer>
  )

  return (
    <Nav>
      {NavTitle}
      {BurgerMenu}
      {NavLinks}
    </Nav>
  )
}

export default Navbar
