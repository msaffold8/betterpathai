import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import { Box, Button, Container, Skeleton, Stack, SvgIcon, Typography } from "@mui/material";
import { invoicesApi } from "../../../../api/invoices";
import { ResourceError } from "../../../../components/resource-error";
import { ResourceUnavailable } from "../../../../components/resource-unavailable";
import { useMounted } from "../../../../hooks/use-mounted";
import { usePageView } from "../../../../hooks/use-page-view";
import { paths } from "../../../../paths";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import { InvoicePdfDocument } from "../../../../sections/dashboard/invoices/invoice-pdf-document";
import { InvoicePdfPreview } from "../../../../sections/dashboard/invoices/invoice-pdf-preview";

const useInvoiceStore = () => {
  const isMounted = useMounted();
  const [state, setState] = useState({ isLoading: true });

  const handleInvoiceGet = useCallback(async () => {
    setState({ isLoading: true });

    try {
      const response = await invoicesApi.getInvoice();

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
      handleInvoiceGet();
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

  return storeState.data ? "available" : "unavailable";
};

const Page = () => {
  const invoiceStore = useInvoiceStore();

  usePageView();

  const resourcesState = getResourcesState(invoiceStore.state);

  return (
    <>
      <Head>
        <title>Invoice: Preview | Better Path</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="lg" sx={{ height: "100%" }}>
          {resourcesState === "loading" && (
            <div>
              <Skeleton height={42} />
              <Skeleton />
              <Skeleton />
            </div>
          )}
          {resourcesState === "error" && <ResourceError message="Something went wrong" />}
          {resourcesState === "unavailable" && (
            <ResourceUnavailable message="Resources are not available" />
          )}
          {resourcesState === "available" && (
            <Stack spacing={4}>
              <Stack spacing={2}>
                <div>
                  <Button
                    color="inherit"
                    component={NextLink}
                    href={paths.dashboard.invoices.index}
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowLeftIcon />
                      </SvgIcon>
                    }
                    variant="text"
                  >
                    Invoices
                  </Button>
                </div>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <div>
                    <Typography variant="h4">Invoice Preview</Typography>
                  </div>
                  <PDFDownloadLink
                    document={<InvoicePdfDocument invoice={invoiceStore.state.data} />}
                    fileName="invoice"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      size="large"
                      startIcon={
                        <SvgIcon fontSize="small">
                          <ArrowDownOnSquareIcon />
                        </SvgIcon>
                      }
                      variant="contained"
                    >
                      Download
                    </Button>
                  </PDFDownloadLink>
                </Stack>
              </Stack>
              <InvoicePdfPreview invoice={invoiceStore.state.data} />
            </Stack>
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
