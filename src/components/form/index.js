import React, { useState, Fragment, useEffect } from 'react'
import { string, func, number } from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { Label, Span, FormContainer } from './styled'
import {
  inputType,
  maxNumber,
  minNumber,
  text,
  listOfConsoles,
  listOfGenre
} from './utils'
import { CREATE_GAME } from '../../queries/createGame'
import { GET_GAMES } from '../../queries/getGames'
import { UPDATE_GAME } from '../../queries/updateGame'
import { DELETE_GAME } from '../../queries/deleteGame'

const Input = (name, value, label, onChange, type) => {
  const textArea = (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required
      style={{ width: '174px' }}
    />
  )
  const input = (
    <input
      type={inputType(type)}
      minLength={minNumber(type)}
      maxLength={maxNumber(type)}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  )
  return (
    <Label>
      <Span>{`${label}: `}</Span>
      {inputType(type) === 'textarea' ? textArea : input} 
    </Label>
  )
}

const Select = (name, value, label, onChange, values) => {
  return (
    <Label>
      <Span>{`${label}: `}</Span>      
      <select name={name} value={value} onChange={onChange} required>
        {values.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </Label>
  )
}

const Form = ({ typeOfForm, id, data }) => {
  const [gameName, setGameName] = useState('')
  const [consoles, setConsoles] = useState(listOfConsoles[0])
  const [genre, setGenre] = useState(listOfGenre[0])
  const [score, setScore] = useState('')
  const [year, setYear] = useState('')
  const [description, setDescription] = useState('')
  const [summary, setSummary] = useState('')
  const [graphics, setGraphics] = useState('')
  const [music, setMusic] = useState('')
  const [img, setImg] = useState('')
  const [gameplay, setGameplay] = useState('')
  const [conclusion, setConclusion] = useState('')
  const [appId, setAppId] = useState(null)
  const [createGame] = useMutation(CREATE_GAME, {
    refetchQueries: [ { query: GET_GAMES } ]
  })
  const [editGame] = useMutation(UPDATE_GAME, {
    refetchQueries: [ { query: GET_GAMES } ]
  })
  const [removeGame] = useMutation(DELETE_GAME, {
    refetchQueries: [ { query: GET_GAMES } ]
  })

  const handleChange = setter => event => setter(event.target.value)
  const handleSubmit = () => {
    if (typeOfForm === 'create') {
      const info = {
        id: 14,
        title: gameName,
        console: consoles,
        genre,
        score,
        year,
        description,
        summary,
        graphics,
        music,
        img,
        gameplay,
        conclusion
      }
      createGame({ variables: info })
    } else if (typeOfForm === 'delete') {
      removeGame({ variables: { id: parseInt(appId) }})
    } else {
      editGame({ 
        variables:{
          title: gameName,
          console: consoles,
          genre,
          score,
          year,
          description,
          summary,
          graphics,
          music,
          img,
          gameplay,
          conclusion,
          id: appId
        }
      })
    }
  }

  const createForm = (
    <Fragment>
      {Input('game', gameName, text.game, handleChange(setGameName))}
      {Select('console', consoles, text.console, handleChange(setConsoles), listOfConsoles)}
      {Select('genre', genre, text.genre, handleChange(setGenre), listOfGenre)}
      {Input('score', score, text.score, handleChange(setScore), 'score')}
      {Input('year', year, text.year, handleChange(setYear), 'year')}
      {Input('description', description, text.description, handleChange(setDescription), 'textarea')}
      {Input('summary', summary, text.summary, handleChange(setSummary), 'textarea')}
      {Input('graphics', graphics, text.graphics, handleChange(setGraphics), 'textarea')}
      {Input('music', music, text.music, handleChange(setMusic), 'textarea')}
      {Input('gameplay', gameplay, text.gameplay, handleChange(setGameplay), 'textarea')}
      {Input('img', img, text.img, handleChange(setImg), 'textarea')}
      {Input('conclusion', conclusion, text.conclusion, handleChange(setConclusion), 'textarea')}
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
      setImg(selectedGame.img)
      setConclusion(selectedGame.conclusion)
      setAppId(selectedGame.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editForm = 
    (
      <Fragment>
        {Input('game', gameName, text.game, handleChange(setGameName))}
        {Select('console', consoles, text.console, handleChange(setConsoles), listOfConsoles)}
        {Select('genre', genre, text.genre, handleChange(setGenre), listOfGenre)}
        {Input('score', score, text.score, handleChange(setScore), 'score')}
        {Input('year', year, text.year, handleChange(setYear), 'year')}
        {Input('description', description, text.description, handleChange(setDescription), 'textarea')}
        {Input('summary', summary, text.summary, handleChange(setSummary), 'textarea')}
        {Input('graphics', graphics, text.graphics, handleChange(setGraphics), 'textarea')}
        {Input('music', music, text.music, handleChange(setMusic), 'textarea')}
        {Input('gameplay', gameplay, text.gameplay, handleChange(setGameplay), 'textarea')}
        {Input('img', img, text.img, handleChange(setImg), 'textarea')}
        {Input('conclusion', conclusion, text.conclusion, handleChange(setConclusion), 'textarea')}
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

export default Form
