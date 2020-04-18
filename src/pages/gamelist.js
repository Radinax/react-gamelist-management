// Libraries
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
// Components
import Modal from '../components/modal'
import Searchbar from '../components/searchbar'
import Form from '../components/form'
import ReactTable from '../components/reactTable'
// Utilities
import isEmpty from 'lodash/isEmpty'
import { lowerCaseFilter } from '../utils/lowerCaseFilter'
import { text, column } from './utils'
// Styles
import { MainContainer, ToolbarContainer, Button, Page } from './styles'
import { TABLE_DATA } from '../queries/getTableData'

const Gamelist = () => {
  const [tableData, setTableData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [modalIsOn, setModalIsOn] = useState(false)
  const [checkData, setCheckData] = useState({})
  const [type, setType] = useState('create')
  const { checked } = checkData
  const { loading, error, data } = useQuery(TABLE_DATA)
  const dataWithId = tableData.map((o, i) => ({ ...o, appId: i }))

  useEffect(() => {
    const { allGames } = data || []
    if(!isEmpty(allGames)) setTableData(lowerCaseFilter(allGames, searchValue))
  }, [data, searchValue])

  useEffect(() => {
    if (checked === false) setType('create')
  }, [checked])
  
  if (loading) return <div>{text.loading}</div>
  if (error) return <div>{text.error}</div>

  const searchHandler = (value) => setSearchValue(value)
  const checkedHandler = (value) => setCheckData(value)
  const showModal = (value) => setModalIsOn(!value)
  const modalClosed = (value) => setModalIsOn(value)

  const selectForm = (type, isCheck) => {
    if (isCheck && type === 'delete') return 'delete'
    if (isCheck && type === 'edit') return 'edit'
    if (!isCheck && type === 'create') return 'create'
  }
  const onClick = (isModalOn, type) => {
    showModal(isModalOn)
    setType(type)
  }

  const typeOfForm = selectForm(type, checkData.checked)

  const button = (text, type) => (
    <Button onClick={() => onClick(modalIsOn, type)}>{text}</Button>
  )

  const Table = (
    <ReactTable checkedHandler={checkedHandler} tableData={tableData} tableColumn={column} />
  )

  const Toolbar = (
    <ToolbarContainer>
      <Searchbar searchHandler={searchHandler} />
      {typeOfForm === 'create' && button(text.add, type)}
      {checked && button(text.edit, 'edit')}
      {checked && button(text.delete, 'delete')}
    </ToolbarContainer>
  )

  const FormModal = (
    <Modal showModal={modalIsOn} modalClosed={modalClosed}>
      <Form typeOfForm={typeOfForm} id={checkData.id} data={dataWithId} />
    </Modal>
  )

  return (
    <Page>
      <MainContainer>
        {Toolbar}      
        {Table}
      </MainContainer>
      {FormModal}
    </Page>
  )
}

export default Gamelist
