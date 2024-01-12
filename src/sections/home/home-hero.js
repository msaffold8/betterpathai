import NextLink from "next/link";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { paths } from "../../paths";

export const HomeHero = () => (
  <Box
    sx={{
      backgroundColor: "background.paper",
      pt: "64px",
    }}
  >
    <Container maxWidth={false} sx={{ maxWidth: 700 }}>
      <Typography
        align="center"
        sx={{ fontSize: { xs: 38, md: 64 }, lineHeight: 1.2, fontWeight: 800, mb: 3 }}
      >
        Empower Your Career with AI
      </Typography>
      <Typography
        align="center"
        color="text.secondary"
        sx={{ fontSize: { xs: 20, md: 24 }, lineHeight: 1.5, mb: 3 }}
      >
        Join Better Path AI to navigate your future with personalized learning in Artificial
        Intelligence.
      </Typography>

      <Stack alignItems="center" direction="row" justifyContent="center" spacing={2}>
        <Button
          color="inherit"
          component={NextLink}
          href={paths.dashboard.index}
          size="large"
          variant="outlined"
        >
          Login/Register
        </Button>
        <Button
          component="a"
          href="https://betterfutureai.com/purchase"
          size="large"
          target="_blank"
          variant="contained"
        >
          Purchase
        </Button>
      </Stack>
      <Box
        sx={{
          fontSize: 0,
          "& img": {
            width: "100%",
          },
        }}
      >
        <img src="/assets/betterfuturelogo.png" />
      </Box>
    </Container>
  </Box>
);
