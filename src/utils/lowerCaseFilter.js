export const lowerCaseFilter = (data, valueToFilter) => data.filter(list => list.title
  .toLowerCase()
  .includes(valueToFilter.toLowerCase())
)