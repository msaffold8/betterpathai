import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { Box, Button, Card, Container, Divider, Stack, SvgIcon, Typography } from "@mui/material";
import { customersApi } from "../../../api/customers";
import { useDialog } from "../../../hooks/use-dialog";
import { useMounted } from "../../../hooks/use-mounted";
import { usePageView } from "../../../hooks/use-page-view";
import { useSelection } from "../../../hooks/use-selection";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { CustomerDialog } from "../../../sections/dashboard/customers/customer-dialog";
import { CustomersSearch } from "../../../sections/dashboard/customers/customers-search";
import { CustomersTable } from "../../../sections/dashboard/customers/customers-table";

const useCustomersSearch = () => {
  const [state, setState] = useState({
    filters: [],
    page: 0,
    query: "",
    rowsPerPage: 10,
    sortBy: "createdAt",
    sortDir: "desc",
    view: "all",
  });

  const handleFiltersApply = useCallback((filters) => {
    setState((prevState) => ({
      ...prevState,
      page: 0,
      filters,
    }));
  }, []);

  const handleFiltersClear = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      page: 0,
      filters: [],
    }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setState((prevState) => ({
      ...prevState,
      page,
    }));
  }, []);

  const handleQueryChange = useCallback((query) => {
    setState((prevState) => ({
      ...prevState,
      page: 0,
      query,
    }));
  }, []);

  const handleSortChange = useCallback((sortBy) => {
    setState((prevState) => {
      const sortDir = prevState.sortBy === sortBy && prevState.sortDir === "asc" ? "desc" : "asc";

      return {
        ...prevState,
        page: 0,
        sortBy,
        sortDir,
      };
    });
  }, []);

  const handleViewChange = useCallback((view) => {
    setState((prevState) => ({
      ...prevState,
      page: 0,
      view,
    }));
  }, []);

  return {
    handleFiltersApply,
    handleFiltersClear,
    handlePageChange,
    handleQueryChange,
    handleSortChange,
    handleViewChange,
    state,
  };
};

const useCustomersStore = (searchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState({ isLoading: true });

  const handleCustomersGet = useCallback(
    async (searchState) => {
      setState({ isLoading: true });

      try {
        const response = await customersApi.getCustomers({
          filters: searchState.filters,
          page: searchState.page,
          query: searchState.query,
          rowsPerPage: searchState.rowsPerPage,
          sortBy: searchState.sortBy,
          sortDir: searchState.sortDir,
          view: searchState.view,
        });

        if (isMounted()) {
          setState({
            data: {
              customers: response.data,
              customersCount: response.count,
            },
          });
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          setState({ error: "Something went wrong" });
        }
      }
    },
    [isMounted]
  );

  useEffect(
    () => {
      handleCustomersGet(searchState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    state,
  };
};

const useCustomersIds = (storeState) => {
  return useMemo(() => {
    if (!storeState.data) {
      return [];
    }

    return storeState.data.customers.map((customer) => customer.id);
  }, [storeState]);
};

const Page = () => {
  const customersSearch = useCustomersSearch();
  const customersStore = useCustomersStore(customersSearch.state);
  const customersIds = useCustomersIds(customersStore.state);
  const customersSelection = useSelection(customersIds);
  const createDialog = useDialog();

  usePageView();

  return (
    <>
      <Head>
        <title>Customer: List | Better Path</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          <Stack spacing={4} sx={{ height: "100%" }}>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={1}
            >
              <div>
                <Typography variant="h4">Customers</Typography>
              </div>
              <Button
                onClick={createDialog.handleOpen}
                size="large"
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                Add
              </Button>
            </Stack>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <CustomersSearch
                disabled={customersStore.state.isLoading}
                filters={customersSearch.state.filters}
                onFiltersApply={customersSearch.handleFiltersApply}
                onFiltersClear={customersSearch.handleFiltersClear}
                onQueryChange={customersSearch.handleQueryChange}
                onViewChange={customersSearch.handleViewChange}
                query={customersSearch.state.query}
                selected={customersSelection.selected}
                view={customersSearch.state.view}
              />
              <Divider />
              <CustomersTable
                count={customersStore.state.data?.customersCount}
                error={customersStore.state.error}
                isLoading={customersStore.state.isLoading}
                items={customersStore.state.data?.customers}
                onDeselectAll={customersSelection.handleDeselectAll}
                onDeselectOne={customersSelection.handleDeselectOne}
                onPageChange={customersSearch.handlePageChange}
                onSelectAll={customersSelection.handleSelectAll}
                onSelectOne={customersSelection.handleSelectOne}
                onSortChange={customersSearch.handleSortChange}
                page={customersSearch.state.page}
                rowsPerPage={customersSearch.state.rowsPerPage}
                selected={customersSelection.selected}
                sortBy={customersSearch.state.sortBy}
                sortDir={customersSearch.state.sortDir}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
      <CustomerDialog action="create" onClose={createDialog.handleClose} open={createDialog.open} />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
