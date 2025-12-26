'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosServices from 'utils/axios';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import NarratorCard from 'sections/widget/data/NarratorCard';
import ReportCard from 'components/cards/statistics/ReportCard';

const NarratorsPage = () => {
    const router = useRouter();
    const [narrators, setNarrators] = useState([]);

    useEffect(() => {
        const fetchNarrators = async () => {
            try {
                const res = await axiosServices.post("", { method: "narratormainpg" });
                if (res.data && res.data.data) {
                    setNarrators(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchNarrators();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="center" alignItems="center" sx={{ position: 'relative', mb: 3 }}>
                    <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Narrators
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ position: 'absolute', right: 0 }}
                        onClick={() => router.push('/dashboard/narrators/add-narrators')}
                    >
                        Add Narrator
                    </Button>
                </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <ReportCard
                    primary={narrators.length.toString()}
                    secondary="Total Narrators"
                    color="primary.main"
                />
            </Grid>
            <Grid item xs={12}>
                <NarratorCard narrators={narrators} />
            </Grid>
        </Grid>
    );
};

export default NarratorsPage;
