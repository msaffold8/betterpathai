import { useCallback, useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import { Box, ButtonBase, Collapse, SvgIcon } from '@mui/material';

export const SideNavItem = (props) => {
  const {
    active = false,
    children,
    collapse = false,
    depth = 0,
    external = false,
    icon,
    openImmediately = false,
    path,
    title
  } = props;
  const [open, setOpen] = useState(openImmediately);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  // Branch

  if (children) {
    return (
      <li>
        <ButtonBase
          onClick={handleToggle}
          sx={{
            alignItems: "center",
            borderRadius: 1,
            display: "flex",
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 500,
            justifyContent: "flex-start",
            px: "6px",
            py: "12px",
            textAlign: "left",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "orange",
              display: "inline-flex",
              flexGrow: 0,
              flexShrink: 0,
              height: 24,
              justifyContent: "center",
              width: 24,
            }}
          >
            {icon}
          </Box>
          <Box
            component="span"
            sx={{
              color: depth === 0 ? "#ffffff" : "#ffffff",
              flexGrow: 1,
              fontSize: 14,
              mx: "12px",
              transition: "opacity 250ms ease-in-out",
              ...(active && {
                color: "#ffffff",
              }),
              ...(collapse && {
                opacity: 0,
              }),
            }}
          >
            {title}
          </Box>
          <SvgIcon
            sx={{
              color: "orange",
              fontSize: 16,
              transition: "opacity 250ms ease-in-out",
              ...(collapse && {
                opacity: 0,
              }),
            }}
          >
            {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </SvgIcon>
        </ButtonBase>
        <Collapse in={!collapse && open} unmountOnExit>
          {children}
        </Collapse>
      </li>
    );
  }

  // Leaf

  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : {
          component: NextLink,
          href: path,
        }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          fontFamily: (theme) => theme.typography.fontFamily,
          fontSize: 14,
          fontWeight: 500,
          justifyContent: "flex-start",
          px: "6px",
          py: "12px",
          textAlign: "left",
          whiteSpace: "nowrap",
          width: "100%",
        }}
        {...linkProps}
      >
        <Box
          component="span"
          sx={{
            alignItems: "center",
            color: "orange",
            display: "inline-flex",
            flexGrow: 0,
            flexShrink: 0,
            height: 24,
            justifyContent: "center",
            width: 24,
          }}
        >
          {icon}
        </Box>
        <Box
          component="span"
          sx={{
            color: depth === 0 ? "#ffffff" : "#ffffff",
            flexGrow: 1,
            mx: "12px",
            transition: "opacity 250ms ease-in-out",
            ...(active && {
              color: "orange",
            }),
            ...(collapse && {
              opacity: 0,
            }),
          }}
        >
          {title}
        </Box>
        {external && (
          <SvgIcon
            sx={{
              color: "orange",
              fontSize: 18,
              transition: "opacity 250ms ease-in-out",
              ...(collapse && {
                opacity: 0,
              }),
            }}
          >
            <ArrowTopRightOnSquareIcon />
          </SvgIcon>
        )}
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  collapse: PropTypes.bool,
  depth: PropTypes.number,
  external: PropTypes.bool,
  icon: PropTypes.any,
  openImmediately: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
