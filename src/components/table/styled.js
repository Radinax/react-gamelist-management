import styled from 'styled-components';
import tw from 'tailwind.macro';

export const TableCell = styled.td`${tw`px-4 py-2 text-xl text-center h-12`}`

export const Checkbox = styled.input`${tw`hover:cursor-pointer`}`

export const CheckboxCell = styled.td`${tw`px-1 text-center h-12`}}`

export const Row = styled.tr`${tw`hover:bg-gray-100`}`

export const Header = styled.thead`${tw`bg-lightBlack text-white`}`

export const HeaderCell = styled.th`${tw`h-12`}`

export const TableContainer = styled.table`${tw`text-xl`}
  font-family: OpenSans-Regular bg-white;
`
