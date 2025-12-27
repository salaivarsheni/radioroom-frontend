import Grid from '@mui/material/Grid';
import Automationcard from 'sections/widget/data/Automationcard';
const OthersPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Automationcard />
      </Grid>
    </Grid>
  );
};

export default OthersPage;
