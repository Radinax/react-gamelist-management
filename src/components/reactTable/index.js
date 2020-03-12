import React, { forwardRef, useRef, useEffect } from 'react'
import { useTable, useRowSelect } from 'react-table'
import isEmpty from 'lodash/isEmpty'
import { TableContainer } from './styles'

const Checkbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />
  }
)

const Table = ({ columns, data, checkedHandler }) => {
  const initial = { id: null, checked: false }
  
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
  } = useTable(
    { columns, data},
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => <Checkbox {...getToggleAllRowsSelectedProps()} />,
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ])
    }
  )

  useEffect(() => {
    const callbackValue = isEmpty(selectedRowIds)
      ? initial 
      : Object.keys(selectedRowIds).map(v => ({ id: Number(v), checked: selectedRowIds[v]}))[0]
    checkedHandler(callbackValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowIds])

  const tableHead = (
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => <th {...column.getHeaderProps()}>{column.render('Header')}</th>
          )}
        </tr>
      ))}
    </thead>
  )

  const tableBody = (
    <tbody {...getTableBodyProps()}>
      {rows.slice(0, 10).map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
          </tr>
        )
      })}
    </tbody>
  )

  return (
    <table {...getTableProps()}>
      {tableHead}
      {tableBody}
    </table>
  )
}

const ReactTable = ({ tableData, tableColumn, checkedHandler }) => {
  const data = React.useMemo(() => tableData, [tableData])
  const column = React.useMemo(() => tableColumn, [tableColumn])

  return (
    <TableContainer>
      <Table checkedHandler={checkedHandler} columns={column} data={data} />
    </TableContainer>
  )
}

export default ReactTable
