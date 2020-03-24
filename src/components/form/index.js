import React, { useState, Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { string, func, number } from 'prop-types'
import { createGameRequest, deleteGameRequest, editGameRequest } from '../../ducks/saga'
// import { addGame, deleteGame, editGame } from '../../ducks'
import { Label, Span } from './styled'

const mapDispatchToProps = ({ 
  addGame: createGameRequest, 
  deleteGame: deleteGameRequest, 
  editGame: editGameRequest
})

const text = {
  game: 'Game',
  console: 'Console',
  genre: 'Genre',
  score: 'score',
  year: 'Year',
  warning: 'Are you sure you want to erase this game from the list?'
}

const Input = ({ name, value, label, onChange }) => {
  return (
    <Label>
      <Span>{`${label}: `}</Span>      
      <input type="text" name={name} value={value} onChange={onChange} required />
    </Label>
  )
}

const Form = ({ typeOfForm, addGame, deleteGame, editGame, id, data }) => {
  const [gameName, setGameName] = useState('')
  const [consoles, setConsoles] = useState('')
  const [genre, setGenre] = useState('')
  const [score, setScore] = useState(0)
  const [year, setYear] = useState(0)
  const [appId, setAppId] = useState(null)

  const handleChange = setter => event => setter(event.target.value)
  const handleSubmit = () => {
    if (typeOfForm === 'create') {
      addGame({
        title: gameName,
        console: consoles,
        genre,
        score,
        year
      })
    } else if (typeOfForm === 'delete') {
      deleteGame({
        id: appId
      })
    } else {
      editGame({
        title: gameName,
        console: consoles,
        genre,
        score,
        year,
        id: appId
      })
    }
  }

  const createForm = (
    <Fragment>
      <Input name='game' value={gameName} label={text.game} onChange={handleChange(setGameName)} />
      <Input name='console' value={consoles} label={text.console} onChange={handleChange(setConsoles)} />
      <Input name='genre' value={genre} label={text.genre} onChange={handleChange(setGenre)} />
      <Input name='score' value={score} label={text.score} onChange={handleChange(setScore)} />
      <Input name='year' value={year} label={text.year} onChange={handleChange(setYear)} />
    </Fragment>
  )

  const deleteForm = <Fragment>{text.warning}</Fragment>

  useEffect(() => {
    if (typeOfForm === 'edit' || typeOfForm === 'delete') {
      const selectedGame = data.filter(o => o.appId === parseInt(id))[0]
      setGameName(selectedGame.title)
      setConsoles(selectedGame.console)
      setGenre(selectedGame.genre)
      setScore(selectedGame.score)
      setYear(selectedGame.year)
      setAppId(selectedGame.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editForm = 
    (
      <Fragment>
        <Input
          name='game'
          value={gameName}
          label={text.game}
          onChange={handleChange(setGameName)} 
        />
        <Input
          name='console'
          value={consoles}
          label={text.console}
          onChange={handleChange(setConsoles)} 
        />
        <Input
          name='genre'
          value={genre}
          label={text.genre}
          onChange={handleChange(setGenre)} 
        />
        <Input
          name='score'
          value={score}
          label={text.score}
          onChange={handleChange(setScore)} 
        />
        <Input
          name='year'
          value={year}
          label={text.year}
          onChange={handleChange(setYear)} 
        />
      </Fragment>
    )

  return (
    <div>
      <form 
        style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}
        onSubmit={handleSubmit}
      >
        {typeOfForm === 'create' && createForm}
        {typeOfForm === 'delete' && deleteForm}
        {typeOfForm === 'edit' && editForm}
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

Form.propTypes = {
  typeOfForm: string,
  addGame: func,
  id: number
}

Form.defaultProps = {
  typeOfForm: 'create'
}

export default connect(
  null,
  mapDispatchToProps
)(Form)
