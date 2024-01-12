import { useCallback } from 'react';
import PropTypes from 'prop-types';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import { Button, ListItemText, Menu, MenuItem, SvgIcon } from '@mui/material';
import { usePopover } from '../hooks/use-popover';

export const BulkActionsMenu = (props) => {
  const { disabled, onArchive, onDelete, selectedCount = 0, sx, ...other } = props;
  const popover = usePopover();

  const handleArchive = useCallback(() => {
    popover.handleClose();
    onArchive?.();
  }, [popover, onArchive]);

  const handleDelete = useCallback(() => {
    popover.handleClose();
    onDelete?.();
  }, [popover, onDelete]);

  return (
    <>
      <Button
        disabled={disabled}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        startIcon={(
          <SvgIcon fontSize="small">
            <ChevronDownIcon />
          </SvgIcon>
        )}
        variant="outlined"
        sx={{
          flexShrink: 0,
          whiteSpace: 'nowrap',
          ...sx
        }}
        {...other}>
        Bulk Actions
      </Button>
      <Menu
        anchorEl={popover.anchorRef.current}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
        MenuListProps={{
          dense: true,
          sx: { p: 1 }
        }}
        onClose={popover.handleClose}
        open={popover.open}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
      >
        <MenuItem
          onClick={handleArchive}
          sx={{ borderRadius: 1 }}
        >
          <ListItemText>
            Archive ({selectedCount})
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{ borderRadius: 1 }}
        >
          <ListItemText>
            Delete ({selectedCount})
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

BulkActionsMenu.propTypes = {
  disabled: PropTypes.bool,
  onArchive: PropTypes.func,
  onDelete: PropTypes.func,
  selectedCount: PropTypes.number
};
