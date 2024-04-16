/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line

import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

import { getData } from 'src/services/apiService';
import { usePathname } from 'src/routes/hooks';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';

export default function HistoryView() {
  const pathname = usePathname();
  const [data, setData] = useState([]);

  useEffect(() => {
    const detail = localStorage.getItem('loginDetails');
    if (!detail) {
      Error('User details is null');
    }
    const userDetails = JSON.parse(detail);
    fetchData(userDetails.userId);
  }, [pathname]);

  const fetchData = async (userId) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    };
    try {
      const response = await getData(`order/user/list/${userId}`);
      response.map(x => {
        const dateTime = new Date(x.purchaseDate);
        const formattedDateTime = dateTime.toLocaleString('en-US', options);
        x.purchaseDate = formattedDateTime
        const url = `data:image/png;base64,${x.productImage.data}`;
        x.url = url;
        return x;
      })
      const jsonData = response;
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /* name,number,email,password, re-password */
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>S.No</TableCell>
          <TableCell>Product Name</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Farmer Name</TableCell>
          <TableCell>Farmer Phone Number</TableCell>
          <TableCell>Farmer Address</TableCell>
          <TableCell>Order Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {index + 1} {/* SNO starts from 1 */}
            </TableCell>
            <TableCell>{row.product}</TableCell>
            <TableCell>  <img
              src={row.url}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '100px' }}
            /></TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.farmerName}</TableCell>
            <TableCell>{row.farmerPhoneNumber}</TableCell>
            <TableCell>{row.farmerAddress}</TableCell>
            <TableCell>{row.purchaseDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
