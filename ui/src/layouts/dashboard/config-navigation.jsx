import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
    role: ["1", "2"]
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: icon('ic_user'),
    role: ["1", "2"]
  },
  {
    title: 'Products',
    path: '/products',
    icon: icon('ic_cart'),
    role: ["1"]
  },
  {
    title: 'Shop',
    path: '/shop',
    icon: icon('ic_cart'),
    role: ["2"]
  },
  {
    title: 'History',
    path: '/history',
    icon: icon('ic_cart'),
    role: ["2"]
  },
  {
    title: 'Notification',
    path: '/notification',
    icon: icon('ic_cart'),
    role: ["1", "2"]
  },
];

export default navConfig;
