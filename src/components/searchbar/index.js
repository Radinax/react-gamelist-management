import React, { useState, useEffect } from 'react'
import { func } from 'prop-types'
import { SearchInput } from './styled'

const Searchbar = ({ searchHandler }) => {
  const [searchField, setSearchField] = useState('')

  const onSearchChange = e => setSearchField(e.target.value)

  useEffect(() => searchHandler(searchField), [searchField, searchHandler])

  return (
    <SearchInput
      type='search'
      placeholder='Search...'
      onChange={onSearchChange} />
  
  )
}

Searchbar.propTypes = {
  searchHandler: func
}

export default Searchbar
