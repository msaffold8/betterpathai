// course-create-dialog.js
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";

const initialValues = {
  courseName: "",
  description: "",
  submit: null,
};

const validationSchema = Yup.object({
  courseName: Yup.string().max(255).required("Course name is required"),
  description: Yup.string().max(500).required("Description is required"),
});

export const CourseCreateDialog = ({ open = false, onClose, ...other }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        // Add logic to create a course
        toast.success("Course created");
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        helpers.resetForm();
        onClose?.();
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
      TransitionProps={{
        onExited: () => formik.resetForm(),
      }}
      {...other}
    >
      <DialogTitle>Create Course</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <TextField
            error={Boolean(formik.touched.courseName && formik.errors.courseName)}
            fullWidth
            helperText={formik.touched.courseName && formik.errors.courseName}
            label="Course name"
            name="courseName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.courseName}
          />
          <TextField
            error={Boolean(formik.touched.description && formik.errors.description)}
            fullWidth
            helperText={formik.touched.description && formik.errors.description}
            label="Description"
            multiline
            name="description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            rows={4}
            value={formik.values.description}
          />
        </Stack>
        {formik.errors.submit && (
          <FormHelperText error sx={{ mt: 2 }}>
            {formik.errors.submit}
          </FormHelperText>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={formik.isSubmitting}
          onClick={() => {
            formik.handleSubmit();
          }}
          variant="contained"
        >
          Create Course
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CourseCreateDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default CourseCreateDialog;
