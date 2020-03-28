import React, { Fragment } from 'react'
import { 
  Container, Img, Description,
  ModalContainer, Title, ModalDescription
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
    <Container className='transition duration-200' onClick={() => onClick()}>
      <Img src={img} />
      <Description>{description}</Description>
    </Container>
  )
  const ModalCard = () =>{
    const card = cardTitles.map(v => (
      <Fragment key={v.title}>
        <Title>{v.title}</Title>
        <ModalDescription>{v.text}</ModalDescription>
      </Fragment>
    ))
    return (
      <ModalContainer>
        {card}
      </ModalContainer>
    )
  }

  return (
    <Fragment>
      {type === 'home' && HomeCard}
      {type === 'modal' && ModalCard()}
    </Fragment>
  )
}

export default Card
