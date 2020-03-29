import React, { useState, Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { string, func, number } from 'prop-types'
import { createGameRequest, deleteGameRequest, editGameRequest } from '../../ducks/saga'
// import { addGame, deleteGame, editGame } from '../../ducks'
import { Label, Span, FormContainer } from './styled'

const mapDispatchToProps = ({ 
  addGame: createGameRequest, 
  deleteGame: deleteGameRequest, 
  editGame: editGameRequest
})

const text = {
  game: 'Game',
  console: 'Console',
  genre: 'Genre',
  score: 'Score',
  year: 'Year',
  warning: 'Are you sure you want to erase this game from the list?',
  description: 'Description',
  summary: 'Summary',
  graphics: 'Graphics',
  music: 'Music',
  conclusion: 'Conclusion'
}

const listOfConsoles = ['PC', 'PSX', 'PS2', 'PS3', 'PS4', 'SNES', 'N64', 'GameCube', 'Wii', 'Wii U', 'Switch', 'GBA', 'DS', '3DS', 'PSP', 'Vita']
const listOfGenre = ['JRPG', 'SRPG', 'RPG', 'ARPG', 'Open World', 'Metroidvania', 'Action', 'FPS']

const Input = ({ name, value, label, onChange, type }) => {
  const inputType = type => {
    if(type === 'textarea') return 'textarea'
    return 'text'
  }
  const maxNumber = type => {
    if(type === 'year') return '4'
    if(type === 'score') return '2'
    return '100'
  }
  const minNumber = type => {
    if(type === 'year') return '4'
    if(type === 'score') return '1'
    return '0'
  }
  return (
    <Label>
      <Span>{`${label}: `}</Span>      
      <input
        type={inputType(type)}
        minLength={minNumber(type)}
        maxLength={maxNumber(type)}
        name={name} value={value}
        onChange={onChange}
        required
      />
    </Label>
  )
}

const Select = ({ name, value, label, onChange, values }) => {
  return (
    <Label>
      <Span>{`${label}: `}</Span>      
      <select name={name} value={value} onChange={onChange} required>
        {values.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </Label>
  )
}

const Form = ({ typeOfForm, addGame, deleteGame, editGame, id, data }) => {
  const [gameName, setGameName] = useState('')
  const [consoles, setConsoles] = useState('')
  const [genre, setGenre] = useState('')
  const [score, setScore] = useState('')
  const [year, setYear] = useState('')
  const [description, setDescription] = useState('')
  const [summary, setSummary] = useState('')
  const [graphics, setGraphics] = useState('')
  const [music, setMusic] = useState('')
  const [gameplay, setGameplay] = useState('')
  const [conclusion, setConclusion] = useState('')
  const [appId, setAppId] = useState(null)

  const handleChange = setter => event => setter(event.target.value)
  const handleSubmit = () => {
    if (typeOfForm === 'create') {
      addGame({
        title: gameName,
        console: consoles,
        genre,
        score,
        year,
        description,
        summary,
        graphics,
        music,
        gameplay,
        conclusion
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
      <Select name='console'
        value={consoles}
        label={text.console}
        values={listOfConsoles}
        onChange={handleChange(setConsoles)} />
      <Select name='genre'
        value={genre}
        label={text.genre}
        values={listOfGenre}
        onChange={handleChange(setGenre)} />
      <Input name='score' value={score} type='score' label={text.score} onChange={handleChange(setScore)} />
      <Input name='year' value={year} type='year' label={text.year} onChange={handleChange(setYear)} />
      <Input name='description' type="textarea" value={description} label={text.description} onChange={handleChange(setDescription)} />
      <Input name='summary' type="textarea" value={summary} label={text.summary} onChange={handleChange(setSummary)} />
      <Input name='graphics' type="textarea" value={graphics} label={text.graphics} onChange={handleChange(setGraphics)} />
      <Input name='music' type="textarea" value={music} label={text.music} onChange={handleChange(setMusic)} />
      <Input name='gameplay' type="textarea" value={gameplay} label={text.gameplay} onChange={handleChange(setGameplay)} />
      <Input name='conclusion' type="textarea" value={conclusion} label={text.conclusion} onChange={handleChange(setConclusion)} />
      
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
      setDescription(selectedGame.description)
      setSummary(selectedGame.summary)
      setGraphics(selectedGame.graphics)
      setMusic(selectedGame.music)
      setGameplay(selectedGame.gameplay)
      setConclusion(selectedGame.conclusion)
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
        <Input
          name='description'
          value={description}
          label={text.description}
          onChange={handleChange(setDescription)} 
        />
        <Input
          name='summary'
          value={summary}
          label={text.summary}
          onChange={handleChange(setSummary)} 
        />
        <Input
          name='graphics'
          value={graphics}
          label={text.graphics}
          onChange={handleChange(setGraphics)} 
        />
        <Input
          name='gameplay'
          value={gameplay}
          label={text.gameplay}
          onChange={handleChange(setGameplay)} 
        />
        <Input
          name='music'
          value={music}
          label={text.music}
          onChange={handleChange(setMusic)} 
        />
        <Input
          name='conclusion'
          value={conclusion}
          label={text.conclusion}
          onChange={handleChange(setConclusion)} 
        />
      </Fragment>
    )

  return (
    <FormContainer>
      <form 
        style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}
        onSubmit={handleSubmit}
      >
        {typeOfForm === 'create' && createForm}
        {typeOfForm === 'delete' && deleteForm}
        {typeOfForm === 'edit' && editForm}
        <input type="submit" value="submit" />
      </form>
    </FormContainer>
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
