// course-module-dialog.js
import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

const getInitialValues = (module, isEdit) => {
  if (isEdit) {
    return {
      moduleName: module.moduleName,
      resourceType: module.resourceType,
      description: module.description,
    };
  }
  return {
    moduleName: "",
    resourceType: "",
    description: "",
  };
};

const CourseModuleDialog = ({ module, open, onClose, isEdit }) => {
  const initialValues = getInitialValues(module, isEdit);

  const validationSchema = Yup.object().shape({
    moduleName: Yup.string().max(255).required("Module name is required"),
    resourceType: Yup.string().required("Resource type is required"),
    description: Yup.string().max(1024).required("Description is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        // API call to create or update course module
        setStatus({ success: true });
        setSubmitting(false);
        onClose();
      } catch (err) {
        console.error(err);
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    },
  });

  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } = formik;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? "Edit Module" : "Create New Module"}</DialogTitle>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="moduleName"
                  label="Module Name"
                  value={values.moduleName}
                  error={Boolean(touched.moduleName && errors.moduleName)}
                  fullWidth
                  helperText={touched.moduleName && errors.moduleName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="resourceType"
                  label="Resource Type"
                  value={values.resourceType}
                  error={Boolean(touched.resourceType && errors.resourceType)}
                  fullWidth
                  helperText={touched.resourceType && errors.resourceType}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  value={values.description}
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  multiline
                  rows={4}
                  helperText={touched.description && errors.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isEdit ? "Save Changes" : "Add Module"}
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
};

CourseModuleDialog.propTypes = {
  module: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
};

export default CourseModuleDialog;
