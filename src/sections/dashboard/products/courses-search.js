// courses-search.js
import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Divider, Stack, SvgIcon, Tab, Tabs } from "@mui/material";
import AdjustmentsHorizontalIcon from "@heroicons/react/24/outline/AdjustmentsHorizontalIcon";
import { BulkActionsMenu } from "../../../components/bulk-actions-menu";
import { FilterDialog } from "../../../components/filter-dialog";
import { QueryField } from "../../../components/query-field";
import { useDialog } from "../../../hooks/use-dialog";
import {
  containsOperator,
  equalsOperator,
  isAfterOperator,
  isBeforeOperator,
  isBlankOperator,
  isPresentOperator,
} from "../../../utils/filter-operators";

const viewOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Upcoming", value: "upcoming" },
];

const filterProperties = [
  {
    label: "Module Name",
    name: "moduleName",
    operators: ["contains", "equals", "isBlank", "isPresent"],
  },
  {
    label: "Resource Type",
    name: "resourceType",
    operators: ["contains", "equals", "isBlank", "isPresent"],
  },
  {
    label: "Created",
    name: "createdAt",
    operators: ["isAfter", "isBefore", "isBlank", "isPresent"],
  },
];

const filterOperators = [
  containsOperator,
  equalsOperator,
  isAfterOperator,
  isBeforeOperator,
  isBlankOperator,
  isPresentOperator,
];

export const CoursesSearch = ({
  onQueryChange,
  onViewChange,
  query = "",
  view = "all",
  ...other
}) => {
  const filterDialog = useDialog();

  const handleFiltersApply = (filters) => {
    filterDialog.handleClose();
    // Apply filters logic
  };

  const handleFiltersClear = () => {
    filterDialog.handleClose();
    // Clear filters logic
  };

  return (
    <>
      <div>
        <Box sx={{ px: { sm: 3 } }}>
          <Tabs
            onChange={(event, value) => onViewChange?.(value)}
            value={view}
            variant="scrollable"
          >
            {viewOptions.map((option) => (
              <Tab key={option.label} label={option.label} value={option.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2} sx={{ p: 3 }}>
          <QueryField placeholder="Search courses..." onChange={onQueryChange} value={query} />
          <Button
            onClick={filterDialog.handleOpen}
            startIcon={
              <SvgIcon fontSize="small">
                <AdjustmentsHorizontalIcon />
              </SvgIcon>
            }
            variant="text"
          >
            Filter
          </Button>
        </Stack>
      </div>
      <FilterDialog
        filters={[]}
        onApply={handleFiltersApply}
        onClear={handleFiltersClear}
        onClose={filterDialog.handleClose}
        open={filterDialog.open}
        operators={filterOperators}
        properties={filterProperties}
      />
    </>
  );
};

CoursesSearch.propTypes = {
  onQueryChange: PropTypes.func,
  onViewChange: PropTypes.func,
  query: PropTypes.string,
  view: PropTypes.oneOf(viewOptions.map((o) => o.value)),
};

export default CoursesSearch;
