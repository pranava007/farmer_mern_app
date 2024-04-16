import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useRouter, usePathname } from 'src/routes/hooks';
import { account } from 'src/_mock/account';
import { getData } from 'src/services/apiService';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    link: '/'
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    link: '/profile'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [userDetail, setsetuserDetail] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const [previewURL, setPreviewURL] = useState(null);
  const [userRole, setUserRole] = useState('')

  useEffect(() => {

    const userDet = JSON.parse(localStorage.getItem("loginDetails"))
    setUserRole(userDet.role)
    getUserDetails(userDet.userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  const getUserDetails = async (userId) => {

    const userDetail1 = await getData(`user/user/${userId}`);

    if (userDetail1.image) {
      const url = `data:image/png;base64,${userDetail1.image.data}`;
      setPreviewURL(url);
    }
    setsetuserDetail(userDetail1)
  }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleNav = (link) => {
    router.push(link);
  }

  const handleLogout = (link) => {
    localStorage.clear();
    router.push(link);
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={previewURL || account.photoURL}
          alt={userDetail?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {userDetail?.name}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={x => handleNav(option.link)}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={x => handleLogout('/login')}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
