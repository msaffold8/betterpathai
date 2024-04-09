import NextLink from 'next/link';
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { paths } from "../../../paths";
import { Scrollbar } from "../../../components/scrollbar";

// Function to determine the chip background color based on the numerical level
const getChipColor = (level) => {
  if (level <= 10) {
    return "#bdbdbd"; // Light grey for levels 1-10
  } else if (level <= 20) {
    return "#ff9800"; // Orange for levels 11-20
  } else {
    return "#212121"; // Darker grey (almost black) for levels above 20
  }
};

export const OverviewLatestCustomers = (props) => {
  const { customers = [] } = props;

  return (
    <Card>
      <CardHeader
        action={
          <Button
            color="inherit"
            component={NextLink}
            href={paths.dashboard.customers.index}
            sx={{ color: "black" }}
          >
            View All
          </Button>
        }
        title="Leaders"
      />
      <Divider />
      <Scrollbar>
        <Table sx={{ minWidth: 500 }}>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Avatar src={customer.avatar} alt={customer.name} />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" noWrap>
                    {customer.name}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={`Level ${customer.level}`}
                    size="medium"
                    sx={{
                      bgcolor: getChipColor(customer.level),
                      color: "white",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
};

OverviewLatestCustomers.propTypes = {
  customers: PropTypes.array.isRequired,
};
