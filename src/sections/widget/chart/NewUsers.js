'use client';

import { useState, useEffect } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import axiosServices from 'utils/axios';

// ASSETS
import { Book } from 'iconsax-react';

// ==============================|| CHART WIDGETS - NEW ORDER ||============================== //

const NewOrders = () => {
  const theme = useTheme();
  const [paidStoryCount, setPaidStoryCount] = useState(0);
  const [paidStoryList, setPaidStoryList] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const fetchPaidStories = async () => {
      try {
        const response = await axiosServices.post('', { method: 'free_paid_count' });

        let count = 0;
        const data = response.data;

        if (Array.isArray(data?.data)) {
          // Assuming first item if array, or summing up if multiple
          count = data.data.length > 0 ? data.data[0]?.paid_story_count : 0;
        } else if (data?.data && typeof data.data === 'object') {
          count = data.data.paid_story_count || 0;
        } else if (data?.paid_story_count !== undefined) {
          count = data.paid_story_count || 0;
        }
        setPaidStoryCount(count);
      } catch (error) {
        console.error('Error fetching free stories:', error);
      }
    };
    fetchPaidStories();
  }, []);
  useEffect(() => {
    const fetchPaidStorieslist = async () => {
      try {
        const response = await axiosServices.post('', { method: 'free_paid_list' });
        console.log('Paid stories response:', response.data);

        setPaidStoryList(response.data);
      } catch (error) {
        console.error('Error fetching paid stories:', error);
      }
    };
    fetchPaidStorieslist();
  }, []);

  const handleViewMore = () => {
    setShowList((prev) => !prev);
  };
  return (
    <MainCard content={false}>
      <Box sx={{ p: 3, pb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Stack spacing={0.5}>
                <Typography variant="h5" color="textSecondary">
                  Paid Stories
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {paidStoryCount}
                </Typography>
              </Stack>
              <Avatar
                sx={{
                  color: theme.palette.primary.main,
                  bgcolor: theme.palette.primary.lighter,
                  height: 40,
                  width: 40
                }}
              >
                <Book size={24} />
              </Avatar>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined" color="primary" onClick={handleViewMore}>
              {showList ? 'Hide' : 'View more'}
            </Button>
            {showList && paidStoryList?.paid_data?.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    tableLayout: 'fixed'
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          width: '80px',
                          textAlign: 'left',
                          padding: '8px',
                          borderBottom: '2px solid #ddd'
                        }}
                      >
                        Story ID
                      </th>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '8px',
                          borderBottom: '2px solid #ddd'
                        }}
                      >
                        Story Name
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paidStoryList.paid_data.map((item) => (
                      <tr key={item.story_id}>
                        <td style={{ padding: '8px' }}>{item.story_id}</td>
                        <td style={{ padding: '8px' }}>{item.story_title_english}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default NewOrders;
