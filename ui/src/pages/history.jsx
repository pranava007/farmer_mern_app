import { Helmet } from 'react-helmet-async';

import { HistoryView } from 'src/sections/history';

// ----------------------------------------------------------------------

export default function SignUpPage() {
  return (
    <>   
      <Helmet>
        <title> Notification | Farmer Market</title>
      </Helmet>
      <HistoryView />
    </>
  );
}
