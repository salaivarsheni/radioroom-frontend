'use client';
import { useState, useEffect } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axiosServices from 'utils/axios';

// PROJECT IMPORTS
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';


import RepeatCustomerRate from 'sections/widget/chart/RepeatCustomerRate';
import TrafficSources from 'sections/widget/data/TrafficSources';
import ProjectAnalytics from 'sections/widget/chart/ProjectAnalytics';

import Products from 'sections/widget/data/Products';


// ASSETS
import { ArrowDown, ArrowUp, Book, Calendar, CloudChange, Wallet3 } from 'iconsax-react';
import WelcomeBanner from 'sections/dashboard/default/WelcomeBanner';
import { Divider } from '../../../node_modules/@mui/material/index';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const theme = useTheme();
  const [storyData, setStoryData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [authorData, setAuthorData] = useState(null);
  const [authorCard, setAuthorCard] = useState(null);
  const [subscriptionCount, setSubscriptionCount] = useState(null);
  const [narrator, setNarrator] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [activePlan, setActivePlan] = useState(null);
  // after the pg mounts these fxn run once
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res1 = await axiosServices.post("", { method: "story" });
        setStoryData(res1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchUser = async () => {
      try {
        const res = await axiosServices.post("", { method: "user" });
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchPlan = async () => {
      try {
        const res = await axiosServices.post("", { method: "plans" });
        setPlanData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchAuthor = async () => {
      try {
        const res = await axiosServices.post("", { method: "author" });
        setAuthorData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchAuthorCard = async () => {
      try {
        const res = await axiosServices.post("", { method: "author_card" });
        setAuthorCard(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchNarrator = async () => {
      try {
        const res = await axiosServices.post("", { method: "narrator" });
        setNarrator(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchSubscription = async () => {
      try {
        const res = await axiosServices.post("", { method: "subscription_count" });
        setSubscriptionCount(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchUserActivity = async () => {
      try {
        const res = await axiosServices.post("", { method: "active_users" });
        setUserActivity(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchActivePlan = async () => {
      try {
        const res = await axiosServices.post("", { method: "active_plans" });
        setActivePlan(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUser();
    fetchStory();
    fetchPlan();
    fetchAuthor();
    fetchAuthorCard();
    fetchSubscription();
    fetchNarrator();
    fetchUserActivity();
    fetchActivePlan();
  }, []);
  // console.log("storyData", storyData?.total);
  // console.log("storylanguage", storyData?.data?.[0]?.language_name);
  // console.log("count", storyData?.data?.[0]?.count);
  // console.log("userData", userData?.[0]?.total_users);
  // console.log("subscribed_user", userData?.[0]?.subscribed_user);
  // console.log("unsubscribed_user", userData?.[0]?.unsubscribed_user);
  // console.log("planData", planData?.[0]?.plan_name);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <WelcomeBanner />
      </Grid>

      {/* row 1 */}
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title={`Registered Users - ${userData?.[0]?.total_users}  `}
          iconPrimary={<Wallet3 />}
          sx={{ height: '100%' }}
        >
          {userData?.map((item, index) => (
            <Box key={index} sx={{ width: '100%' }}>
              <Box display="flex" justifyContent="space-between" my={2}>
                <Typography variant="body2" mr={1}>
                  Subscribers:
                </Typography>
                <Typography variant="body2" mr={-6} fontWeight={600}>
                  {item.subscribed_user}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" my={2}>
                <Typography variant="body2" mr={1}>
                  Unsubscribers:
                </Typography>
                <Typography variant="body2" mr={-6} fontWeight={600}>
                  {item.unsubscribed_user}
                </Typography>
              </Box>
            </Box>
          ))}

        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={6} lg={3} overflow={'inherit'}>
        <EcommerceDataCard
          title={`Stories - ${storyData?.total || ''}`}
          count=""
          color="warning"
          iconPrimary={<Book color={theme.palette.warning.dark} />}
          sx={{ height: '100%' }}
        >
          {storyData?.data?.map((item) => (
            <Box key={item.language_name} display="flex" justifyContent="space-between" my={0.5}>
              <Typography variant="body2" mr={1}>{item.language_name}</Typography>
              <Typography variant="body2" mr={-6} fontWeight={600}>{item.count}</Typography>
            </Box>
          ))}
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title={`Authors - ${authorData?.total || ''}`}
          count=""
          color="success"
          iconPrimary={<Calendar color={theme.palette.success.darker} />}
          sx={{ height: '100%' }}
        >
          {authorCard?.map((item, index) => (
            <Box key={index} sx={{ width: '100%' }}>
              <Box display="flex" justifyContent="space-between" my={0.5}>
                <Typography variant="body2" mr={1}>
                  Active Authors:
                </Typography>
                <Typography variant="body2" mr={-6} fontWeight={600}>
                  {item.active_authors}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" my={0.5}>
                <Typography variant="body2" mr={1}>
                  Inactive Authors:
                </Typography>
                <Typography variant="body2" mr={-6} fontWeight={600}>
                  {item.inactive_authors}
                </Typography>
              </Box>
            </Box>
          ))}
          {narrator?.data?.map((item, index) => (
            <Box key={index} sx={{ width: '100%' }}>
              <Box display="flex" justifyContent="space-between" my={0.5}>
                <Typography variant="body2" mr={1}>
                  Active Narrators:
                </Typography>
                <Typography variant="body2" mr={-6} fontWeight={600}>
                  {item.active_narrators}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" my={0.5}>
                <Typography variant="body2" mr={1}>
                  Inactive Narrators:
                </Typography>
                <Typography variant="body2" mr={-6} fontWeight={600}>
                  {item.inactive_narrators}
                </Typography>
              </Box>
            </Box>
          ))}
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title={`Plans-${planData?.total || ''}`}
          count=""
          color="error"
          iconPrimary={<CloudChange color={theme.palette.error.dark} />}
          sx={{ height: '100%' }}
        >
          {planData?.data?.map((item, index) => (
            <Box key={item.plan_name} display="flex" justifyContent="space-between" my={0.5}>
              <Typography variant="body2" mr={1}>{item.plan_name}</Typography>
              <Typography variant="body2" mr={-6} fontWeight={600}>{item.user_count}</Typography>
            </Box>
          ))}
        </EcommerceDataCard>
      </Grid>

      {/* row 2 */}
      <Grid item xs={12}>
        <RepeatCustomerRate />
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={8}>
        <Products />
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <EcommerceDataCard
            title="Active User Details"
            count="" color="error"
            iconPrimary={<CloudChange color={theme.palette.error.dark} />}>
            <Box sx={{ width: '100%' }}>
              <Box display="flex" justifyContent="space-between" my={2}>
                <Typography variant="body2" mr={1}>
                  Subscribers
                </Typography>
                <Typography variant="body2" mr={-6} fontWeight={600}>
                  {userActivity?.active_users ?? 0}
                </Typography>
              </Box>
            </Box>


            {activePlan?.map((item, index) => (
              <Box key={index} sx={{ width: '100%' }}>
                <Box display="flex" justifyContent="space-between" my={2}>
                  <Typography variant="body2" mr={1}>
                    {item.plan_name}
                  </Typography>
                  <Typography variant="body2" mr={-6} fontWeight={600}>
                    {item.active_users}
                  </Typography>
                </Box>

              </Box>
            ))}
          </EcommerceDataCard>

          <TrafficSources />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" align="center" sx={{ fontWeight: 'bold' }}>
          Story Listen Time Chart
        </Typography>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'normal' }}>
          Top 20 stories by Listen time
        </Typography>
      </Grid>
      {/* row 5 */}
      <Grid item xs={12}>
        <ProjectAnalytics />
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
