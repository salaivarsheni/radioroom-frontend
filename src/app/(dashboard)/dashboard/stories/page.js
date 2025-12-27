'use client';
// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// PROJECT IMPORTS
import DashboardAnalytics from 'views/dashboard/DashboardAnalytics';
import StoryCard from 'sections/widget/data/Storycard';
import { useRouter } from 'next/navigation';

// ==============================|| STORIES PAGE ||============================== //

const StoriesPage = () => {
  const router = useRouter();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={() => router.push('/dashboard/stories/add-stories')}>
          Add Stories
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ mb: 3 }}>
        <DashboardAnalytics />
      </Grid>
      <Grid item xs={12}>
        <StoryCard />
      </Grid>
    </Grid>
  );
};

export default StoriesPage;
