import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';
import { useNavigate,useLocation  } from 'react-router-dom';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();
  const navigateTo = useNavigate ();
  const location = useLocation();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    <Box
      component="img"
      src="https://firststateupdate.com/wp-content/uploads/2020/03/img_5e5d0f9c06729.jpg"
      sx={{ width: 200, height: 120, cursor: 'pointer', ...sx }}
    />
  );

  // const logo = (
  //   <Box
  //     ref={ref}
  //     component="div"
  //     sx={{
  //       width: 80,
  //       height: 40,
  //       display: 'inline-flex',
  //       ...sx,
  //     }}
  //     {...other}
  //   >
    
  //   </Box>

  // );
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
    console.log("isLoginPage",isLoginPage)
  if (disabledLink) {
    return logo;
  }

  return (
    (!isLoginPage && !isSignupPage) &&(
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
    )
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
