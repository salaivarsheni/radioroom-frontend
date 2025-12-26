// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// PROJECT IMPORTS

import NewOrders from 'sections/widget/chart/NewOrders';
import NewUsers from 'sections/widget/chart/NewUsers';
import Products from 'sections/widget/data/Products';


// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const DashboardAnalytics = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={3}>
      {/* row 1 */}
      <Grid item xs={12} md={6} lg={6}>
        <NewOrders />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <NewUsers />
      </Grid>
      {/* <Grid item xs={12} md={4} lg={3}>
        <Visitors />
      </Grid> */}
      {/* <Grid item xs={12} md={4} lg={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DropboxStorage />
          </Grid>
          <Grid item xs={12}>
            <SwitchBalanace />
          </Grid>
        </Grid>
      </Grid> */}

      {/* row 2 */}
      {/* <Grid item xs={12}>
        <Products />
      </Grid> */}
    </Grid>
  );
};

export default DashboardAnalytics;
