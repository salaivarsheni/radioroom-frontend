'use client';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import { useState } from 'react';
import axiosServices from 'utils/axios';
import { height } from '../../../../../../node_modules/@mui/system/index';

const AddNarratorPage = () => {
    const initialFormData = {

        narratorName: '',
        description: '',
        descriptionAudio: '',
        narratorImage: '',
        agreementId: '',
        agreementDate: null,
        agreementValidity: null,
        accountNumber: '',
        accountName: '',
        ifscCode: '',
        userid: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        // Basic validation
        if (

            !formData.narratorName ||
            !formData.description ||
            !formData.agreementId ||
            !formData.agreementDate ||
            !formData.agreementValidity ||
            !formData.accountNumber ||
            !formData.accountName ||
            !formData.ifscCode ||
            !formData.descriptionAudio ||
            !formData.narratorImage ||
            !formData.userid
        ) {
            alert('Please fill all required fields');
            return;
        }

        // Prepare payload
        const payload = {
            ...formData,
            agreementDate: formData.agreementDate ? formData.agreementDate.format('YYYY-MM-DD') : null,
            agreementValidity: formData.agreementValidity ? formData.agreementValidity.format('YYYY-MM-DD') : null,
        };

        try {
            console.log("Submitting payload:", payload);
            const response = await axiosServices.post("", { method: "add_narrator", formData: payload });

            if (response.data && response.data.status === 1) {
                alert("Narrator added successfully");
                setFormData(initialFormData);
            } else {
                alert("Failed to add narrator");
            }
        } catch (error) {
            console.error(error);
            alert('Error submitting form');
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <MainCard title="Add New Narrator">
                    <Grid container spacing={3}>
                        {/* Narrator ID */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="User ID"
                                placeholder="Enter User ID"
                                id="userid"
                                name="userid"
                                value={formData.userid}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        {/* Narrator Name */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Narrator Name"
                                placeholder="Enter Narrator Name"
                                id="narratorName"
                                name="narratorName"
                                value={formData.narratorName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                placeholder="Enter Description"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        {/* Description Audio (MP3) */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Description Audio (MP3)"
                                placeholder="enter url (mp3)"
                                id="descriptionAudio"
                                name="descriptionAudio"
                                value={formData.descriptionAudio}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Narrator Image (JPEG) */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Narrator Image (JPEG)"
                                placeholder="enter url(jpeg format)"
                                id="narratorImage"
                                name="narratorImage"
                                value={formData.narratorImage}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Agreement ID */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Agreement ID"
                                placeholder="Enter Agreement ID"
                                id="agreementId"
                                name="agreementId"
                                value={formData.agreementId}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        {/* Agreement Date */}
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Agreement Date"
                                    value={formData.agreementDate}
                                    onChange={(newValue) => handleDateChange('agreementDate', newValue)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            required: true
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        {/* Agreement Validity */}
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Agreement Validity"
                                    value={formData.agreementValidity}
                                    onChange={(newValue) => handleDateChange('agreementValidity', newValue)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            required: true
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        {/* Account Number */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Account Number"
                                placeholder="Enter Account Number"
                                id="accountNumber"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        {/* Account Name */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Account Name"
                                placeholder="Enter Account Name"
                                id="accountName"
                                name="accountName"
                                value={formData.accountName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        {/* IFSC Code */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="IFSC Code"
                                placeholder="Enter IFSC Code"
                                id="ifscCode"
                                name="ifscCode"
                                value={formData.ifscCode}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="flex-end">
                                <Button variant="contained" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default AddNarratorPage;
