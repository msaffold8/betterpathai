import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Stack,
} from "@mui/material";
import { Scrollbar } from "../../../components/scrollbar";
import CourseModuleDialog from "./course-module-dialog";
import { useDialog } from "../../../hooks/use-dialog";

export const CourseModules = ({ onModuleCreated, onModuleUpdated, modules = [], ...other }) => {
  const createDialog = useDialog();
  const updateDialog = useDialog();

  const handleModuleCreated = (module) => {
    createDialog.handleClose();
    onModuleCreated?.(module);
  };

  const handleModuleUpdated = (module) => {
    updateDialog.handleClose();
    onModuleUpdated?.(module);
  };

  const hasModules = modules.length > 0;

  const updatingModule = updateDialog.open
    ? modules.find((module) => module.id === updateDialog.data)
    : undefined;

  return (
    <>
      <Card {...other}>
        <CardHeader
          action={
            <Button color="inherit" onClick={() => createDialog.handleOpen()}>
              Add Module
            </Button>
          }
          title="Course Modules"
        />
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Module Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell>
                    <Typography variant="body2">{module.name}</Typography>
                  </TableCell>
                  <TableCell>{module.type}</TableCell>
                  <TableCell>{format(module.createdAt, "MMM dd yyyy")}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button onClick={() => updateDialog.handleOpen(module.id)}>Edit</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>
      <CourseModuleDialog
        action="create"
        onClose={createDialog.handleClose}
        onModuleCreated={handleModuleCreated}
        open={createDialog.open}
      />
      <CourseModuleDialog
        action="update"
        onClose={updateDialog.handleClose}
        onModuleUpdated={handleModuleUpdated}
        open={updateDialog.open}
        module={updatingModule}
      />
    </>
  );
};

CourseModules.propTypes = {
  onModuleCreated: PropTypes.func,
  onModuleUpdated: PropTypes.func,
  modules: PropTypes.array.isRequired,
};

export default CourseModules;
