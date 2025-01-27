import React, {useState} from 'react';
//import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';




function createData(
  projectName: string,
  projectLead: string,
  lastUpdate: string,
  issues: number,
) {
  return { projectName, projectLead, lastUpdate, issues};
}

const rows = [
  createData('Ticketing System', 'Cuong Ma', 'Jan 21', 42096),
  createData('Ticketing System', 'Cuong Ma', 'Jan 21', 42096)
];

export default function Project() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    label: '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevents the default form submission behaviour
    // Process and send formData to the server or perform other actions
    console.log('Form data submitted:', formData);
    toggleDrawer(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" alignItems="center" justifyContent="center" display="flex">
      <Box sx={{ width: 250 }} role="presentation" alignItems="center">
      <h1><b> PROJECT FORM</b></h1>
      <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <TextField
        label="Label"
        variant="outlined"
        fullWidth
        margin="normal"
        name="label"
        value={formData.label}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
      Submit
      </Button>
    </form>
    </Box>
    </Box>
  );

  return (
    <><h1 style={{ position: "absolute", left: "100px" }}><b>Projects</b></h1>
     <div>
      <Button style={{ position: "absolute", right: "100px" }} variant="contained" onClick={toggleDrawer(true)}>Create Project</Button>
      <Drawer anchor={"right"} open={open} variant="temporary"
  onClose={(_, reason) =>
    reason === 'backdropClick' && setOpen(false)
  }>
        
        {DrawerList}
      </Drawer>
    </div>
    <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="70vh"
>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell align="right">Project Lead</TableCell>
            <TableCell align="right">Last Issue Update</TableCell>
            <TableCell align="right">Issues</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.projectName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.projectName}
              </TableCell>
              <TableCell align="right">{row.projectLead}</TableCell>
              <TableCell align="right">{row.lastUpdate}</TableCell>
              <TableCell align="right">{row.issues}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box></>
  );
}