import { useEffect, useState } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';

// THIRD - PARTY
import ReactApexChart from 'react-apexcharts';

// CHART OPTIONS
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val) {
        return `$ ${val} thousands`;
      }
    }
  },
  legend: {
    show: false
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};

// ==============================|| DASHBOARD - SALES COLUMN CHART ||============================== //

const SalesChart = () => {
  const theme = useTheme();

  const [age, setAge] = useState('30');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const mode = theme.palette.mode;
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const initialSeries = [
    {
      name: 'Income',
      data: [180, 90, 135, 114, 120, 145]
    }
  ];

  const [series, setSeries] = useState(initialSeries);

  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    setSeries(initialSeries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [warning, primaryMain],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      plotOptions: {
        bar: {
          columnWidth: xsDown ? '60%' : '30%'
        }
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, warning, primaryMain, successDark, xsDown]);

  return (
    <MainCard>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography variant="h5">Sales Report</Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select id="demo-simple-select" value={age} onChange={handleChange}>
              <MenuItem value={10}>Today</MenuItem>
              <MenuItem value={20}>Weekly</MenuItem>
              <MenuItem value={30}>Monthly</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={360} />
      </div>
    </MainCard>
  );
};

export default SalesChart;
