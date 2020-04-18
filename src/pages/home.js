import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { CardContainer, HomeTitle, HomePage } from './styles'
import Card from '../components/card'
import Modal from '../components/modal'
import { GET_GAMES } from '../queries/getGames'

const text = {
  title: 'Welcome to my JRPG Journal!',
  intro: "In this website you'll find my favorite games, deep reviews, order of my games from best to worst, beatiful cards on click which shows the launch trailer, game opening and the scores I give it. Welcome aboard my JRPG journal!",
  loading: 'LOADING',
  error: 'There was an error'
}

const Home = () => {
  const [modalIsOn, setModalIsOn] = useState(false)
  const [cardModalId, setCardModalId] = useState(0)
  const { loading, error, data } = useQuery(GET_GAMES)

  if (loading) return <div>{text.loading}</div>
  if (error) return <div>{text.error}</div>
  
  const { summary, graphics, music, gameplay, conclusion } = data.allGames[cardModalId] || []

  const onClick = (bool, id) => {
    setModalIsOn(!bool)
    setCardModalId(id)
  }
  const modalClosed = (value) => setModalIsOn(value)

  const title = <HomeTitle>{text.title}</HomeTitle>

  const games = () => {
    const gameCards = data.allGames.map((info, index) => (
      <Card
        onClick={() => onClick(modalIsOn, index)}
        key={info.title}
        title={info.title}
        description={info.description}
        img={info.img}
        type='home'
      />
    ))
    return (
      <CardContainer>
        {gameCards}
      </CardContainer>
    )
  } 

  const cardModal = (
    <Modal showModal={modalIsOn} modalClosed={modalClosed}>
      <Card
        summary={summary}
        graphics={graphics}
        music={music}
        gameplay={gameplay}
        conclusion={conclusion}
        type='modal'
      />
    </Modal>
  )

  return (
    <HomePage>
      {title}
      {games()}
      {cardModal}
    </HomePage>
  )
}

export default Home
