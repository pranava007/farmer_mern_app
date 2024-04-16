import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>
      <Grid container spacing={3}>
        <img alt="" src="https://thumbs.dreamstime.com/z/farm-shop-local-stall-market-selling-vegetables-cartoon-vector-illustration-isolated-white-background-fresh-food-98889730.jpg?w=992"

        />
      </Grid>
    </Container>
  );
}
