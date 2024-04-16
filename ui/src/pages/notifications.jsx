import { Helmet } from 'react-helmet-async';

import { NotificationView } from 'src/sections/notifications';

// ----------------------------------------------------------------------

export default function NotificationPage() {
  return (
    <>   
      <Helmet>
        <title> Notification | Farmer Market</title>
      </Helmet>
      <NotificationView />
    </>
  );
}
