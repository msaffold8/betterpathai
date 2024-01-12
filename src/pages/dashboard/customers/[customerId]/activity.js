import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Card, List, Skeleton, Stack } from "@mui/material";
import { customersApi } from "../../../../api/customers";
import { ResourceError } from "../../../../components/resource-error";
import { ResourceUnavailable } from "../../../../components/resource-unavailable";
import { useMounted } from "../../../../hooks/use-mounted";
import { usePageView } from "../../../../hooks/use-page-view";
import { Layout as CustomerLayout } from "../../../../layouts/customer";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import { CustomerLog } from "../../../../sections/dashboard/customers/customer-log";

const useLogsStore = () => {
  const isMounted = useMounted();
  const [state, setState] = useState({ isLoading: true });

  const handleLogsGet = useCallback(async () => {
    setState({ isLoading: true });

    try {
      const response = await customersApi.getCustomerLogs();

      if (isMounted()) {
        setState({ data: response });
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setState({ error: "Something went wrong" });
      }
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleLogsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    state,
  };
};

const getResourcesState = (storeState) => {
  if (storeState.isLoading) {
    return "loading";
  }

  if (storeState.error) {
    return "error";
  }

  return storeState.data?.length > 0 ? "available" : "unavailable";
};

const Page = () => {
  const logsStore = useLogsStore();

  usePageView();

  const resourcesState = getResourcesState(logsStore.state);

  return (
    <>
      <Head>
        <title>Customer: Activity | Better Path</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Card sx={{ flexGrow: 1 }}>
          {resourcesState === "loading" && (
            <Box sx={{ m: 2 }}>
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
            </Box>
          )}
          {resourcesState === "error" && (
            <ResourceError message="Something went wrong" sx={{ m: 2 }} />
          )}
          {resourcesState === "unavailable" && (
            <ResourceUnavailable message="Resources are not available" sx={{ m: 2 }} />
          )}
          {resourcesState === "available" && (
            <Stack spacing={2}>
              <List disablePadding>
                {logsStore.state.data?.map((log) => (
                  <CustomerLog
                    createdAt={log.createdAt}
                    divider
                    id={log.id}
                    key={log.id}
                    message={log.message}
                    subjectAvatar={log.subjectAvatar}
                    subjectId={log.subjectId}
                    subjectName={log.subjectName}
                    type={log.type}
                  />
                ))}
              </List>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button color="inherit">Load more</Button>
              </Box>
            </Stack>
          )}
        </Card>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <CustomerLayout>{page}</CustomerLayout>
  </DashboardLayout>
);

export default Page;
