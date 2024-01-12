import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import NextLink from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Button, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { GuestGuard } from "../../../guards/guest-guard";
import { IssuerGuard } from "../../../guards/issuer-guard";
import { useAuth } from "../../../hooks/use-auth";
import { useMounted } from "../../../hooks/use-mounted";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as AuthLayout } from "../../../layouts/auth";
import { paths } from "../../../paths";
import { Issuer } from "../../../utils/auth";

const initialValues = {
  email: "demo@betterfuture.ai",
  password: "Password123!",
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string().max(255).email("Must be a valid email").required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
  policy: Yup.boolean(),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || undefined;
  const auth = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.email, values.password);

        if (isMounted()) {
          router.push(returnTo || paths.dashboard.index);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          if (err.code === "UserNotConfirmedException") {
            const searchParams = new URLSearchParams({ username: values.email }).toString();
            const href = paths.auth.amplify.confirmRegister + `?${searchParams}`;
            router.push(href);
            return;
          }

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
        <title>Login | Better Path</title>
      </Head>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={1}
          sx={{ mb: 3 }}
        >
          <Typography variant="h4">Login</Typography>
          <Button component={NextLink} href={paths.auth.amplify.register}>
            Sign Up
          </Button>
        </Stack>
        <Stack spacing={2}>
          <TextField
            autoFocus
            error={!!(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email address"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
          <TextField
            error={!!(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
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
          Login
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Button component={NextLink} href={paths.auth.amplify.forgotPassword}>
            Forgot password
          </Button>
        </Box>
        <Alert color="primary" severity="info" sx={{ mt: 3 }}>
          You can use <strong>demo@betterfuture.ai</strong> and password{" "}
          <strong>Password123!</strong>
        </Alert>
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
