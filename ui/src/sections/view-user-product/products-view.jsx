
import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { getData } from 'src/services/apiService';
import TextField from '@mui/material/TextField';
import ProductCard from './product-card';
import ProductCartWidget from './product-cart-widget';
// ----------------------------------------------------------------------


export default function ProductsView() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [userDetails, setuserDetail] = useState();
  const navigateTo = useNavigate();

  const handleAddProductClick = () => {
    navigateTo('/create-product');
  };

  useEffect(() => {
    const detail = localStorage.getItem('loginDetails');
    if (!detail) {
      Error('User details is null');
    }
    const userDetail = JSON.parse(detail);
    setuserDetail(userDetail)
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      let response = await getData("product/list");
      response = response.map((x) => {
        const url = `data:image/png;base64,${x.image.data}`;
        x.url = url;
        return x
      });
      const jsonData = response;
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchText(value);

  }
  const handleSearch = async () => {
    // Handle search action here
    try {
      let response = await getData(`product/search/${userDetails.userId}/${searchText}`);
      response = response.map((x) => {
        const url = `data:image/png;base64,${x.image.data}`;
        x.url = url;
        return x
      });
      const jsonData = response;
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const resetData = async () => {
    setSearchText("")
    fetchData();
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          name="searchText"
          label="Search"
          value={searchText}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Search
        </Button>
        <Button variant="contained" onClick={resetData} style={{ marginLeft: '10px' }}>
          Reset
        </Button>
      </div>
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={3}>
        {data.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={3}>
            <Link to={`/cart/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ProductCard product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}
