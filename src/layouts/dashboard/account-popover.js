import { useCallback } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon';
import BuildingOfficeIcon from '@heroicons/react/24/outline/BuildingOfficeIcon';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import UserIcon from '@heroicons/react/24/outline/UserIcon';
import {
  Avatar,
  Box,
  FormControlLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Popover,
  Select,
  Stack,
  SvgIcon,
  Switch,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useMockedUser } from '../../hooks/use-mocked-user';
import { usePopover } from '../../hooks/use-popover';
import { paths } from '../../paths';
import { Issuer } from '../../utils/auth';

const languageOptions = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: 'German',
    value: 'de'
  },
  {
    label: 'Spanish',
    value: 'es'
  }
];

export const AccountPopover = (props) => {
  const {
    direction = "ltr",
    language = "en",
    onDirectionSwitch,
    onLanguageChange,
    onOrganizationChange,
    onThemeSwitch,
    organizationId,
    organizations = [],
    paletteMode = "light",
    ...other
  } = props;
  const router = useRouter();
  const auth = useAuth();
  const user = useMockedUser();
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const popover = usePopover();

  const handleOrganizationChange = useCallback(
    (event) => {
      onOrganizationChange?.(event.target.value);
    },
    [onOrganizationChange]
  );

  const handleLanguageChange = useCallback(
    (event) => {
      onLanguageChange?.(event.target.value);
    },
    [onLanguageChange]
  );

  const handleLogout = useCallback(async () => {
    try {
      popover.handleClose();

      switch (auth.issuer) {
        case Issuer.Amplify: {
          await auth.signOut();
          break;
        }

        case Issuer.Auth0: {
          await auth.logout();
          break;
        }

        case Issuer.Firebase: {
          await auth.signOut();
          break;
        }

        case Issuer.JWT: {
          await auth.signOut();
          break;
        }

        default: {
          console.warn("Using an unknown Auth Issuer, did not log out");
        }
      }

      router.push(paths.index);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  }, [auth, router, popover]);

  // NOTE: Ensure an organization is found, otherwise some components will fail.
  const organization = organizations.find((organization) => organization.id === organizationId);

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        spacing={2}
        sx={{ cursor: "pointer" }}
        {...other}
      >
        <Avatar
          src={user.avatar}
          variant="rounded"
          sx={{
            height: 40,
            width: 40,
          }}
        />
        {!mdDown && (
          <>
            <Box sx={{ minWidth: 100 }}>
              <Typography color="neutral.400" variant="caption">
                Operations
              </Typography>
              <Typography color="inherit" variant="subtitle2">
                {user.name}
              </Typography>
            </Box>
            <SvgIcon color="action" fontSize="small">
              <ChevronDownIcon />
            </SvgIcon>
          </>
        )}
      </Stack>
      <Popover
        anchorEl={popover.anchorRef.current}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        disableScrollLock
        onClose={popover.handleClose}
        open={popover.open}
        PaperProps={{ sx: { width: 260 } }}
      >
        {mdDown && (
          <Box sx={{ p: 2 }}>
            <Select fullWidth native onChange={handleOrganizationChange} value={organization.id}>
              {organizations.map((organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.name}
                </option>
              ))}
            </Select>
          </Box>
        )}
        <List>
          <ListItem divider>
            <ListItemAvatar>
              <Avatar src={user.avatar} variant="rounded" />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary="Better Path AI" />
          </ListItem>
          <li>
            <List disablePadding>
              <ListSubheader disableSticky>App Settings</ListSubheader>
              {mdDown && (
                <ListItem>
                  <Select fullWidth native onChange={handleLanguageChange} value={language}>
                    {languageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </ListItem>
              )}
              {mdDown && (
                <ListItem sx={{ py: 0 }}>
                  <FormControlLabel
                    control={<Switch checked={paletteMode === "dark"} onChange={onThemeSwitch} />}
                    label="Dark Mode"
                  />
                </ListItem>
              )}
              <ListItem divider sx={{ pt: 0 }}>
                <FormControlLabel
                  control={<Switch checked={direction === "rtl"} onChange={onDirectionSwitch} />}
                  label="RTL"
                />
              </ListItem>
            </List>
          </li>
          <ListItemButton
            component={NextLink}
            divider
            href={paths.dashboard.organization.index}
            onClick={popover.handleClose}
          >
            <ListItemIcon>
              <SvgIcon fontSize="small">
                <BuildingOfficeIcon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="Organization" />
          </ListItemButton>
          <ListItemButton
            component={NextLink}
            href={paths.dashboard.account.index}
            divider
            onClick={popover.handleClose}
          >
            <ListItemIcon>
              <SvgIcon fontSize="small">
                <UserIcon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <SvgIcon fontSize="small">
                <ArrowRightOnRectangleIcon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </List>
      </Popover>
    </>
  );
};

AccountPopover.propTypes = {
  direction: PropTypes.oneOf(["ltr", "rtl"]),
  language: PropTypes.oneOf(["de", "en", "es"]),
  onDirectionSwitch: PropTypes.func,
  onLanguageChange: PropTypes.func,
  onOrganizationChange: PropTypes.func,
  onThemeSwitch: PropTypes.func,
  organizationId: PropTypes.string.isRequired,
  organizations: PropTypes.array,
  paletteMode: PropTypes.oneOf(["dark", "light"]),
};

