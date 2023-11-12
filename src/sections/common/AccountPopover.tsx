import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import useAuth from 'src/hooks/useAuth';
import { useNavigate } from 'react-router';
import { Tooltip } from '@mui/material';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: '북마크',
    linkTo: '/bookmark',
  },
  {
    label: '내 리뷰',
    linkTo: '/my/review',
  },
  {
    label: '프로필 설정',
    linkTo: '/my',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { user, isAuthenticated, handleLogout } = useAuth();
  const navigate = useNavigate();

  const popover = usePopover();

  const handleClickItem = (path: string) => {
    popover.onClose();
    navigate(path);
  };

  return (
    <>
      {isAuthenticated && user && (
        <>
          <Tooltip title="내 메뉴">
            <IconButton
              component={m.button}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.05)}
              onClick={popover.onOpen}
              sx={{
                width: 40,
                height: 40,
                background: (theme) => alpha(theme.palette.grey[500], 0.08),
                ...(popover.open && {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                }),
              }}
            >
              <Avatar
                src={user.profileImage || '/assets/images/placeholder.svg'}
                alt={user.name}
                sx={{
                  width: 36,
                  height: 36,
                  border: (theme) => `solid 2px ${theme.palette.background.default}`,
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>

          <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
            <Box sx={{ p: 2, pb: 1.5 }}>
              <Typography variant="subtitle2" noWrap>
                {user.name}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {user.email}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack sx={{ p: 1 }}>
              {OPTIONS.map((option) => (
                <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
                  {option.label}
                </MenuItem>
              ))}
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem
              onClick={handleLogout}
              sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
            >
              로그아웃
            </MenuItem>
          </CustomPopover>
        </>
      )}
    </>
  );
}
