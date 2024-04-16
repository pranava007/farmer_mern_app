import { Helmet } from 'react-helmet-async';

import { CartView } from 'src/sections/cart';

// ----------------------------------------------------------------------

export default function SignUpPage() {
  return (
    <>
      <Helmet>
        <title> Profile | Farmer Market</title>
      </Helmet>
      <CartView />
    </>
  );
}
