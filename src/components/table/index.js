import React, { Fragment, useState, useEffect } from 'react'
import { string, arrayOf, object } from 'prop-types'
import { orderObjectByKey } from '../../utils/orderObjectByKey'

const Table = ({ headerText, bodyData, checkedHandler }) => {
  const [checkedValue, setCheckedValue] = useState({ id: null, checked: false })

  const onCheck = (event) => {
    event.persist()
    setCheckedValue({ id: event.target.value, checked: !checkedValue.checked })
  }

  useEffect(() => checkedHandler(checkedValue), [checkedValue, checkedHandler])

  const checkbox = (value) => <input type='checkbox' value={value} onChange={onCheck} />

  const tableHeader = (headerText) => {
    const titles = headerText.map(head => (<th key={head}>{head}</th>))
    return <thead><tr>{titles}</tr></thead>
  }

  const tableBody = (bodyData) => {
    const order = ['title', 'console', 'score', 'year']
    const tableData = bodyData.map(data => {
      const orderedObject = orderObjectByKey(data, order)
      return (
        <tr key={data.id}>
          <td>{checkbox(data.id)}</td>
          {Object.keys(orderedObject).map((info) => <td key={info}>{orderedObject[info]}</td>)}
        </tr>
      )
    })
    return <tbody>{tableData}</tbody>
  }

  return (
    <Fragment>
      <table>
        {tableHeader(headerText)}
        {tableBody(bodyData)}
      </table>
    </Fragment>
  )
}

Table.propTypes = {
  headerText: arrayOf(string),
  bodyData: arrayOf(object)
}

export default Table;
