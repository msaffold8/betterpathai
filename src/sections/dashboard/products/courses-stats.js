// courses-stats.js
import React from "react";
import SchoolIcon from "@heroicons/react/24/outline/SchoolIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import StarIcon from "@heroicons/react/24/outline/StarIcon";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import { Card, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid } from "@mui/material";

const stats = [
  {
    icon: (
      <SvgIcon color="primary" fontSize="small">
        <SchoolIcon />
      </SvgIcon>
    ),
    data: "120",
    name: "Active Courses",
  },
  {
    icon: (
      <SvgIcon color="info" fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
    data: "4,300",
    name: "Total Students",
  },
  {
    icon: (
      <SvgIcon color="warning" fontSize="small">
        <StarIcon />
      </SvgIcon>
    ),
    data: "4.5",
    name: "Average Rating",
  },
  {
    icon: (
      <SvgIcon color="success" fontSize="small">
        <CalendarIcon />
      </SvgIcon>
    ),
    data: "15",
    name: "Upcoming Modules",
  },
];

export const CoursesStats = () => (
  <Card>
    <Grid container>
      {stats.map((item) => (
        <Grid
          xs={12}
          sm={6}
          md={3}
          key={item.name}
          sx={{
            borderBottom: (theme) => ({
              xs: `1px solid ${theme.palette.divider}`,
              md: "none",
            }),
            borderRight: (theme) => ({
              md: `1px solid ${theme.palette.divider}`,
            }),
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2} sx={{ p: 2 }}>
            {item.icon}
            <div>
              <Typography color="text.secondary" variant="overline">
                {item.name}
              </Typography>
              <Typography variant="h6">{item.data}</Typography>
            </div>
          </Stack>
        </Grid>
      ))}
    </Grid>
  </Card>
);

export default CoursesStats;
