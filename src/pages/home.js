import React from 'react'
import { HomeContainer, HomeTitle, HomePage, HomeIntro } from './styles'

const text = {
  title: 'Welcome to my JRPG Journal!',
  intro: "In this website you'll find my favorite games, deep reviews, order of my games from best to worst, beatiful cards on click which shows the launch trailer, game opening and the scores I give it. Welcome aboard my JRPG journal!"
}

const Home = () => {
  return (
    <HomePage>
      <HomeContainer>
        <HomeTitle>{text.title}</HomeTitle>
        <HomeIntro>{text.intro}</HomeIntro>
      </HomeContainer>
    </HomePage>
  )
}

export default Home

