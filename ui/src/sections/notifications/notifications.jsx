/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line

import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

import { getData, putData } from 'src/services/apiService';
import { usePathname } from 'src/routes/hooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';
import Button from '@mui/material/Button';

export default function NotificationView() {
  const pathname = usePathname();
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const detail = localStorage.getItem('loginDetails');
    if (!detail) {
      Error('User details is null');
    }
    const userDetail = JSON.parse(detail);
    setUserDetails(userDetail)
    if (userDetail.role === "1") {
      fetchFarmerData(userDetail.userId)
    }
    else {
      fetchData(userDetail.userId);
    }
  }, [pathname]);

  const handleButtonClick = async (status, notificationId) => {
    // Call the function passed from the parent component
    try {
      await putData('notification/status/update', { notificationId, status });
      toast.success('Status updated successfully');
      if (userDetails.role === "1") {
        fetchFarmerData(userDetails.userId)
      }
      else {
        fetchData(userDetails.userId);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
    }
  };

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
      const response = await getData(`notification/list/${userId}`);
      response.map(x => {
        const dateTime = new Date(x.notificationDate);
        const formattedDateTime = dateTime.toLocaleString('en-US', options);
        x.notificationDate = formattedDateTime
        return x;
      })
      const jsonData = response;
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchFarmerData = async (userId) => {
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
      const response = await getData(`notification/farmer/list/${userId}`);
      response.map(x => {
        const dateTime = new Date(x.notificationDate);
        const formattedDateTime = dateTime.toLocaleString('en-US', options);
        x.notificationDate = formattedDateTime
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
          <TableCell>Message</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Status</TableCell>
          {userDetails.role === "1" ? (
            <TableCell>Action</TableCell>
          ) : null}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {index + 1} {/* SNO starts from 1 */}
            </TableCell>
            <TableCell component="th" scope="row">
              {row.message}
            </TableCell>
            <TableCell>{row.notificationDate}</TableCell>
            <TableCell>{row.status}</TableCell>
            {userDetails.role === "1" ? (
              <TableCell>
                <Button variant="contained" onClick={() => handleButtonClick("Accept", row._id)}  disabled={row.status === 'Accept'}>
                  Accept
                </Button>
                <Button style={{ backgroundColor: row.status === 'Accept' ? 'lightcoral' : 'red', color: 'white', marginLeft: '10px' }} variant="contained" onClick={() => handleButtonClick("Decline", row._id)}  disabled={row.status === 'Accept'}>
                  Decline
                </Button>
              </TableCell>
            ) : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
