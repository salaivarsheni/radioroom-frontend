'use client';
import axiosServices from 'utils/axios';
import PropTypes from 'prop-types';
import { Fragment, useMemo, useState, useEffect } from 'react';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// THIRD - PARTY
import { useFilters, useGlobalFilter, useSortBy, useTable, usePagination } from 'react-table';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { TablePagination } from 'components/third-party/ReactTable';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialPageSize = 7;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: initialPageSize }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  const [resultsCount, setResultsCount] = useState(7);
  const handleResultsChange = (event) => {
    setResultsCount(event.target.value);
    setPageSize(event.target.value);
  };

  return (
    <Stack spacing={3}>
      <Box sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5" color="primary" align="center" sx={{ fontWeight: 600 }}>
            Subscription Counts
          </Typography>
          <Stack
            direction={matchDownSM ? 'column' : 'row'}
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body1" color="primary.main">
                Results :
              </Typography>
              <FormControl sx={{ minWidth: 80 }}>
                <Select
                  value={resultsCount}
                  onChange={handleResultsChange}
                  displayEmpty
                  size="small"
                  sx={{ '& .MuiSelect-select': { py: 0.75, px: 1.5 } }}
                >
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </Stack>
        </Stack>
      </Box>

      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, index) => (
            <Fragment key={index}>
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <Fragment key={i}>
                    <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                      {column.render('Header')}
                    </TableCell>
                  </Fragment>
                ))}
              </TableRow>
            </Fragment>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.length > 0 ? (
            page.map((row, i) => {
              prepareRow(row);
              return (
                <Fragment key={i}>
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell, index) => (
                      <Fragment key={index}>
                        <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>
                          {cell.render('Cell')}
                        </TableCell>
                      </Fragment>
                    ))}
                  </TableRow>
                </Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                <Typography variant="body1" color="textSecondary">
                  No data available
                </Typography>
              </TableCell>
            </TableRow>
          )}
          <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
            <TableCell sx={{ p: 2, py: 3 }} colSpan={columns.length}>
              <TablePagination
                gotoPage={gotoPage}
                rows={rows}
                setPageSize={setPageSize}
                pageSize={pageSize}
                pageIndex={pageIndex}
                initialPageSize={initialPageSize}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

// ==============================|| DATA WIDGET - PRODUCTS ||============================== //

const Products = () => {
  const [subscriptionCount, setSubscriptionCount] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      // Calls your API to get the JSON with { categories, monthly, quarterly, annual } arrays
      try {
        const res = await axiosServices.post("", { method: "subscription_count" });
        setSubscriptionCount(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSubscription();
  }, []);
  const data = useMemo(() => {
     // Guard clause: If data hasn't loaded yet, show an empty table
    if (!subscriptionCount?.categories) return [];

    return subscriptionCount?.categories.map((month, index) => ({
      id: index + 1,
      month: month,
      monthly: subscriptionCount.monthly?.[index] || 0,
      quarterly: subscriptionCount.quarterly?.[index] || 0,
      annual: subscriptionCount.annual?.[index] || 0
    }));
  }, [subscriptionCount]);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id'
      },
      {
        Header: 'MONTH',
        accessor: 'month'
      },
      {
        Header: 'MONTHLY',
        accessor: 'monthly'
      },
      {
        Header: 'QUARTERLY',
        accessor: 'quarterly'
      },
      {
        Header: 'ANNUAL',
        accessor: 'annual'
      }
    ],
    []
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default Products;
