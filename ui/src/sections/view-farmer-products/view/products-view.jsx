import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { getData } from 'src/services/apiService';
import ProductCard from '../product-card';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const navigateTo = useNavigate();

  const handleAddProductClick = () => {
    navigateTo('/create-product');
  };

  useEffect(() => {
    const detail = localStorage.getItem('loginDetails');
    if (!detail) {
      Error('User details is null');
    }

    const userDetails = JSON.parse(detail);
    setUserDetail(userDetails);
    fetchData(userDetails.userId);
  }, []);

  const fetchData = async (userId) => {
    try {
      let response = await getData(`product/list/${userId}`);
      console.log('Response', response);
      response = response.map((x) => {
        const url = `data:image/png;base64,${x.image.data}`;
        x.url = url;
        return x;
      });
      const jsonData = response;
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>
      <Stack direction="row" spacing={2}>
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <Button variant="outlined" color="primary" onClick={handleAddProductClick}>
            Add Product
          </Button>
        </div>
      </Stack>
      <Grid container spacing={3}>
        {data.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
