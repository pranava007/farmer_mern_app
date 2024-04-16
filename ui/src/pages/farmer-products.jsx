import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/view-farmer-products/view';

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
