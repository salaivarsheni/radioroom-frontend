import { useState, useEffect } from 'react';
import axios from 'utils/axios';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';

// THIRD - PARTY
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    type: 'area',
    toolbar: {
      show: false
    },
    offsetX: 0,
    offsetY: 0
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 1
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  grid: {
    strokeDashArray: 4,
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  }
};

// ==============================|| CHART - REPEAT CUSTOMER CHART ||============================== //

const RepeatCustomerChart = ({ viewType }) => {//get viewtype like this since we passed it with the component
  const theme = useTheme();
//searchparamas is using url only so dont need to use it.
  const mode = theme.palette.mode;
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);// "default settings" for how the chart looks and behaves.
  const [series, setSeries] = useState([
    {
      name: 'Registered Users',
      data: [] // Started with empty data
    }
  ]);

  useEffect(() => {
    const fetchRepeatCustomerData = async () => {
      try {
        const response = await axios.post("", { method: 'usergraph', viewType: viewType });
        if (response.data) {
          const { categories, data } = response.data;
          setSeries([{ name: 'Registered Users', data: data || [] }]);

          setOptions((prevState) => ({
            ...prevState,
            xaxis: {
              ...prevState.xaxis,
              categories: categories || []
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching repeat customer data:', error);
      }
    };
    fetchRepeatCustomerData();
  }, [viewType]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        ...prevState.xaxis,
        labels: {
          style: {
            colors: new Array(12).fill(secondary)
          }
        },
        axisBorder: {
          show: false,
          color: line
        },
        axisTicks: {
          show: false
        },
        tickAmount: 11
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
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme]);

  return <ReactApexChart options={options} series={series} type="area" height={260} />;
};

export default RepeatCustomerChart;
