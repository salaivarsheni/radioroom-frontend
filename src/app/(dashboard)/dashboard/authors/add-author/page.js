'use client';
// ==============================|| ADD AUTHOR PAGE ||============================== //

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';
import { useState } from 'react';
import Button from '@mui/material/Button';
import axiosServices from 'utils/axios';

const AddAuthorPage = () => {
  const initialFormData = {
    authorNameEnglish: '',
    userId: '',
    mobileNumber: '',
    emailId: '',
    address: '',
    username: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
    authorNameTamil: '',
    authorNameTelugu: '',
    authorNameKannada: '',
    authorNameMalayalam: '',
    agreementId: '',
    agreementDate: null,
    agreementValidityDate: null
  };

  const [formData, setFormData] = useState(initialFormData);
  //  ...formData,      // 1. First, copy ALL existing fields (keep the old data)
  //  [name]: value     // 2. Then, overwrite ONLY the specific field that changed
  const handleChange = (e) => {
    const name = e.target.name; // This tells us which field is being edited.
    const value = e.target.value; // Grabs the actual text currently inside that field.
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      !formData.authorNameEnglish ||
      !formData.userId ||
      !formData.mobileNumber ||
      !formData.emailId ||
      !formData.address ||
      !formData.username ||
      !formData.accountNumber ||
      !formData.ifscCode ||
      !formData.accountType ||
      !formData.authorNameTamil ||
      !formData.authorNameTelugu ||
      !formData.authorNameKannada ||
      !formData.authorNameMalayalam ||
      !formData.agreementId ||
      !formData.agreementDate ||
      !formData.agreementValidityDate
    ) {
      alert('Please fill all the fields');
      return;
    }
    const payload = {
      ...formData,
      agreementDate: formData.agreementDate.format('YYYY-MM-DD'),
      agreementValidityDate: formData.agreementValidityDate.format('YYYY-MM-DD')
    };

    const event = { ...formData }; //This creates: { authorNameEnglish: "...", userId: "...", ... }
    const response = await axiosServices.post('', { method: 'insert_author', formData: payload });
    if (response.data && response.data.status === 1) {
      alert('User added successfully');
    } else {
      alert('User added failed');
    }
    console.log(event);
    alert('response submitted');
    setFormData(initialFormData);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Add New Author">
          <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Author Details
          </Typography>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Author Name(ENGLISH)"
                placeholder="Enter Author Name"
                id="authorNameEnglish"
                name="authorNameEnglish"
                value={formData.authorNameEnglish}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="User ID"
                placeholder="Enter User ID"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                placeholder="Enter Mobile Number"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email ID"
                placeholder="Enter Email ID"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                placeholder="Enter Address"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center', mt: 3 }}>
            Author Account Details
          </Typography>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Username"
                placeholder="Enter Username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Account type"
                placeholder="Enter Account type"
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center', mt: 3 }}>
            Regional Author names
          </Typography>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Author Name(Tamil)"
                placeholder="Enter Author Name"
                id="authorNameTamil"
                name="authorNameTamil"
                value={formData.authorNameTamil}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Author Name(Telugu)"
                placeholder="Enter Author Name"
                id="authorNameTelugu"
                name="authorNameTelugu"
                value={formData.authorNameTelugu}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Author Name(Kannada)"
                placeholder="Enter Author Name"
                id="authorNameKannada"
                name="authorNameKannada"
                value={formData.authorNameKannada}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Author Name(Malayalam)"
                placeholder="Enter Author Name"
                id="authorNameMalayalam"
                name="authorNameMalayalam"
                value={formData.authorNameMalayalam}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center', mt: 3 }}>
            Author Agreement Details
          </Typography>
          <Grid container spacing={3} sx={{ mt: 3 }}>
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
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Agreement Date"
                  value={formData.agreementDate}
                  onChange={(newValue) => handleDateChange('agreementDate', newValue)}
                  slotProps={{
                    textField: {
                      id: 'agreementDate',
                      fullWidth: true,
                      InputLabelProps: { shrink: true },
                      required: true
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Agreement Validity Date"
                  value={formData.agreementValidityDate}
                  onChange={(newValue) => handleDateChange('agreementValidityDate', newValue)}
                  slotProps={{
                    textField: {
                      id: 'agreementValidityDate',
                      fullWidth: true,
                      InputLabelProps: { shrink: true },
                      required: true
                    }
                  }}
                />
              </LocalizationProvider>
              <Grid item xs={12} md={6} sx={{ position: 'center', mt: 3 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ position: 'center' }}>
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default AddAuthorPage;
