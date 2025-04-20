interface CommonTableInterface {
  columns?: any;
  rows?: any;
  handleChangeRowsPerPage?: any;
  rowsPerPage?: any;
  totalPages?: any;
  currentPage?: any;
  handlePageChange?: any;
  setConfirmModalOpen?: any;
  setIsVisible?: any;
  handleCloseModal?: any;
  totalRecords?: any;
  page?: any;
  setPage?: any;
  visibleColumns?: any;
  paginationState?: any;
  currentPaginationState?: any;
  previousPageHandler?: any;
  nextPageHandler?: any;
  routeType?: any;
  isStatePagination?:boolean;
  action?:any;
  checkBoxes?:any;
  loading?:boolean;
  noPagination?:boolean;
  cellContent?:any;
  handleGotoPageChange?:any;
  handleKeyPress?:any;
  filtersData?:any;
  handleChangePage?:any;
  pageNumber?:any;
  isSelectionEnabled?: boolean;
  selectedRows?: Set<number>; // To keep the track of selected rows
  handleRowSelection?: (rowId: number) => void; // Function to toggle row selection
  handleSelectAll?: (rows: any[]) => void; // Function to select/deselect all
}


export default CommonTableInterface;