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
import { getData, postData } from 'src/services/apiService';
import { usePathname, useRouter } from 'src/routes/hooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { InputLabel } from '@mui/material';
import { NumberInputWithButtons } from './number-input-with-buttons';

export default function CartView() {
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
    description: '',
    productId: 0,
    quantity1: 0,
    quantity2: 0,
    quantity3: 0,
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    phoneNumber: '',
    dob: '',
    gender: '',
    pincode: '',
    latitude: '',
    longitude: '',
  });

  const { productId } = useParams();
  useEffect(() => {

    const detail = localStorage.getItem('loginDetails');
    if (!detail) {
      Error('User details is null');
    }

    const userDetails = JSON.parse(detail);
    setUserDetail(userDetails);

    fetchUserData(userDetails.userId, productId);
  }, [pathname, productId]);

  const validateForm = () => {
    let valid = true;
    const errors = {};
    console.log("formData", formData)
    if (!formData.quantity1 && !formData.quantity2 && !formData.quantity3) {
      errors.name = 'Quantity is required';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const fetchUserData = async (userId, prodId) => {
    const userDetail1 = await getData(`product/${prodId}`);
    console.log("userDetail1", userDetail1)
    if (userDetail1.image) {
      const url = `data:image/png;base64,${userDetail1.image.data}`;
      setPreviewURL(url);
    }

    setFormData({
      name: userDetail1.name,
      description: userDetail1.description,
      productId: prodId,
      userId,
      quantity1: 0,
      quantity2: 0,
      quantity3: 0,
      imageStatus: 'Unchanged',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Update the respective field in the formData state
  };

  const handleUpdate = async () => {
    const isValid = validateForm();
    console.log("FormData", formData)
    if (isValid) {
      try {
        await postData('order/create', formData);
        router.push('/shop');
        toast.success('Ordered successfully');
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('Failed to update profile');
      }
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <InputLabel>Name: {formData.name}</InputLabel>
        <InputLabel>Description: {formData.description}</InputLabel>
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
        Buy
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
          <Typography variant="h4">Add to Cart</Typography>
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
