import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/profile';

// ----------------------------------------------------------------------

export default function SignUpPage() {
  return (
    <>
      <Helmet>
        <title> Profile | Farmer Market</title>
      </Helmet>
      <ProfileView />
    </>
  );
}
