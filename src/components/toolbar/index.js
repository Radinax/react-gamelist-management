import React, { Fragment } from 'react'
import SearchBar from '../searchbar'
import { Button } from './styles'

const Toolbar = () => {
  return (
    <Fragment>    
      <SearchBar />
      <Button>ADD</Button>
    </Fragment>
  )
}

export default Toolbar
