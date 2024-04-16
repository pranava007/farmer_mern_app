import { Helmet } from 'react-helmet-async';

import { SignUpView } from 'src/sections/signup';

// ----------------------------------------------------------------------

export default function SignUpPage() {
  return (
    <>
      <Helmet>
        <title> Sign Up | Farmer Market </title>
      </Helmet>
      <SignUpView />
    </>
  );
}
