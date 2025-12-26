'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// material-ui
import { Grid, Typography, Tabs, Tab, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import axiosServices from 'utils/axios';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// ==============================|| USER DETAILS PAGE ||============================== //

const UserDetailsPage = () => {
    const searchParams = useSearchParams();
    const searchValue = searchParams.get('id');
    const [value, setValue] = useState(0);
    const [plan, setPlan] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const userId = userDetails?.user?.user_id;

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axiosServices.post("", { method: "user_details", searchValue: searchValue });
                if (response.data.status === 0) {
                    alert(response.data.message);
                    setUserDetails({});
                    return;
                }

                setUserDetails(response.data);

            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, [searchValue]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlePlanChange = (event) => {
        setPlan(event.target.value);
    };
    const handlePlanSubmit = async (event) => {
        event.preventDefault();
        if (!plan) {
            alert("Please select a plan");
            return;
        }
        alert("Plan added successfully");
        const response = await axiosServices.post("", {
            method: "add_plan",
            user_id: userId,
            plan_id: plan

        });

    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h2" gutterBottom>
                    User Details
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <MainCard content={false}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="user details tabs">
                            <Tab label="Details" {...a11yProps(0)} />
                            <Tab label="Subscriptions" {...a11yProps(1)} />
                            <Tab label="User Listens" {...a11yProps(2)} />
                            <Tab label="User Wishlist" {...a11yProps(3)} />
                            <Tab label="Devices" {...a11yProps(4)} />
                            <Tab label="Add Plan" {...a11yProps(5)} />
                            <Tab label="Others" {...a11yProps(6)} />
                        </Tabs>
                    </Box>

                    <CustomTabPanel value={value} index={0}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                {userDetails?.user && (
                                    <>
                                        <Typography variant="h5">Name: {userDetails.user.user_name}</Typography>
                                        <Typography>Email: {userDetails.user.email_id}</Typography>
                                        <Typography>User ID: {userId}</Typography>
                                        <Typography>User Type: {userDetails.user.user_type}</Typography>
                                        <Typography>Country Code: {userDetails.user.country_code}</Typography>
                                        <Typography>Mobile: {userDetails.user.mobile}</Typography>
                                        <Typography>Joined Date: {userDetails.user.joined_date}</Typography>
                                    </>
                                )}

                                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead sx={{ bgcolor: '#303841' }}>
                                            <TableRow>
                                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SUBSCRIPTIONS</TableCell>
                                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>LISTENS</TableCell>
                                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>WISHLIST</TableCell>
                                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>DEVICE</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell>{userDetails.total_subscriptions}</TableCell>
                                                <TableCell>{userDetails.listens}</TableCell>
                                                <TableCell>{userDetails.wishlist_count}</TableCell>
                                                <TableCell>{userDetails.device_count}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            {/* Right Sidebar actions - mimicked from screenshot but keeping it simpler or layout-friendly */}
                            {/* The screenshot shows a secondary sidebar which is unusual for a tabbed main view.
                     The user asked for top nav "not that it has to be in right and all".
                     So I integrated the "Details" content as the main view of the first tab.
                 */}
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        {userDetails?.plans?.length > 0 ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Plan Name</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Order ID</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Status</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Start Date</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails.plans.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ padding: '8px 0' }}>{item.plan_name}</td>
                                            <td>{item.order_id}</td>
                                            <td>{item.status === 1 ? 'Active' : 'Inactive'}</td>
                                            <td>{item.start_date}</td>
                                            <td>{item.end_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No plans available</p>
                        )}
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={2}>
                        {userDetails?.listen_history?.length > 0 ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Sno</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Story name</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Chapter Id</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Listen Seconds</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails.listen_history.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ padding: '8px 0' }}>{index + 1}</td>
                                            <td>{item.story_title_english}</td>
                                            <td>{item.chapter_id}</td>
                                            <td>{item.listen_seconds}</td>
                                            <td>{item.listen_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No listen history available</p>
                        )}
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={3}>
                        {userDetails?.wishlist_stories?.length > 0 ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Sno</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Story Id</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Story Name</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails.wishlist_stories.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ padding: '8px 0' }}>{index + 1}</td>
                                            <td>{item.story_id}</td>
                                            <td>{item.story_title_english}</td>
                                            <td>{item.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No wishlist stories available</p>
                        )}
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={4}>
                        {userDetails?.devices?.length > 0 ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Sno</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Device ID</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Device Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails?.devices?.map((item, index) => {
                                        const deviceInfo = JSON.parse(item.user_device_info);

                                        return (
                                            <tr key={index}>
                                                <td style={{ padding: '8px 0' }}>{index + 1}</td>
                                                <td>{item.user_device_id}</td>
                                                <td>
                                                    {deviceInfo.brand} | {deviceInfo.model} | {deviceInfo.version}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>

                            </table>
                        ) : (
                            <p>No devices available</p>
                        )}
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={5}>
                        <Box sx={{ minWidth: 120, maxWidth: 300, mt: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="plan-select-label">Select Plan</InputLabel>
                                <Select
                                    labelId="plan-select-label"
                                    id="plan-select"
                                    value={plan}
                                    label="Select Plan"
                                    onChange={handlePlanChange}
                                >{userDetails?.available_plans?.map((item, index) => (
                                    <MenuItem key={index} value={item.plan_id}>{item.plan_name}</MenuItem>

                                ))}
                                </Select>
                                <Box sx={{ mt: 2 }}>
                                    <Button variant="contained" onClick={handlePlanSubmit}>Add Plan</Button>
                                </Box>
                            </FormControl>
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={6}>
                        {userDetails?.likes?.length > 0 ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Sno</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Story ID</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Story Name</th>
                                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails.likes.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ padding: '8px 0' }}>{index + 1}</td>
                                            <td>{item.story_id}</td>
                                            <td>{item.story_title_english}</td>
                                            <td>{item.created_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No likes available</p>
                        )}
                    </CustomTabPanel>

                </MainCard>
            </Grid>
        </Grid>
    );
};

export default UserDetailsPage;
