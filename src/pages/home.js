import React, { useState } from 'react'
import { CardContainer, HomeTitle, HomePage } from './styles'
import Card from '../components/card'
import Modal from '../components/modal'

const text = {
  title: 'Welcome to my JRPG Journal!',
  intro: "In this website you'll find my favorite games, deep reviews, order of my games from best to worst, beatiful cards on click which shows the launch trailer, game opening and the scores I give it. Welcome aboard my JRPG journal!"
}

const gameInfoTest = {
  card: [
    { 
      title: 'Final Fantasy XII',
      description: 'Set in Ivalice, help Princess Ashe restore her Kingdom from the brutal invasion of The Empire! Go in a journey with Vaan, Penelo, Balthier, Fran and Basch in a unique world and battle system!',
      img: 'https://as.com/meristation/imagenes/2019/05/08/analisis/1557269210_717414_1557486694_noticia_normal.jpg',
      summary: 'Great game',
      graphics: 'Nice graphics',
      music: 'Nice music',
      gameplay: 'Nice gameplay',
      conclusion: 'Its a nice game'
    },
    { 
      title: 'Legend of Heroes: Trails of Cold Steel 3',
      description: 'Join Rean once again in his journey to restore the freedom of Erebonia! Mechas, modern turn-based battle system and one of the best stories ever told in JRPG history!',
      img: 'https://www.gamecored.com/wp-content/uploads/2019/10/The-Legend-of-Heroes-Trails-of-Cold-Steel-III-fee-1620x800.jpg',
      summary: 'Great game',
      graphics: 'Nice graphics',
      music: 'Nice music',
      gameplay: 'Nice gameplay',
      conclusion: 'Its a nice game'
    },
    { 
      title: 'SaGa Scarlet Grace Ambition',
      description: 'Join four heroes in their own personal quests while they solve the misteries behind the chaos going on in their region. Experiment the most unique battle system ever!',
      img: 'https://i1.wp.com/pivigames.blog/wp-content/uploads/2020/01/SaGa-SCARLET-GRACE-AMBITIONS-Free-Download-min.jpg?fit=670%2C384&ssl=1',
      summary: 'Great game',
      graphics: 'Nice graphics',
      music: 'Nice music',
      gameplay: 'Nice gameplay',
      conclusion: 'Its a nice game'
    },
    { 
      title: 'Romancing SaGa 3',
      description: 'Experience the remaster of one of the best SaGa games! Complex battles, tons of characters to play and inmense replay value! Every decision you make shapes your story',
      img: 'https://www.gamersrd.com/wp-content/uploads/2019/09/Romancing-SaGa-3-Square-Enix-GamersRD.jpg',
      summary: 'Great game',
      graphics: 'Nice graphics',
      music: 'Nice music',
      gameplay: 'Nice gameplay',
      conclusion: 'Its a nice game'
    },
    { 
      title: 'Tales of Vesperia',
      description: 'Join a hero who is not afraid to do what needs to be done! A Tales game like no other in a journey in pursuit of their dreams and struggles while they fight to defend their kingdom',
      img: 'https://media.egamers.com/wp-content/uploads/2019/01/18212541/EGAMERS-TALES-OF-VESPERIA-AN%C3%81LISIS-1024x576.jpg',
      summary: 'Great game',
      graphics: 'Nice graphics',
      music: 'Nice music',
      gameplay: 'Nice gameplay',
      conclusion: 'Its a nice game'
    }
  ]
}

const Home = () => {
  const [modalIsOn, setModalIsOn] = useState(false)
  const [cardModalId, setCardModalId] = useState(0)
  const { summary, graphics, music, gameplay, conclusion } = gameInfoTest.card[cardModalId]

  const onClick = (bool, id) => {
    console.log('hi')
    setModalIsOn(!bool)
    setCardModalId(id)
  }
  const modalClosed = (value) => setModalIsOn(value)
  console.log('modal', modalIsOn)

  const title = <HomeTitle>{text.title}</HomeTitle>

  const games = () => {
    const gameCards = gameInfoTest.card.map((info, index) => (
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

