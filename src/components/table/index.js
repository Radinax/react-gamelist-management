import React, { useState, useEffect } from 'react'
import { string, arrayOf, object } from 'prop-types'
import { orderObjectByKey } from '../../utils/orderObjectByKey'
import { 
  TableCell,
  CheckboxCell,
  Row,
  Checkbox,
  Header,
  TableContainer,
  HeaderCell
} from './styled.js'

const Table = ({ headerText, bodyData, checkedHandler }) => {
  const [checkedValue, setCheckedValue] = useState({ id: null, checked: false })

  const onCheck = (event) => {
    event.persist()
    setCheckedValue({ id: event.target.value, checked: !checkedValue.checked })
  }

  useEffect(() => checkedHandler(checkedValue), [checkedValue, checkedHandler])

  const checkbox = (value) => <Checkbox type='checkbox' value={value} onChange={onCheck} />

  const tableHeader = (headerText) => {
    const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1)
    const titles = headerText.map(head => (<HeaderCell key={head}>{capitalize(head)}</HeaderCell>))
    return <Header><tr>{titles}</tr></Header>
  }

  const tableBody = (bodyData) => {
    const order = ['title', 'console', 'score', 'year']
    const tableData = bodyData.map(data => {
      const orderedObject = orderObjectByKey(data, order)
      return (
        <Row key={data.id}>
          <CheckboxCell>{checkbox(data.id)}</CheckboxCell>
          {Object.keys(orderedObject).map((info) => <TableCell key={info}>{orderedObject[info]}</TableCell>)}
        </Row>
      )
    })
    return <tbody>{tableData}</tbody>
  }

  return (
    <TableContainer>
      {tableHeader(headerText)}
      {tableBody(bodyData)}
    </TableContainer>
  )
}

Table.propTypes = {
  headerText: arrayOf(string),
  bodyData: arrayOf(object)
}

export default Table;
