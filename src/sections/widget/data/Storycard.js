'use client';

import PropTypes from 'prop-types';
import { Fragment, useMemo, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosServices from 'utils/axios';


// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// THIRD - PARTY
import { useFilters, useGlobalFilter, useSortBy, useTable, usePagination } from 'react-table';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { TablePagination } from 'components/third-party/ReactTable';
import { renderFilterTypes } from 'utils/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
    const theme = useTheme();
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

// ==============================|| DATA WIDGET - STORY CARD ||============================== //

const StoryCard = () => {
    const [story, setStory] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const fetchStory = async () => {
            // Calls your API to get the JSON with { categories, monthly, quarterly, annual } arrays
            try {
                const res = await axiosServices.post("", { method: "view_story" });
                setStory(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchStory();
    }, []);

    // Dummy Data
    const data = useMemo(() => {
        if (!story?.data) return [];
        return story?.data.map((item, index) => ({
            id: index + 1,
            title: item.story_title_english,
            story_id: item.story_id,
            language: item.language_name_english,
            episodes: item.number_episodes,
            status: item.status === 0 ? 'DISABLE' : 'ENABLE',
            payment: item.payment_status === 1 ? 'Free' : item.payment_status === 0 ? 'Paid' : 'Partial Paid'
        }));
    }, [story]);

    const columns = useMemo(
        () => [
            {
                Header: 'S.NO',
                accessor: 'id',
            },
            {
                Header: 'STORY TITLE',
                accessor: 'title',
                Cell: ({ row, value }) => (
                    <Stack spacing={1}>
                        <Typography variant="subtitle1">{value}</Typography>
                        <Stack direction="row" spacing={1}>
                            <Button variant="contained" size="small" color="primary" onClick={() => router.push(`/dashboard/stories/view?id=${row.original.story_id}`)}>View</Button>
                            <Button variant="contained" size="small" color="warning" onClick={() => router.push(`/dashboard/stories/add-episode?storyId=${row.original.story_id}`)}>Add Episodes</Button>
                        </Stack>
                    </Stack>
                )
            },
            {
                Header: 'STORY ID',
                accessor: 'story_id',
            },
            {
                Header: 'LANGUAGE',
                accessor: 'language',
            },
            {
                Header: 'EPISODES',
                accessor: 'episodes',
            },
            {
                Header: 'PAYMENT STATUS',
                accessor: 'payment',
            },
            {
                Header: 'STATUS',
                accessor: 'status',
                Cell: ({ value }) => (
                    <Typography color={value === 'DISABLE' ? 'error.main' : 'success.main'} fontWeight="bold">
                        {value}
                    </Typography>
                )
            },
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

export default StoryCard;
