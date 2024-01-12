import PropTypes from 'prop-types';
import { Button, Card, Stack, Typography } from '@mui/material';
import { PropertyList } from '../../../../components/property-list';
import { PropertyListItem } from '../../../../components/property-list-item';

const notificationMap = {
  productUpdate: 'Product Update',
  weeklyNews: 'Weekly News',
  webhooksAlerts: 'Webhooks Alerts'
};

export const WizardConfirmationStep = (props) => {
  const { onPreviousStep, values } = props;

  const notifications = values.notifications
    .map((type) => notificationMap[type])
    .join(', ');

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6">
          Step 4. Confirmation
        </Typography>
      </div>
      <Card variant="outlined">
        <PropertyList>
          <PropertyListItem
            divider
            label="Company Type"
            value={values.businessType}
          />
          <PropertyListItem
            divider
            label="Name"
            value={values.name}
          />
          <PropertyListItem
            divider
            label="Website"
            value={values.website}
          />
          <PropertyListItem
            divider
            label="Company Name"
            value={values.companyName}
          />
          <PropertyListItem
            label="Email Notifications"
            value={notifications}
          />
        </PropertyList>
      </Card>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="flex-end"
        spacing={2}
      >
        <Button
          color="inherit"
          onClick={onPreviousStep}
          size="large"
          type="button"
        >
          Back
        </Button>
        <Button
          size="large"
          type="submit"
          variant="contained"
        >
          Confirm
        </Button>
      </Stack>
    </Stack>
  );
};

WizardConfirmationStep.propTypes = {
  onPreviousStep: PropTypes.func,
  values: PropTypes.object.isRequired
};
