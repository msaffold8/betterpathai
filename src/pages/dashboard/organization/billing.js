import { useState } from "react";
import Head from "next/head";
import { Alert, Card, Stack, Unstable_Grid2 as Grid, useMediaQuery } from "@mui/material";
import { PropertyListItem } from "../../../components/property-list-item";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { Layout as OrganizationLayout } from "../../../layouts/organization";
import { OrganizationBillingDetails } from "../../../sections/dashboard/organization/organization-billing-details";
import { OrganizationBillingPlan } from "../../../sections/dashboard/organization/organization-billing-plan";

const Page = () => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [showAlert, setShowAlert] = useState(true);

  usePageView();

  const align = mdDown ? "horizontal" : "vertical";

  return (
    <>
      <Head>
        <title>Organization: Billing | Better Path</title>
      </Head>
      <Stack spacing={3}>
        <Card>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <PropertyListItem align={align} component="div" label="Plan Selected" value="Free" />
            </Grid>
            <Grid xs={12} md={4}>
              <PropertyListItem align={align} component="div" label="Team members" value="2" />
            </Grid>
            <Grid xs={12} md={4}>
              <PropertyListItem align={align} component="div" label="Users" value="7000" />
            </Grid>
          </Grid>
        </Card>
        <OrganizationBillingDetails />
        {showAlert && (
          <Alert onClose={() => setShowAlert(false)} severity="info">
            You will be charged starting 07/22/2021
          </Alert>
        )}
        <OrganizationBillingPlan />
      </Stack>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <OrganizationLayout>{page}</OrganizationLayout>
  </DashboardLayout>
);

export default Page;
