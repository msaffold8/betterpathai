// course-modules-table.js
import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  SvgIcon,
} from "@mui/material";
// import EditIcon from "@heroicons/react/24/outline/EditIcon";
import { Scrollbar } from "../../../components/scrollbar";

const CourseModuleRow = ({ module }) => {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="body2">{module.name}</Typography>
      </TableCell>
      <TableCell>{module.type}</TableCell>
      <TableCell>{module.description}</TableCell>
      <TableCell>
        <Button
          startIcon={<SvgIcon fontSize="small">{/* <EditIcon /> */}</SvgIcon>}
          variant="contained"
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

CourseModuleRow.propTypes = {
  module: PropTypes.object.isRequired,
};

export const CourseModulesTable = ({ modules = [] }) => {
  return (
    <Scrollbar>
      <Table sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <TableCell>Module Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modules.map((module) => (
            <CourseModuleRow key={module.id} module={module} />
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  );
};

CourseModulesTable.propTypes = {
  modules: PropTypes.array.isRequired,
};

export default CourseModulesTable;
