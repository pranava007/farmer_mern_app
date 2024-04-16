import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/view-user-product';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
