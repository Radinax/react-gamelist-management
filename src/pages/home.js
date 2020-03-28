import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import { CardContainer, HomeTitle, HomePage } from './styles'
import Card from '../components/card'
import Modal from '../components/modal'
// Actions
import { fetchGames } from '../ducks/createAsyncThunk'

const mapDispatchToProps = ({ fetchGames })
const mapStateToProps = state => ({
  data: state.data,
  loading: state.loading
})

const text = {
  title: 'Welcome to my JRPG Journal!',
  intro: "In this website you'll find my favorite games, deep reviews, order of my games from best to worst, beatiful cards on click which shows the launch trailer, game opening and the scores I give it. Welcome aboard my JRPG journal!",
  loading: 'LOADING'
}

const Home = ({ fetchGames, loading, data }) => {
  const [modalIsOn, setModalIsOn] = useState(false)
  const [cardModalId, setCardModalId] = useState(0)
  const [gamesData, setGamesData] = useState([])
  const { summary, graphics, music, gameplay, conclusion } = data[cardModalId] || []

  useEffect(() => {
    if (isEmpty(data)) fetchGames()
    const games = data || []
    setGamesData(games)
  }, [data, fetchGames])

  const onClick = (bool, id) => {
    setModalIsOn(!bool)
    setCardModalId(id)
  }
  const modalClosed = (value) => setModalIsOn(value)

  const title = <HomeTitle>{text.title}</HomeTitle>

  const games = () => {
    const gameCards = gamesData.map((info, index) => (
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

  if (loading) return <div>{text.loading}</div>

  return (
    <HomePage>
      {title}
      {games()}
      {cardModal}
    </HomePage>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

