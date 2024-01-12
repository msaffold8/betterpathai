import { useCallback, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Container,
  Grow,
  Link,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { WidgetPreviewer } from "../../../components/widget-previewer";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { usePopover } from "../../../hooks/use-popover";

const options = ["Create a merge commit", "Squash and merge", "Rebase and merge"];

const Page = () => {
  const popover = usePopover();
  const [selectedItem, setSelectedItem] = useState(1);

  usePageView();

  const handleMenuSelect = useCallback(
    (event, index) => {
      setSelectedItem(index);
      popover.handleClose();
    },
    [popover]
  );

  const handleMenuToggle = useCallback(() => {
    popover.handleToggle();
  }, [popover]);

  const handleMenuClose = useCallback(
    (event) => {
      if (popover.anchorRef.current?.contains(event.target)) {
        return;
      }

      popover.handleClose();
    },
    [popover]
  );

  return (
    <>
      <Head>
        <title>Foundation: Buttons | Better Path</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={6}>
            <div>
              <Typography variant="h4">Buttons</Typography>
            </div>
            <Stack spacing={5}>
              <WidgetPreviewer
                title="Buttons"
                description="Better Path elements are themed Material-UI components."
              >
                <Stack alignItems="center" direction="row" gap={2} sx={{ p: 3 }}>
                  <Button size="large" variant="contained">
                    Contained
                  </Button>
                  <Button size="large" variant="outlined">
                    Outlined
                  </Button>
                  <Button size="large">Text</Button>
                  <Button
                    size="large"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Icon
                  </Button>
                </Stack>
              </WidgetPreviewer>
              <WidgetPreviewer title="Button Group">
                <Box sx={{ p: 3 }}>
                  <ButtonGroup ref={popover.anchorRef} variant="contained">
                    <Button onClick={() => {}}>{options[selectedItem]}</Button>
                    <Button size="small" onClick={handleMenuToggle}>
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup>
                  <Popper
                    open={popover.open}
                    anchorEl={popover.anchorRef.current}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleMenuClose}>
                            <MenuList>
                              {options.map((option, index) => (
                                <MenuItem
                                  key={option}
                                  disabled={index === 2}
                                  selected={index === selectedItem}
                                  onClick={(event) => handleMenuSelect(event, index)}
                                >
                                  {option}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Box>
              </WidgetPreviewer>
              <WidgetPreviewer title="Link">
                <Box sx={{ p: 3 }}>
                  <Link href="#" underline="none">
                    Link
                  </Link>
                </Box>
              </WidgetPreviewer>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
