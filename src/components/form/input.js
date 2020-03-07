import React from 'react'

const Input = ({ name, value, label, onChange }) => {
  console.log('value', value)
  return (
    <label>
      {`${label}: `}      
      <input type="text" name={name} value={value} onChange={onChange} required />
    </label>
  )
}

export default Input
