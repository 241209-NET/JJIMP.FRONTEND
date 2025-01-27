import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Drawer,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useProjectStore } from "../util/store/projectStore";
import { useUserStore } from "../util/store/userStore";
import { useNavigate } from "react-router";

const headCells = [
  { id: "name", label: "Project", numeric: false },
  { id: "description", label: "Description", numeric: false },
  { id: "project_manager", label: "Project Lead", numeric: false },
  { id: "user_id", label: "Users", numeric: false },
  { id: "actions", label: "Actions", numeric: false },
];

export default function ProjectTable() {
  const { projects, addProject, deleteProject, updateProject } =
    useProjectStore();
  const { users } = useUserStore();
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    project_manager: 1,
    user_id: [],
  });
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    // handle fetching data here on mount
  }, []);

  //these are the menu open and close functions
  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    projectId: number
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedProject(projectId);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedProject(null);
  };

  // Put action for project
  const handleAssignUser = (userId: number) => {
    if (selectedProject !== null) {
      const project = projects.find((p) => p.id === selectedProject);
      if (project) {
        updateProject(selectedProject, {
          user_id: [...project.user_id, userId],
        });
      }
    }
    handleCloseMenu();
  };

  //delete action
  const handleDeleteProject = () => {
    if (selectedProject !== null) {
      deleteProject(selectedProject);
    }
    handleCloseMenu();
  };

  const handleDeleteProjects = () => {
    selected.forEach((id) => deleteProject(id));
    setSelected([]);
  };

  // posting endpoint gets called here
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      ...formData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    addProject(newProject);
    setFormData({ name: "", description: "", project_manager: 1, user_id: [] });
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        + Create Project
      </Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6">Create Project</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Drawer>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar sx={{ bgcolor: alpha("#1976d2", 0.1) }}>
          <Typography sx={{ flex: "1 1 100%" }} variant="h6">
            Projects
          </Typography>
          {selected.length > 0 && (
            <Tooltip title="Delete">
              <IconButton onClick={handleDeleteProjects}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>{headCell.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {projects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project) => (
                  <TableRow key={project.id} hover>
                    <TableCell
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                      }}
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      {project.name}
                    </TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>{project.project_manager}</TableCell>
                    <TableCell>{project.user_id.join(", ")}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(event) => handleOpenMenu(event, project.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={handleCloseMenu}
                      >
                        {users.length > 0 ? (
                          users.map((user) => (
                            <MenuItem
                              key={user.id}
                              onClick={() => handleAssignUser(user.id)}
                            >
                              Assign {user.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No Users Available</MenuItem>
                        )}
                        <MenuItem onClick={handleDeleteProject}>
                          Delete Project
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={projects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) =>
            setRowsPerPage(parseInt(e.target.value, 10))
          }
        />
      </Paper>
    </>
  );
}
