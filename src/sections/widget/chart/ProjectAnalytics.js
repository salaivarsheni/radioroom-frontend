'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axiosServices from 'utils/axios';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Select from '@mui/material/Select';

// THIRD - PARTY
import ReactApexChart from 'react-apexcharts';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import MoreIcon from 'components/@extended/MoreIcon';
import IconButton from 'components/@extended/IconButton';
import { ThemeMode } from 'config';

// ASSETS
import { ArrowDown, ArrowSwapHorizontal, ArrowUp, Bookmark, Chart, Edit, HomeTrendUp, Maximize4, ShoppingCart } from 'iconsax-react';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| CHART ||============================== //

const EcommerceDataChart = ({ series, categories }) => {
  const theme = useTheme();

  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        columnWidth: '55%',
        borderRadius: 4
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories
    },
    yaxis: {
      title: { text: 'Listen Time (Hours)' }
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} hrs`
      }
    },
    theme: {
      mode: theme.palette.mode === ThemeMode.DARK ? 'dark' : 'light'
    }
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={250}
    />
  );
};


EcommerceDataChart.propTypes = {
  series: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
};


// ==============================|| CHART WIDGET - PROJECT ANALYTICS ||============================== //

export default function ProjectAnalytics() {
  const [value, setValue] = useState(0);
  const [age, setAge] = useState('30');
  const [chartSeries, setChartSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axiosServices.post('', {
          method: 'story_listen_time'
        });

        const list = res.data?.data || [];

        // X-axis labels
        const storyNames = list.map(item => item.story_title_english);

        // Y-axis values (convert seconds → hours)
        const listenHours = list.map(item =>
          Math.round(item.total_listen_seconds / 3600)
        );

        setCategories(storyNames);
        setChartSeries([
          {
            name: 'Total Listen Time (hrs)',
            data: listenHours
          }
        ]);

      } catch (err) {
        console.error(err);
      }
    };

    fetchChartData();
  }, []);



  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <MainCard content={false}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ px: 3, pt: 1, '& .MuiTab-root': { mb: 0.5 } }}>
            <Tab label="Overview" {...a11yProps(0)} />
            {/* <Tab label="Marketing" {...a11yProps(1)} />
            <Tab label="Project" {...a11yProps(2)} />
            <Tab label="Order" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
                  {/* <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <Select id="demo-simple-select" value={age} onChange={handleChangeSelect}>
                        <MenuItem value={10}>Today</MenuItem>
                        <MenuItem value={20}>Weekly</MenuItem>
                        <MenuItem value={30}>Monthly</MenuItem>
                      </Select>
                    </FormControl>
                  </Box> */}
                  {/* <IconButton color="secondary" variant="outlined" sx={{ color: 'text.secondary' }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" variant="outlined" sx={{ color: 'text.secondary' }}>
                    <Maximize4 />
                  </IconButton>
                  <IconButton color="secondary" variant="outlined" sx={{ transform: 'rotate(90deg)', color: 'text.secondary' }}>
                    <MoreIcon />
                  </IconButton> */}
                </Stack>
                <EcommerceDataChart
                  series={chartSeries}
                  categories={categories}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              {/* <List disablePadding sx={{ '& .MuiListItem-root': { px: 3, py: 1.5 } }}>
                <ListItem
                  divider
                  secondaryAction={
                    <Stack spacing={0.25} alignItems="flex-end">
                      <Typography variant="subtitle1">-245</Typography>
                      <Typography color="error" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ArrowDown style={{ transform: 'rotate(45deg)' }} size={14} /> 10.6%
                      </Typography>
                    </Stack>
                  }
                >
                  <ListItemAvatar> */}
              {/* <Avatar variant="rounded" color="secondary" sx={{ color: 'text.secondary' }}>
                      <Chart />
                    </Avatar>
                  </ListItemAvatar> */}
              {/* <ListItemText
                    primary={<Typography color="text.secondary">Total Sales</Typography>}
                    secondary={<Typography variant="subtitle1">1,800</Typography>}
                  />
                </ListItem> */}
              {/* <ListItem
                  divider
                  secondaryAction={
                    <Stack spacing={0.25} alignItems="flex-end">
                      <Typography variant="subtitle1">+2,100</Typography>
                      <Typography color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ArrowUp style={{ transform: 'rotate(45deg)' }} size={14} /> 30.6%
                      </Typography>
                    </Stack>
                  } */}
              {/* >
                  <ListItemAvatar>
                    <Avatar variant="rounded" color="secondary" sx={{ color: 'text.secondary' }}>
                      <HomeTrendUp />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography color="text.secondary">Revenue</Typography>}
                    secondary={<Typography variant="subtitle1">$5,667</Typography>}
                  />
                </ListItem> */}
              {/* <ListItem
                  divider
                  secondaryAction={
                    <Stack spacing={0.25} alignItems="flex-end">
                      <Typography variant="subtitle1">-26</Typography>
                      <Typography color="warning.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ArrowSwapHorizontal size={14} /> 5%
                      </Typography>
                    </Stack>
                  }
                >
                  <ListItemAvatar>
                    <Avatar variant="rounded" color="secondary" sx={{ color: 'text.secondary' }}>
                      <ShoppingCart />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography color="text.secondary">Abandon Cart</Typography>}
                    secondary={<Typography variant="subtitle1">128</Typography>}
                  />
                </ListItem> */}
              {/* <ListItem
                  secondaryAction={
                    <Stack spacing={0.25} alignItems="flex-end">
                      <Typography variant="subtitle1">+200</Typography>
                      <Typography color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ArrowUp style={{ transform: 'rotate(45deg)' }} size={14} /> 10.6%
                      </Typography>
                    </Stack>
                  }
                >
                  <ListItemAvatar>
                    <Avatar variant="rounded" color="secondary" sx={{ color: 'text.secondary' }}>
                      <Bookmark />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography color="text.secondary">Ads Spent</Typography>}
                    secondary={<Typography variant="subtitle1">$2,500</Typography>}
                  />
                </ListItem>
              </List>*/}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </MainCard>
  );
}
