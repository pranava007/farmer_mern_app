// eslint-disable-next-line
import { postData } from 'src/services/apiService';
import { useState } from 'react';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Update the respective field in the formData state
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await postData('/login', formData);
        localStorage.setItem('loginDetails', JSON.stringify(response));
        console.log('api response', response);
        router.push('/dashboard');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
      valid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      valid = false;
    }

    // Add more validation rules for other fields as needed...

    setFormErrors(errors);
    return valid;
  };
  /* email ,password */

  /* profile  - photo, name, dob , age, gender, address, pincode , submit btn */
  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          error={!!formErrors.email}
          helperText={formErrors.email}
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          error={!!formErrors.password}
          helperText={formErrors.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }} />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Farmers Market</Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <a href="/signup">Get started</a>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
