/* eslint-disable import/no-unresolved */
// eslint-disable-next-line
import { postData } from 'src/services/apiService';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
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

export default function SignUpView() {
  const theme = useTheme();

  const router = useRouter();

  const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '', password: '', repassword: '', role: '' });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    repassword: '',
    role: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Update the respective field in the formData state

  };

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleClick = async () => {
    const isValid = validateForm();
    console.log("FormErrors", formErrors)
    if (isValid) {
      try {
        const response = await postData('register', formData);

        console.log('api response', response);
        router.push('/login');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

  const onRoleSelect = async (value) => {
    setFormData({ ...formData, "role": value });


  }

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
      valid = false;
    }

    if (!formData.name) {
      errors.name = 'Name is required';
      valid = false;
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
      valid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      valid = false;
    }

    if (!formData.repassword) {
      errors.repassword = 'Re-Password is required';
      valid = false;
    }
    console.log("formData", formData)
    if (!formData.role) {
      errors.role = "Please select role";
      valid = false;
    }


    // Add more validation rules for other fields as needed...

    setFormErrors(errors);
    return valid;
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="name" label="Name" value={formData.name}
          error={!!formErrors.name}
          helperText={formErrors.name}
          onChange={handleChange} />
        <TextField
          name="email"
          label="Email address"
          value={formData.email}
          error={!!formErrors.email}
          helperText={formErrors.email}
          onChange={handleChange}
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber}
          error={!!formErrors.phoneNumber}
          helperText={formErrors.phoneNumber}
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
        <TextField
          name="repassword"
          label="Re-Password"
          type={showRePassword ? 'text' : 'password'}
          value={formData.repassword}
          error={!!formErrors.repassword}
          helperText={formErrors.repassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowRePassword(!showRePassword)} edge="end">
                  <Iconify icon={showRePassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
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
        Register
      </LoadingButton>
    </>
  );
  /* name,number,email,password, re-password */
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        minHeight: '100%',
        overflowY: 'auto',
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
          <Typography variant="h4">Register for Farmers Market</Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <a href="/login">Login here</a>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Tooltip title="User">
              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                sx={{ borderColor: formData.role === 2 ? theme.palette.primary.dark : alpha(theme.palette.grey[500], 0.16), }}
                onClick={() => onRoleSelect(2)}
              >
                <Iconify icon="fluent-emoji:person-light" color="#DF3E30" />
              </Button>
            </Tooltip>
            <Tooltip title="Farmer">
              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                sx={{ borderColor: formData.role === 1 ? theme.palette.primary.dark : alpha(theme.palette.grey[500], 0.16), }}
                onClick={() => onRoleSelect(1)}
              >
                <Iconify icon="twemoji:farmer" color="#1877F2" />
              </Button>
            </Tooltip>
          </Stack>

          {formErrors.role !== '' && <div className="error">{formErrors.role}</div>}
          <Divider sx={{ my: 3 }} />
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
