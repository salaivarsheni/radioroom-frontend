'use client';

import PropTypes from 'prop-types';
import { Fragment, useMemo, useState, useEffect } from 'react';
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

// ==============================|| DATA WIDGET - NARRATOR CARD ||============================== //

const NarratorCard = ({ narrators }) => {

    const data = useMemo(() => {
        if (!narrators) return [];
        return narrators.map((item, index) => ({
            id: index + 1,
            narratorId: item.narrator_id,
            narratorName: item.narrator_name,
            description: item.description_text || '-',
        }));
    }, [narrators]);

    const columns = useMemo(
        () => [
            {
                Header: 'S.NO',
                accessor: 'id',
            },
            {
                Header: 'Narrator ID',
                accessor: 'narratorId',
            },
            {
                Header: 'Narrator Name',
                accessor: 'narratorName',
                Cell: ({ value }) => (
                    <Stack spacing={1}>
                        <Typography variant="subtitle1">{value}</Typography>
                    </Stack>
                )
            },
            {
                Header: 'Description',
                accessor: 'description',
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

export default NarratorCard;
