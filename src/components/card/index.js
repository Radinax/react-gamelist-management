import React from 'react'
import { Container, Img, Description } from './styles'

const Card = ({ img, description }) => {
  return (
    <Container className='transition duration-200'>
      <Img src={img} />
      <Description>{description}</Description>
    </Container>
  )
}

export default Card
