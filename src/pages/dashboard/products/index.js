import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { Box, Button, Card, Container, Divider, Stack, SvgIcon, Typography } from "@mui/material";
// import { coursesApi } from "../../../api/courses"; // Assuming the courses API endpoint
import { useDialog } from "../../../hooks/use-dialog";
import { usePageView } from "../../../hooks/use-page-view";
import { useSelection } from "../../../hooks/use-selection";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
// import { CourseCreateDialog } from "../../../sections/dashboard/courses/course-create-dialog";
// import { CoursesSearch } from "../../../sections/dashboard/courses/courses-search";
// import { CoursesStats } from "../../../sections/dashboard/courses/courses-stats";
// import { CoursesTable } from "../../../sections/dashboard/courses/courses-table";

const useCoursesSearch = () => {
  const [state, setState] = useState({
    query: "",
    page: 0,
    rowsPerPage: 5,
    sortBy: "createdAt",
    sortDir: "desc",
    view: "all",
  });

  const handleQueryChange = useCallback((query) => {
    setState((prevState) => ({ ...prevState, query }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setState((prevState) => ({ ...prevState, page }));
  }, []);

  const handleRowsPerPageChange = useCallback((rowsPerPage) => {
    setState((prevState) => ({ ...prevState, rowsPerPage }));
  }, []);

  const handleSortChange = useCallback((sortBy) => {
    setState((prevState) => {
      const sortDir = prevState.sortDir === "asc" ? "desc" : "asc";
      return { ...prevState, sortBy, sortDir };
    });
  }, []);

  return {
    ...state,
    handleQueryChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
  };
};

const useCoursesStore = (searchState) => {
  const [state, setState] = useState({ isLoading: true, courses: [], error: null });

  useEffect(() => {
    setState({ isLoading: true });
    coursesApi
      .getCourses(searchState)
      .then((response) => setState({ isLoading: false, courses: response.data, error: null }))
      .catch((error) => setState({ isLoading: false, courses: [], error: error.message }));
  }, [searchState]);

  return state;
};

const Page = () => {
  const {
    query,
    page,
    rowsPerPage,
    sortBy,
    sortDir,
    handleQueryChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
  } = useCoursesSearch();
  const { isLoading, courses, error } = useCoursesStore({
    query,
    page,
    rowsPerPage,
    sortBy,
    sortDir,
  });
  const selection = useSelection(courses.map((course) => course.id));
  const createDialog = useDialog();
  usePageView();

  return (
    <>
      <Head>
        <title>Courses Dashboard | Better Path AI</title>
      </Head>
      <Box sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
              <Typography variant="h4">AI Courses</Typography>
              <Button
                onClick={createDialog.handleOpen}
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                Add Course
              </Button>
            </Stack>
            <CoursesStats />
            <Card>
              <CoursesSearch query={query} onQueryChange={handleQueryChange} />
              <Divider />
              <CoursesTable
                isLoading={isLoading}
                courses={courses}
                selectedCourses={selection.selected}
                onSelectCourse={selection.handleSelect}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSortChange={handleSortChange}
                page={page}
                rowsPerPage={rowsPerPage}
                sortBy={sortBy}
                sortDir={sortDir}
                error={error}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
      <CourseCreateDialog onClose={createDialog.handleClose} open={createDialog.open} />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
