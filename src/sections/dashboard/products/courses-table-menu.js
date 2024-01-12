import { useCallback } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import { IconButton, Menu, MenuItem, SvgIcon } from "@mui/material";
import { usePopover } from "../../../hooks/use-popover";
import { paths } from "../../../paths";

export const CoursesTableMenu = () => {
  const router = useRouter();
  const popover = usePopover();

  const handleEditCourse = useCallback(() => {
    popover.handleClose();
    router.push(paths.dashboard.courses.edit); // Update the path to course edit page
  }, [popover, router]);

  const handleDeactivateCourse = useCallback(() => {
    popover.handleClose();
    // Logic for deactivating a course
  }, [popover]);

  const handleRemoveCourse = useCallback(() => {
    popover.handleClose();
    // Logic for removing a course
  }, [popover]);

  return (
    <>
      <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
        <SvgIcon fontSize="small">
          <EllipsisVerticalIcon />
        </SvgIcon>
      </IconButton>
      <Menu
        anchorEl={popover.anchorRef.current}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        disableScrollLock
        open={popover.open}
        onClose={popover.handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEditCourse}>Edit Course</MenuItem>
        <MenuItem onClick={handleDeactivateCourse}>Deactivate Course</MenuItem>
        <MenuItem onClick={handleRemoveCourse}>Remove Course</MenuItem>
      </Menu>
    </>
  );
};
