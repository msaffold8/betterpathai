import Head from "next/head";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { GuestGuard } from "../../../guards/guest-guard";
import { IssuerGuard } from "../../../guards/issuer-guard";
import { useAuth } from "../../../hooks/use-auth";
import { useMounted } from "../../../hooks/use-mounted";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as AuthLayout } from "../../../layouts/auth";
import { paths } from "../../../paths";
import { Issuer } from "../../../utils/auth";

const initialValues = {
  code: "",
  email: "",
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string().max(255).email("Must be a valid email").required("Email is required"),
  code: Yup.string().required("Code is required"),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await auth.confirmSignUp(values.email, values.code);

        if (isMounted()) {
          router.push(paths.auth.amplify.login);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  usePageView();

  return (
    <>
      <Head>
        <title>Confirm Register | Better Path</title>
      </Head>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4">Confirm Register</Typography>
        </Box>
        <Stack spacing={2}>
          <TextField
            autoFocus
            error={!!(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email Address"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
          <TextField
            error={!!(formik.touched.code && formik.errors.code)}
            fullWidth
            helperText={formik.touched.code && formik.errors.code}
            label="Code"
            name="code"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.code}
          />
        </Stack>
        {formik.errors.submit && (
          <FormHelperText error sx={{ mt: 3 }}>
            {formik.errors.submit}
          </FormHelperText>
        )}
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
        >
          Confirm
        </Button>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.Amplify}>
    <GuestGuard>
      <AuthLayout>{page}</AuthLayout>
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
