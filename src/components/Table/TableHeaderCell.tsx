import { isSortable } from 'src/utils/helper';
import { headerCellStyle } from 'src/utils/helper';
import {
  StyledTableCell,
  StyledTableSortLabel
} from '../StyledComponents/Table';
import { visuallyHidden } from '@mui/utils';

// const TableHeaderCell = ({ column, orderBy, order, handleRequestSort }) => {

//   return (
//     <>
//       <StyledTableCell
//         key={column.id}
//         align={column.align}
//         sortDirection={orderBy === column.id ? order : false}
//         style={{
//           // ...headerCellStyle,
//           width: column.width,
//           minWidth: column.width,
//           position: 'relative',
//           whiteSpace: 'nowrap'
//         }}
//       >
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: '100%'
//           }}
//         >
//           {/* <span
//             style={{
//               cursor: 'pointer',
//               position: 'absolute',
//               top: 8,
//               right: 8,
//               marginBottom: '4px'
//             }}
//           >
//             {column.icon}
//           </span> */}
//           {isSortable(column.id) ? (
//             <StyledTableSortLabel
//               hideSortIcon={true} // Hide sort icon for all columns
//               active={orderBy === column.id}
//               direction={orderBy === column.id ? order : 'asc'}
//               onClick={(event) => handleRequestSort(event, column.id)}
//             >
//               {column.label}
//               {orderBy === column.id && (
//                 <span style={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </span>
//               )}
//             </StyledTableSortLabel>
//           ) : (
//             column.label
//           )}
//           <div
//             style={{
//               fontSize: '10px',
//               visibility: column.obisCode ? 'visible' : 'hidden',
//               height: '14px' // Adjust this value as needed
//             }}
//           >
//             {column.obisCode || '\u00A0'}{' '}
//             {/* Use non-breaking space if no OBIS code */}
//           </div>
//         </div>
//       </StyledTableCell>
//     </>
//   );
// };
const TableHeaderCell = ({ column }) => {
  return (
    <StyledTableCell
      key={column.id}
      align={column.align}
      style={{
        width: column.width,
        minWidth: column.width,
        position: 'relative',
        whiteSpace: 'nowrap'
      }}
 
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          // border: "1px solid"
        }}
      >
        {/* Render the column label without any sorting functionality */}
        <span>{column.label}</span>

        {/* <div
          style={{
            fontSize: '10px',
            visibility: column.obisCode ? 'visible' : 'hidden',
            height: '14px' // Adjust this value as needed
          }}
        >
         {column.obisCode || '\u00A0'}{' '}
        </div> */}
      </div>
    </StyledTableCell>
  );
};

export default TableHeaderCell;
