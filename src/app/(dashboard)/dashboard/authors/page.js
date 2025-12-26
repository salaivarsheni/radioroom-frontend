'use client';
// ==============================|| AUTHORS PAGE ||============================== //
// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

// PROJECT IMPORTS
import Authorcard from 'sections/widget/data/Authorcard';

const AuthorsPage = () => {
    const router = useRouter();
    

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="center" alignItems="center" sx={{ position: 'relative', mb: 3 }}>
                    <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Authors Dashboard
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ position: 'absolute', right: 0 }}
                        onClick={() => router.push('/dashboard/authors/add-author')}
                    >
                        Add Authors
                    </Button>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Authorcard />
            </Grid>
        </Grid>
    );
};

export default AuthorsPage;
