import React, { useState, useEffect } from 'react'
import { func } from 'prop-types'
import { Input } from './styles'

const Searchbar = ({ searchHandler }) => {
  const [searchField, setSearchField] = useState('')

  const onSearchChange = e => setSearchField(e.target.value)

  useEffect(() => searchHandler(searchField), [searchField, searchHandler])

  return <Input type='search' placeholder='Search...' onChange={onSearchChange} />
}

Searchbar.propTypes = {
  searchHandler: func
}

export default Searchbar
