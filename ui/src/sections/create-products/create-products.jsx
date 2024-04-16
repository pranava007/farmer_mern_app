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
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
// ----------------------------------------------------------------------

import Button from '@mui/material/Button';
import { getData, postFormData } from 'src/services/apiService';
import { usePathname, useRouter } from 'src/routes/hooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import MenuItem from '@mui/material/MenuItem';
import { NumberInputWithButtons } from './number-input-with-buttons';


export default function CreateProductView() {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const pathname = usePathname();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [userDetail, setUserDetail] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity1: 0,
    quantity2: 0,
    quantity3: 0,
    category: '',
    imageStatus: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    quantity1: 0,
    quantity2: 0,
    quantity3: 0,
    category: '',
    imageStatus: '',
  });
  const router = useRouter();
  useEffect(() => {
    const detail = localStorage.getItem('loginDetails');
    if (!detail) {
      Error('User details is null');
    }

    const userDetails = JSON.parse(detail);
    console.log("userDetails", userDetails)
    setUserDetail(userDetails);
  }, [pathname]);

  const validateForm = () => {
    const valid = true;
    // const errors = {};

    // if (!formData.name) {
    //   errors.name = 'Name is required';
    //   valid = false;
    // }

    // if (!formData.phoneNumber) {
    //   errors.phoneNumber = 'Phone Number is required';
    //   valid = false;
    // }

    // if (!formData.pincode) {
    //   errors.pincode = 'Pincode is required';
    //   valid = false;
    // }

    // if (!formData.gender) {
    //   errors.gender = 'Gender is required';
    //   valid = false;
    // }

    // // Add more validation rules for other fields as needed...

    // setFormErrors(errors);
    return valid;
  };

  // const fetchUserData = async (userId) => {
  //   const userDetail1 = await getData(`product/${userId}`);

  //   const url = `data:image/png;base64,${userDetail1.image.data}`;

  //   setPreviewURL(url);

  //   setFormData({
  //     name: userDetail1.name,
  //     description: userDetail1.description,
  //     quantity1: 0,
  //     quantity2: 0,
  //     quantity3: 0,
  //     imageStatus: 'Unchanged',
  //   });
  //   console.log('(userDetail1.dob', userDetail1.dob);
  //   const dat = dayjs(userDetail1.dob).toDate();
  // };

  ;

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
      formData1.append('description', formData.description);
      formData1.append('quantity1', formData.quantity1);
      formData1.append('quantity2', formData.quantity2);
      formData1.append('quantity3', formData.quantity3);
      formData1.append('image', selectedFile);
      formData1.append('userId', userDetail.userId);
      formData1.append('category', formData.category);
      formData1.append("imageStatus", formData.imageStatus);
      try {
        await postFormData('product/create', formData1);
        toast.success('Product Created successfully');
        router.push('/products');
      } catch (error) {
        console.error('Error creating product:', error);
        toast.error('Failed to create product');
      }
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

  const category = [
    {
      value: 'vegetable',
      label: 'Vegetable',
    },
    {
      value: 'Fruits',
      label: 'Fruits',
    }
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
          name="description"
          label="Description"
          value={formData.description}
          error={!!formErrors.description}
          helperText={formErrors.description}
          onChange={handleChange}
        />
        <NumberInputWithButtons
          name="quantity1"
          label="1kg"
          value={formData.quantity1}
          onChange={(newValue) =>
            setFormData((prevState) => ({ ...prevState, quantity1: newValue }))
          }
        />
        <NumberInputWithButtons
          name="quantity2"
          label="500g"
          value={formData.quantity2}
          onChange={(newValue) =>
            setFormData((prevState) => ({ ...prevState, quantity2: newValue }))
          }
        />
        <NumberInputWithButtons
          name="quantity3"
          label="5kg"
          value={formData.quantity3}
          onChange={(newValue) =>
            setFormData((prevState) => ({ ...prevState, quantity3: newValue }))
          }
        />
        <TextField
          select
          name="category"
          label="Category"
          value={formData.gender}
          onChange={handleChange}
        >
          {category.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
        Add
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

          <Typography variant="h4">Add Products</Typography>

          <Divider sx={{ my: 5 }} />
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
