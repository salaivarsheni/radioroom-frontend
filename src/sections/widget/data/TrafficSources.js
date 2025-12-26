// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { useMemo, useEffect, useState } from 'react';
import axiosServices from 'utils/axios';


// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// ===========================|| DATA WIDGET - TRAFFIC SOURCES ||=========================== //

const TrafficSources = () => {
  const [subscriptionSummary, setSubscriptionSummary] = useState(null);

  useEffect(() => {
    const fetchSubscriptionSummary = async () => {
      // Calls your API to get the JSON with { categories, monthly, quarterly, annual } arrays
      try {
        const res = await axiosServices.post("", { method: "subscription_summary" });
        setSubscriptionSummary(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSubscriptionSummary();
  }, []);
  return (
    <MainCard
      title="Overall Plan Details"
      subheader={
        <Typography variant="caption" color="secondary">
          Overview of subscription plan distribution
        </Typography>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item sm zeroMinWidth>
              <Typography variant="body2">Annual</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" align="right">
                {subscriptionSummary?.annual_percentage || '0%'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {/* linear progress is the line indicating acc to percentage */}
              <LinearProgress variant="determinate" value={parseFloat(subscriptionSummary?.annual_percentage) || 0} color="primary" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item sm zeroMinWidth>
              <Typography variant="body2">Monthly</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" align="right">
                {subscriptionSummary?.monthly_percentage || '0%'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={parseFloat(subscriptionSummary?.monthly_percentage) || 0} color="primary" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item sm zeroMinWidth>
              <Typography variant="body2">Quarterly</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" align="right">
                {subscriptionSummary?.quarterly_percentage || '0%'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={parseFloat(subscriptionSummary?.quarterly_percentage) || 0} color="primary" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};


export default TrafficSources;
