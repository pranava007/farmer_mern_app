/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line

import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, styled, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import MenuItem from '@mui/material/MenuItem';
// ----------------------------------------------------------------------

import Button from '@mui/material/Button';
import { getData, putFormData } from 'src/services/apiService';
import { usePathname, useRouter } from 'src/routes/hooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ProfileView() {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const pathname = usePathname();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [userDetail, setUserDetail] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();

  const StyledDatePicker = styled(DatePicker)({
    width: '100%',
    height: '9vh',
    border: '1px solid #8080805e',
    borderRadius: '0.8rem',
    '& .react-datepicker-wrapper': {
      width: '100%',
    },
  });

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    dob: new Date(),
    gender: '',
    pincode: '',
    imageStatus: '',
    latitude: '',
    longitude: '',
    address:'',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    phoneNumber: '',
    dob: '',
    gender: '',
    pincode: '',
    latitude: '',
    longitude: '',
    address:'',
  });

  const handleDateChange = (date) => {
    setFormData({ ...formData, "dob": date });
  };

  useEffect(() => {
    const detail = localStorage.getItem('loginDetails');
    if (!detail) {
      Error('User details is null');
    }

    const userDetails = JSON.parse(detail);
    setUserDetail(userDetails);

    fetchUserData(userDetails.userId);
  }, [pathname]);

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.name) {
      errors.name = 'Name is required';
      valid = false;
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
      valid = false;
    }

    if (!formData.pincode) {
      errors.pincode = 'Pincode is required';
      valid = false;
    }

    if (!formData.latitude) {
      errors.latitude = 'Latitude is required';
      valid = false;
    }

    if (!formData.longitude) {
      errors.longitude = 'Longitude is required';
      valid = false;
    }

    if (!formData.gender) {
      errors.gender = 'Gender is required';
      valid = false;
    }

    if (!formData.address) {
      errors.address = 'Address is required';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const fetchUserData = async (userId) => {
    const userDetail1 = await getData(`user/user/${userId}`);

    if (userDetail1.image) {
      const url = `data:image/png;base64,${userDetail1.image.data}`;
      setPreviewURL(url);
    }

    setFormData({
      name: userDetail1.name,
      phoneNumber: userDetail1.phoneNumber,
      pincode: userDetail1.pincode,
      latitude: userDetail1.latitude,
      longitude: userDetail1.longitude,
      address: userDetail1.address,
      dob: userDetail1.dob ? userDetail1.dob : new Date(),
      gender: userDetail1.gender,
      imageStatus: 'Unchanged',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Update the respective field in the formData state
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFormData({ ...formData, imageStatus: 'Added' });
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    const isValid = validateForm();

    if (isValid) {
      const formData1 = new FormData();
      formData1.append('name', formData.name);
      formData1.append('phoneNumber', formData.phoneNumber);
      formData1.append('dob', formData.dob);
      formData1.append('gender', formData.gender);
      formData1.append('pincode', formData.pincode);
      formData1.append('latitude', formData.latitude);
      formData1.append('longitude', formData.longitude);
      formData1.append('address', formData.address);
      formData1.append('image', selectedFile);
      formData1.append('userId', userDetail.userId)
      formData1.append("imageStatus", formData.imageStatus);
      try {
        await putFormData('user/update', formData1);
        router.push('/dashboard');
        toast.success('Profile updated successfully');
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('Failed to update profile');
      }
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

  const genders = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="name"
          label="Name"
          error={!!formErrors.name}
          helperText={formErrors.name}
          value={formData.name}
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
        <StyledDatePicker
          selected={formData.dob}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          maxDate={new Date()} // Restrict future dates
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={15}
        />
        <TextField
          select
          name="gender"
          label="Gender"
          value={formData.gender}
          onChange={handleChange}
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="pincode"
          label="Pincode"
          value={formData.pincode}
          error={!!formErrors.pincode}
          helperText={formErrors.pincode}
          onChange={handleChange}
        />
        <TextField
          name="latitude"
          label="Latitude"
          value={formData.latitude}
          error={!!formErrors.latitude}
          helperText={formErrors.latitude}
          onChange={handleChange}
        />
        <TextField
          name="longitude"
          label="Longitude"
          value={formData.longitude}
          error={!!formErrors.longitude}
          helperText={formErrors.longitude}
          onChange={handleChange}
        />
         <TextField
          name="address"
          label="address"
          value={formData.address}
          error={!!formErrors.address}
          helperText={formErrors.address}
          onChange={handleChange}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }} />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleUpdate}
      >
        Update
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
            maxWidth: 620,
          }}
        >
          <Typography variant="h4">Profile Update</Typography>
          <Divider sx={{ my: 3 }} />
          <Stack direction="row" spacing={3}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
            <Button variant="outlined" onClick={handleButtonClick}>
              Select Image
            </Button>
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Stack direction="row" spacing={3}>
            {previewURL && (
              <div>
                <img
                  src={previewURL}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '100px' }}
                />
              </div>
            )}
          </Stack>
          <Divider sx={{ my: 3 }} />
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
