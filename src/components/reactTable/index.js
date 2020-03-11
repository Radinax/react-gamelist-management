import React, { forwardRef, useRef, useEffect, useState } from 'react'
import { useTable, useRowSelect } from 'react-table'
import { Styles } from './styles'

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, onChange, value, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef
    const defaultValue = value || []

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    console.log('value', value)

    return (
      <>
        <input type="checkbox" value={value} onChange={onChange} ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const Table = ({ columns, data, checkedHandler }) => {
  const [checkedValue, setCheckedValue] = useState({ id: null, checked: false })
  const onCheck = (event) => {
    event.persist()
    console.log('oncheck', event)
    setCheckedValue({ id: event.target.value, checked: !checkedValue.checked })
  }
  useEffect(() => checkedHandler(checkedValue), [checkedValue, checkedHandler])
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data,},
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox onChange={onCheck} {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox 
                onChange={onCheck}
                value={row.isSelected ? row.original.id : 'null'}
                {...row.getToggleRowSelectedProps()} 
              />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )
  console.log('row', rows)

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

const ReactTable = ({ tableData, tableColumn, checkedHandler }) => {
  const data = React.useMemo(() => tableData, [tableData])
  const column = React.useMemo(() => tableColumn, [tableColumn])

  return (
    <Styles>
      <Table checkedHandler={checkedHandler} columns={column} data={data} />
    </Styles>
  )
}

export default ReactTable
