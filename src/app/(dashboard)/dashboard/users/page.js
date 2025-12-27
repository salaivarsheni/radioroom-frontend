'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// material-ui
import { Grid, Typography, Button, TextField, InputAdornment, Stack } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// assets
import { SearchNormal1 } from 'iconsax-react';
import axiosServices from 'utils/axios';
// ==============================|| USERS DASHBOARD ||============================== //

const UsersPage = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Header */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ position: 'relative', mb: 3 }}>
          <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Users Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ position: 'absolute', right: 0 }}
            onClick={() => router.push('/dashboard/users/add-users')}
          >
            Add Users
          </Button>
        </Stack>
      </Grid>

      {/* Main Content */}
      <Grid item xs={12}>
        <MainCard>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <Typography variant="h5" color="textSecondary">
                Enter user id / Email / Mobile number :
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                placeholder="Enter user id or mobile or email"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchNormal1 size={24} color="#697586" />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => router.push(`/dashboard/users/details?id=${searchValue}`)}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default UsersPage;
