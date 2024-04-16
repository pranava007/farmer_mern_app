import { Helmet } from 'react-helmet-async';

import { CreateProductView } from 'src/sections/create-products';

// ----------------------------------------------------------------------

export default function CreateProductPage() {
  return (
    <>
      <Helmet>
        <title> Add Products | Minimal UI </title>
      </Helmet>

      <CreateProductView />
    </>
  );
}
