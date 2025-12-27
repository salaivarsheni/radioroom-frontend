'use client';
import { useState, useEffect } from 'react';
import axiosServices from 'utils/axios';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AddCircle } from 'iconsax-react';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// CONSTANTS
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const AddUsersPage = () => {
  const [value, setValue] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async () => {
    const formData = {
      userName,
      userEmail,
      userPassword,
      mobileNumber
    };
    try {
      const response = await axiosServices.post('', {
        method: 'addUser',
        formData
      });
      if (response.data && response.data.status === 1) {
        alert('User added successfully');
      } else {
        alert('User added failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={12} lg={12}>
        <MainCard title="New User" sx={{ bgcolor: '#eff4fa' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="User Name"
                sx={{ bgcolor: 'white' }}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="User Email"
                sx={{ bgcolor: 'white' }}
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="User Password"
                sx={{ bgcolor: 'white' }}
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Mobile Number"
                sx={{ bgcolor: 'white' }}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddCircle />}
                onClick={handleSubmit}
                sx={{
                  bgcolor: 'darkred',
                  '&:hover': { bgcolor: 'darkred' },
                  backgroundColor: 'red'
                }}
              >
                Add User
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default AddUsersPage;
