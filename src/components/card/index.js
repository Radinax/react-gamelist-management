import React, { Fragment } from 'react'
import { 
  Container, Img, Description,
  Title
} from './styles'

const Card = ({ img, description, type, summary, graphics, gameplay, conclusion, music, onClick }) => {
  const cardTitles = [
    { title: 'summary', text: summary },
    { title: 'graphics', text: graphics },
    { title: 'gameplay', text: gameplay },
    { title: 'music', text: music },
    { title: 'conclusion', text: conclusion }
  ]
  const HomeCard = (
    <Fragment>
      <Img src={img} />
      <Description>{description}</Description>
    </Fragment>
  )
  const ModalCard = () =>{
    const card = cardTitles.map(v => (
      <Fragment key={v.title}>
        <Title>{v.title}</Title>
        <Description>{v.text}</Description>
      </Fragment>
    ))
    return card
  }

  return (
    <Container className='transition duration-200' onClick={() => onClick()}>
      {type === 'home' && HomeCard}
      {type === 'modal' && ModalCard()}
    </Container>
  )
}

export default Card
