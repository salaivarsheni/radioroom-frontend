// NEXT
import Link from 'next/link';
import axiosServices from 'utils/axios';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';

// ================================|| LOGIN ||================================ //

const Login = () => {
  const handleLogin = async () => {
    try {
      const response = await axiosServices.post('', {
        method: 'login'
      });

      // ✅ SUCCESS
      if (response.data.status === 1) {
        alert('Login successful');

        // optional: save user data
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // redirect
        router.push('/dashboard');
      }
      // INVALID CREDENTIALS
      else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <img src="/assets/images/logo.png" alt="Logo" style={{ height: 50 }} />
          {/* OR use the component: <Logo /> */}
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography component={Link} href={'/register'} variant="body1" sx={{ textDecoration: 'none' }} color="primary" passHref>
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
