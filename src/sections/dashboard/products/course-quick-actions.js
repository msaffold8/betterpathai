import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
// import EditIcon from "@heroicons/react/24/outline/EditIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Select,
  Stack,
  SvgIcon,
} from "@mui/material";
import { ActionList } from "../../../components/action-list";
import { ActionListItem } from "../../../components/action-list-item";

const statusOptions = [
  {
    color: "info.main",
    label: "Draft",
    value: "draft",
  },
  {
    color: "success.main",
    label: "Published",
    value: "published",
  },
];

export const CourseQuickActions = ({ course, ...other }) => {
  const [status, setStatus] = useState(course.status);

  const handleStatusChange = useCallback((event) => {
    setStatus(event.target.value);
  }, []);

  const handleViewDetails = useCallback(() => {
    // Logic to view course details
  }, []);

  const handleEditCourse = useCallback(() => {
    // Logic to edit course
  }, []);

  return (
    <>
      <Card {...other}>
        <CardHeader title="Course Actions" />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <Select fullWidth onChange={handleStatusChange} value={status}>
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box
                    sx={{
                      backgroundColor: option.color,
                      borderRadius: "50%",
                      height: 8,
                      width: 8,
                      mr: 1,
                    }}
                  />
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <div>
              <Button onClick={handleEditCourse} variant="contained">
                Edit Course
              </Button>
            </div>
          </Stack>
        </CardContent>
        <Divider />
        <ActionList>
          <ActionListItem
            icon={
              <SvgIcon fontSize="small">
                <EyeIcon />
              </SvgIcon>
            }
            label="View Details"
            onClick={handleViewDetails}
          />
        </ActionList>
      </Card>
    </>
  );
};

CourseQuickActions.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseQuickActions;
