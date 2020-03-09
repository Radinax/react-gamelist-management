import React from 'react'
import styled from 'styled-components'
import tw from 'tailwind.macro'

const Label = styled.label`${tw`flex py-4 justify-between`}`
const InputCell = styled.input`${tw`flex justify-between`}`
const Span = styled.span`${tw`pr-8`}`

const Input = ({ name, value, label, onChange }) => {
  return (
    <Label>
      <Span>{`${label}: `}</Span>      
      <InputCell type="text" name={name} value={value} onChange={onChange} required />
    </Label>
  )
}

export default Input
