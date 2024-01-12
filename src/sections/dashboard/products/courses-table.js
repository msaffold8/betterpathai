// courses-table.js
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../../components/scrollbar";
import { CoursesTableMenu } from "./courses-table-menu";

const statusMap = {
  active: {
    color: "success.main",
    label: "Active",
  },
  upcoming: {
    color: "warning.main",
    label: "Upcoming",
  },
  completed: {
    color: "text.secondary",
    label: "Completed",
  },
};

export const CoursesTable = ({ courses, selectedCourses, onSelectCourse }) => {
  return (
    <Box>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedCourses.length === courses.length}
                  indeterminate={
                    selectedCourses.length > 0 && selectedCourses.length < courses.length
                  }
                  onChange={(event) => onSelectCourse(event, "all")}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => {
              const isSelected = selectedCourses.includes(course.id);
              const status = statusMap[course.status];
              const createdDate = format(course.createdAt, "dd MMM yyyy");

              return (
                <TableRow key={course.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => onSelectCourse(event, course.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{course.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={status.color}>{status.label}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{createdDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <CoursesTableMenu courseId={course.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </Box>
  );
};

CoursesTable.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["active", "upcoming", "completed"]).isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  selectedCourses: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectCourse: PropTypes.func.isRequired,
};

export default CoursesTable;
