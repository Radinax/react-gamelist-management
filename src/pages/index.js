import React, { Fragment, useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import get from 'lodash/get'
// import { fetchGames } from '../actions'
import { fetchingGames } from '../ducks/saga'
// import { fetchGames } from '../ducks'
// import Table from '../components/table'
import Modal from '../components/modal'
import Searchbar from '../components/searchbar'
import Form from '../components/form'
import ReactTable from '../components/reactTable'
import { lowerCaseFilter } from '../utils/lowerCaseFilter'

// const mapDispatchToProps = ({ fetchGames })
const mapDispatchToProps = ({ fetchGames: fetchingGames })
const mapStateToProps = state => ({
  data: state.data,
  loading: state.loading,
  error: state.error,
})

const text = {
  tableHead: ['', 'title', 'console', 'score', 'year'],
  loading: 'LOADING',
  add: 'Add',
  delete: 'Delete',
  edit: 'Edit'
}

const column = [
  {
    Header: 'Title',
    accessor: 'title'
  },
  {
    Header: 'Console',
    accessor: 'console'
  },
  {
    Header: 'Score',
    accessor: 'score'
  },
  {
    Header: 'Year',
    accessor: 'year'
  }
]

const MainPage = ({ fetchGames, loading, data }) => {
  const [tableData, setTableData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [modalIsOn, setModalIsOn] = useState(false)
  const [checkData, setCheckData] = useState({})
  const [type, setType] = useState('create')
  const { checked } = checkData

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
    <button onClick={() => onClick(modalIsOn, type)}>{text}</button>
  )
  
  useEffect(() => {
    if (isEmpty(data)) fetchGames()
    const games = get(data, 'data') || []
    // const games = data || []
    const filteredData = lowerCaseFilter(games, searchValue)
    setTableData(filteredData)
  }, [data, fetchGames, searchValue])

  useEffect(() => {
    if (checked === false) setType('create')
  }, [checked, setType])

  if (loading) return <div>{text.loading}</div>

  const dataWithId = !isEmpty(data) && data.data.map((o, i) => ({ ...o, appId: i }))

  return (
    <Fragment>
      <div>
        <Searchbar searchHandler={searchHandler} />
        {typeOfForm === 'create' && button(text.add, type)}
        {checked && button(text.edit, 'edit')}
        {checked && button(text.delete, 'delete')}
      </div>
      {/*<Table headerText={text.tableHead} bodyData={tableData} checkedHandler={checkedHandler} />*/}
      <ReactTable checkedHandler={checkedHandler} tableData={tableData} tableColumn={column} />
      <Modal showModal={modalIsOn} modalClosed={modalClosed}>
        <Form typeOfForm={typeOfForm} id={checkData.id} data={dataWithId} />
      </Modal>
    </Fragment>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)
