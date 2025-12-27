'use client';

import PropTypes from 'prop-types';
import { useMemo, useEffect, useState, Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';

// third-party
import { useFilters, useGlobalFilter, useSortBy, useTable, usePagination } from 'react-table';

// project imports
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { TablePagination } from 'components/third-party/ReactTable';
import { renderFilterTypes } from 'utils/react-table';
import axiosServices from 'utils/axios';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const theme = useTheme();
  const router = useRouter();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialPageSize = 5;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
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

  return (
    <Stack spacing={3}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, index) => (
            <Fragment key={index}>
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <Fragment key={i}>
                    <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
                  </Fragment>
                ))}
              </TableRow>
            </Fragment>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment key={i}>
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell, index) => (
                    <Fragment key={index}>
                      <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                    </Fragment>
                  ))}
                </TableRow>
              </Fragment>
            );
          })}
          <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
            <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
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

// ==============================|| STORY VIEW PAGE ||============================== //

const StoryViewPage = () => {
  const searchParams = useSearchParams();
  const storyId = searchParams.get('id');
  const [storyDetails, setStoryDetails] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    if (storyId) {
      const fetchData = async () => {
        try {
          // Fetch Story Details
          const resStory = await axiosServices.post('', { method: 'story_details', story_id: storyId });
          setStoryDetails(resStory.data);

          // Fetch Episodes
          const resEpisodes = await axiosServices.post('', { method: 'details_table', story_id: storyId });
          setEpisodes(resEpisodes.data || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [storyId]);
  // Navigate to Add Episode page with existing episode count
  const handleAddEpisode = () => {
    router.push(`/add-episode?storyId=${storyId}&existingEpisodes=${storyDetails.NumberofEpisodes || 0}`);
  };

  const episodesData = useMemo(() => {
    if (!episodes || !episodes.data) return [];
    return episodes.data.map((item) => ({
      chapter_id: item.chapter_id,
      chapter_name: item.chapter_name,
      listen_seconds: item.total_listen_seconds,
      chapter_duration: item.chapter_duration,
      audio_status: item.audio_status === 1 ? 'Enabled' : 'Disabled',
      payment: item.payment_status === 1 ? 'Paid' : item.payment_status === 0 ? 'Free' : 'Partial Paid',
      status: item.status === 1 ? 'Enabled' : 'Disabled'
    }));
  }, [episodes]);

  const columns = useMemo(
    () => [
      { Header: 'CHAPTER ID', accessor: 'chapter_id' },
      { Header: 'CHAPTER NAME', accessor: 'chapter_name' },
      { Header: 'LISTEN SECONDS', accessor: 'listen_seconds' },
      { Header: 'CHAPTER DURATION', accessor: 'chapter_duration' },
      {
        Header: 'AUDIO STATUS',
        accessor: 'audio_status',
        Cell: ({ value }) => (
          <Typography color={value === 'Disabled' ? 'error.main' : 'success.main'} fontWeight="bold">
            {value}
          </Typography>
        )
      },
      { Header: 'PAID/FREE', accessor: 'payment' },
      {
        Header: 'STATUS',
        accessor: 'status',
        Cell: ({ value }) => (
          <Typography color={value === 'Disabled' ? 'error.main' : 'success.main'} fontWeight="bold">
            {value}
          </Typography>
        )
      }
    ],
    []
  );
  const languageTitles = {
    English: storyDetails?.data?.[0]?.story_title || '',
    Tamil: storyDetails?.data?.[1]?.story_title || '',
    Telugu: storyDetails?.data?.[2]?.story_title || '',
    Kannada: storyDetails?.data?.[3]?.story_title || '',
    Malayalam: storyDetails?.data?.[4]?.story_title || ''
  };
  const details = {
    storytitle: storyDetails?.data?.[0]?.story_title_english,
    NumberofEpisodes: storyDetails?.data?.[0]?.number_episodes,
    Language: storyDetails?.data?.[0]?.language_name_english,
    Author: storyDetails?.data?.[0]?.author_name,
    StoryDuration: storyDetails?.data?.[0]?.story_duration,
    CreatedDate: storyDetails?.data?.[0]?.created_date,
    Genres: storyDetails?.data?.genre_name
  };

  return (
    <Grid container spacing={3}>
      {/* Story Details */}
      {/* Story Details */}
      <Grid item xs={12} md={6}>
        <MainCard title={`Title: ${details.storytitle || ''}`}>
          <Stack spacing={2}>
            <Typography>Story Id: {storyDetails?.story_id || storyId}</Typography>
            <Typography>Number of Episodes: {details.NumberofEpisodes || 0}</Typography>
            <Typography>Language: {details.Language || ''}</Typography>
            <Typography>Author: {details.Author || ''}</Typography>
            <Typography>Story Duration: {details.StoryDuration || ''}</Typography>
            <Typography>Created Date: {details.CreatedDate || ''}</Typography>
            <Typography>Genres: {details.Genres || ''}</Typography>
          </Stack>
        </MainCard>
      </Grid>
      {/* Story Language */}
      <Grid item xs={12} md={6}>
        <MainCard title="Story Language">
          <Stack spacing={2}>
            {/* Assuming these fields might come from the API or are placeholders for now */}
            <Typography>English: {languageTitles.English}</Typography>
            <Typography>Tamil: {languageTitles.Tamil}</Typography>
            <Typography>Telugu: {languageTitles.Telugu}</Typography>
            <Typography>Kannada: {languageTitles.Kannada}</Typography>
            <Typography>Malayalam: {languageTitles.Malayalam}</Typography>
            {/* <Typography variant="h6">Users Like: {storyDetails?.data?.[0].user_likes || 0}</Typography> */}
          </Stack>
        </MainCard>
      </Grid>

      {/* Episode List Table */}
      <Grid item xs={12}>
        <MainCard title="Episodes">
          <ScrollX>
            <ReactTable columns={columns} data={episodesData} />
          </ScrollX>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default StoryViewPage;
