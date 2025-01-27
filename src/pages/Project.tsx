// import { useEffect, useState } from "react";
// import * as React from "react";
// import { alpha } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import { visuallyHidden } from "@mui/utils";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Drawer from "@mui/material/Drawer";

// interface Data {
//   id: number;
//   projectName: string;
//   projectLead: string;
//   lastUpdate: string;
//   issues: number;
// }

// function createData(
//   id: number,
//   projectName: string,
//   projectLead: string,
//   lastUpdate: string,
//   issues: number
// ) {
//   return { id, projectName, projectLead, lastUpdate, issues };
// }

// // const rows = [
// //   createData(1, "Ticketing System", "Cuong Ma", "Jan 21", 42096),
// //   createData(2, "Ticketing System", "Cuong Ma", "Jan 21", 42096),
// //   createData(3, "A Ticketing System", "Jude Hoekstra", "Jan 22", 32096),
// //   createData(4, "Z Ticketing System", "Z Z", "Dec 22", 80008),
// // ];

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = "asc" | "desc";

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string }
// ) => number {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// interface HeadCell {
//   disablePadding: boolean;
//   id: keyof Data;
//   label: string;
//   numeric: boolean;
// }

// const headCells: readonly HeadCell[] = [
//   {
//     id: "projectName",
//     numeric: false,
//     disablePadding: true,
//     label: "Project",
//   },
//   {
//     id: "projectLead",
//     numeric: false,
//     disablePadding: false,
//     label: "Project Lead",
//   },
//   {
//     id: "lastUpdate",
//     numeric: true,
//     disablePadding: false,
//     label: "Last update",
//   },
//   {
//     id: "issues",
//     numeric: true,
//     disablePadding: false,
//     label: "Issue",
//   },
// ];

// interface EnhancedTableProps {
//   numSelected: number;
//   onRequestSort: (
//     event: React.MouseEvent<unknown>,
//     property: keyof Data
//   ) => void;
//   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
// }

// function EnhancedTableHead(props: EnhancedTableProps) {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//   } = props;
//   const createSortHandler =
//     (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               "aria-label": "select all desserts",
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? "right" : "left"}
//             padding={headCell.disablePadding ? "none" : "normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }
// interface EnhancedTableToolbarProps {
//   numSelected: number;
// }
// function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
//   const { numSelected } = props;
//   return (
//     <Toolbar
//       sx={[
//         {
//           pl: { sm: 2 },
//           pr: { xs: 1, sm: 1 },
//         },
//         numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         },
//       ]}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           <b>Projects</b>
//         </Typography>
//       )}
//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }
// export default function EnhancedTable() {
//   const [order, setOrder] = React.useState<Order>("asc");
//   const [orderBy, setOrderBy] = React.useState<keyof Data>("issues");
//   const [selected, setSelected] = React.useState<readonly number[]>([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [rows, setRows] = useState<Project[]>([]);

//   useEffect(() => {
//     //1. fetch axios
//     //{ id, projectName, projectLead, lastUpdate, issues }
//     // 2. Save that data in your state
//     setRows([
//       {
//         id: 1,
//         name: "Ticketing System",
//         description: "test",
//         user_id: [1, 2],
//         project_manager: 1,
//         updated_at: "Jan 21",
//       },
//       // {id:2, projectLead :"Ticketing System", "Cuong Ma", "Jan 21", 42096},
//       // {3, "A Ticketing System", "Jude Hoekstra", "Jan 22", 32096},
//       // {4, "Z Ticketing System", "Z Z", "Dec 22", 80008},
//     ]);
//   }, []);

//   const handleRequestSort = (
//     _event: React.MouseEvent<unknown>,
//     property: keyof Data
//   ) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected: readonly number[] = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (_event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDense(event.target.checked);
//   };

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(
//     () =>
//       [...rows]
//         .sort(getComparator(order, orderBy))
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [order, orderBy, page, rowsPerPage]
//   );

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     label: "",
//   });

//   const handleSubmit = (e: any) => {
//     e.preventDefault(); // Prevents the default form submission behaviour
//     // Process and send formData to the server or perform other actions
//     console.log("Form data submitted:", formData);
//     toggleDrawer(true);
//   };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = (newOpen: boolean) => () => {
//     setOpen(newOpen);
//   };
//   //drawer stuff
//   const DrawerList = (
//     <Box
//       sx={{ width: 350 }}
//       role="presentation"
//       alignItems="center"
//       justifyContent="center"
//       display="flex"
//     >
//       <Box sx={{ width: 250 }} role="presentation" alignItems="center">
//         <h1>
//           <b> PROJECT FORM</b>
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Name"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             label="Description"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             label="Label"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="label"
//             value={formData.label}
//             onChange={handleChange}
//             required
//           />
//           <Button type="submit" variant="contained" color="primary">
//             Submit
//           </Button>
//         </form>
//       </Box>
//     </Box>
//   );
//   return (
//     <>
//       <div>
//         <Button
//           style={{ position: "absolute", right: "100px" }}
//           variant="contained"
//           onClick={toggleDrawer(true)}
//         >
//           Create Project
//         </Button>
//         <Drawer
//           anchor={"right"}
//           open={open}
//           variant="temporary"
//           onClose={(_, reason) => reason === "backdropClick" && setOpen(false)}
//         >
//           {DrawerList}
//         </Drawer>
//       </div>
//       <Box sx={{ width: "100%" }}>
//         <Paper sx={{ width: "100%", mb: 2 }}>
//           <EnhancedTableToolbar numSelected={selected.length} />
//           <TableContainer>
//             <Table
//               sx={{ minWidth: 750 }}
//               aria-labelledby="tableTitle"
//               size={dense ? "small" : "medium"}
//             >
//               <EnhancedTableHead
//                 numSelected={selected.length}
//                 order={order}
//                 orderBy={orderBy}
//                 onSelectAllClick={handleSelectAllClick}
//                 onRequestSort={handleRequestSort}
//                 rowCount={rows.length}
//               />
//               <TableBody>
//                 {visibleRows.map((row, index) => {
//                   const isItemSelected = selected.includes(row.id);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow
//                       hover
//                       onClick={(event) => handleClick(event, row.id)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.id}
//                       selected={isItemSelected}
//                       sx={{ cursor: "pointer" }}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           color="primary"
//                           checked={isItemSelected}
//                           inputProps={{
//                             "aria-labelledby": labelId,
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell
//                         component="th"
//                         id={labelId}
//                         scope="row"
//                         padding="none"
//                       >
//                         {row.projectName}
//                       </TableCell>
//                       <TableCell align="right">{row.projectLead}</TableCell>
//                       <TableCell align="right">{row.lastUpdate}</TableCell>
//                       <TableCell align="right">{row.issues}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//                 {emptyRows > 0 && (
//                   <TableRow
//                     style={{
//                       height: (dense ? 33 : 53) * emptyRows,
//                     }}
//                   >
//                     <TableCell colSpan={6} />
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//         <FormControlLabel
//           control={<Switch checked={dense} onChange={handleChangeDense} />}
//           label="Dense padding"
//         />
//       </Box>
//     </>
//   );
// }
