'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'next/navigation';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

// material-ui
import { Grid, Button, TextField, Box, Tabs, Tab, Typography, Stack } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import axiosServices from 'utils/axios';

// assets
import { AddCircle } from 'iconsax-react';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| ADD EPISODE PAGE ||============================== //

const AddEpisodePage = () => {
  const searchParams = useSearchParams();
  const storyId = searchParams.get('storyId');

  const [showTabs, setShowTabs] = useState(false);
  const [value, setValue] = useState(0);
  const [episodeCountInput, setEpisodeCountInput] = useState('');
  const [existingEpisodeCount, setExistingEpisodeCount] = useState(0);
  const [newEpisodes, setNewEpisodes] = useState([]);
  const [storyTitle, setStoryTitle] = useState('');
  const [existingEpisodes, setExistingEpisodes] = useState([]);

  const fetchExistingEpisodes = async () => {
    try {
      // ✅ correct API call
      const storyRes = await axiosServices.post('', {
        method: 'story_details',
        story_id: storyId
      });

      setStoryTitle(storyRes.data?.data?.[0]?.story_title_english || '');

      // ✅ fetch episodes list
      const response = await axiosServices.post('', {
        method: 'details_table',
        story_id: storyId
      });

      const list = response.data?.data || [];
      setExistingEpisodes(list);
      setExistingEpisodeCount(list.length);
    } catch (error) {
      console.error('Error fetching existing episodes:', error);
    }
  };

  useEffect(() => {
    if (storyId) {
      fetchExistingEpisodes();
    }
  }, [storyId]);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddEpisodesClick = () => {
    const numToAdd = parseInt(episodeCountInput, 10);
    if (!numToAdd || numToAdd <= 0) {
      alert('Please enter a valid number of episodes');
      return;
    }

    const start = existingEpisodeCount + 1;
    const newList = [];
    for (let i = 0; i < numToAdd; i++) {
      newList.push({
        episodeNumber: start + i,
        chapterId: '',
        duration: '',
        langData: {
          0: { name: '', desc: '' },
          1: { name: '', desc: '' },
          2: { name: '', desc: '' },
          3: { name: '', desc: '' },
          4: { name: '', desc: '' }
        }
      });
    }
    setNewEpisodes(newList);
    setShowTabs(true);
  };

  // Handle Chapter ID & Duration for specific episode index in newEpisodes array
  const handleBasicChange = (e, index) => {
    const updated = [...newEpisodes];
    updated[index][e.target.name] = e.target.value;
    setNewEpisodes(updated);
  };

  // Handle Language Fields
  const handleLangChange = (e, epIndex, langIndex, field) => {
    const updated = [...newEpisodes];
    updated[epIndex].langData[langIndex][field] = e.target.value;
    setNewEpisodes(updated);
  };

  const handleSubmit = () => {
    // Validate all
    for (const ep of newEpisodes) {
      if (!ep.chapterId || !ep.duration) {
        alert(`Please fill in Chapter ID and Duration for Episode ${ep.episodeNumber}`);
        return;
      }
      const currentLang = ep.langData[value];
      if (!currentLang.name || !currentLang.desc) {
        alert(`Please fill in Chapter Name and Description for Episode ${ep.episodeNumber} (Current Language)`);
        return;
      }
    }

    const submitEpisodes = async () => {
      for (const ep of newEpisodes) {
        const payload = {
          story_id: storyId,
          chapter_id: Number(ep.chapterId),
          duration: ep.duration,
          chapter_name_english: ep.langData[0].name,
          description_english: ep.langData[0].desc,
          chapter_name_tamil: ep.langData[1].name,
          description_tamil: ep.langData[1].desc,
          chapter_name_telugu: ep.langData[2].name,
          description_telugu: ep.langData[2].desc,
          chapter_name_kannada: ep.langData[3].name,
          description_kannada: ep.langData[3].desc,
          chapter_name_malayalam: ep.langData[4].name,
          description_malayalam: ep.langData[4].desc
        };

        try {
          const response = await axiosServices.post('', { method: 'add_episode', payload });
          if (response.data.status !== 1) {
            // Assuming 1 is success based on AddStoriesPage
            console.error(`Failed to add episode ${ep.episodeNumber}`, response.data);
          }
        } catch (error) {
          console.error(`Error adding episode ${ep.episodeNumber}:`, error);
        }
      }
      alert('Episodes submitted successfully!');
      setEpisodeCountInput('');
      setNewEpisodes([]);
      setShowTabs(false);
    };

    submitEpisodes();
  };
  const handleDeactivate = async (chapterId) => {
    const confirmDeactivate = window.confirm('Are you sure you want to deactivate this episode?');

    if (!confirmDeactivate) return;

    try {
      const res = await axiosServices.post('', {
        method: 'deactivate_episode',
        payload: {
          story_id: storyId,
          chapter_id: chapterId
        }
      });

      if (res.data.status === 1) {
        alert('Episode deactivated successfully');

        // Refresh table so status changes to Inactive
        fetchExistingEpisodes();
      }
    } catch (error) {
      console.error('Failed to deactivate episode', error);
      alert('Failed to deactivate episode');
    }
  };
  const handleActivate = async (chapterId) => {
    if (!window.confirm('Activate this episode?')) return;

    try {
      const res = await axiosServices.post('', {
        method: 'activate_episode',
        payload: {
          story_id: storyId,
          chapter_id: chapterId
        }
      });

      if (res.data.status === 1) {
        alert('Episode activated');
        fetchExistingEpisodes();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={12} lg={12}>
        {existingEpisodes.length > 0 && (
          <MainCard title={`Episodes – ${storyTitle}`} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Episode Id</TableCell>
                  <TableCell>Episode Name</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {existingEpisodes.map((ep) => (
                  <TableRow key={ep.chapter_id}>
                    <TableCell>{ep.chapter_id}</TableCell>
                    <TableCell>{ep.chapter_name}</TableCell>
                    <TableCell>{ep.chapter_duration}</TableCell>
                    <TableCell>
                      <Typography color={ep.status === 1 ? 'success.main' : 'error.main'}>
                        {ep.status === 1 ? 'Active' : 'Inactive'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {ep.status === 1 ? (
                        <Button variant="outlined" color="error" size="small" onClick={() => handleDeactivate(ep.chapter_id)}>
                          Deactivate
                        </Button>
                      ) : (
                        <Button variant="outlined" color="success" size="small" onClick={() => handleActivate(ep.chapter_id)}>
                          Activate
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </MainCard>
        )}

        <MainCard title="New Episode" sx={{ bgcolor: '#eff4fa' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                label="Number of Episodes to Add"
                placeholder="e.g. 2"
                sx={{ bgcolor: 'white' }}
                value={episodeCountInput}
                onChange={(e) => setEpisodeCountInput(e.target.value)}
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddCircle />}
                onClick={handleAddEpisodesClick}
                sx={{
                  bgcolor: 'darkred',
                  '&:hover': { bgcolor: 'darkred' },
                  backgroundColor: 'red'
                }}
              >
                Add Episodes
              </Button>
            </Grid>
          </Grid>
        </MainCard>

        {showTabs && (
          <>
            {newEpisodes.map((episode, epIndex) => (
              <MainCard sx={{ mt: 3 }} key={episode.episodeNumber} title={`Episode ${episode.episodeNumber}`}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      label="Chapter ID"
                      placeholder="Enter Chapter ID"
                      name="chapterId"
                      value={episode.chapterId}
                      onChange={(e) => handleBasicChange(e, epIndex)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      label="Duration"
                      placeholder="HH:MM:SS"
                      name="duration"
                      value={episode.duration}
                      onChange={(e) => handleBasicChange(e, epIndex)}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                  <Tabs value={value} onChange={handleTabChange} aria-label="language tabs">
                    <Tab label="English" {...a11yProps(0)} />
                    <Tab label="Tamil" {...a11yProps(1)} />
                    <Tab label="Telugu" {...a11yProps(2)} />
                    <Tab label="Kannada" {...a11yProps(3)} />
                    <Tab label="Malayalam" {...a11yProps(4)} />
                  </Tabs>
                </Box>

                {/* We loop through 0-4 to create panels */}
                {[0, 1, 2, 3, 4].map((langIndex) => (
                  <CustomTabPanel value={value} index={langIndex} key={langIndex}>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          fullWidth
                          label="Chapter Name"
                          placeholder="Enter Chapter Name"
                          value={episode.langData[langIndex].name}
                          onChange={(e) => handleLangChange(e, epIndex, langIndex, 'name')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          fullWidth
                          label="Description"
                          placeholder="Enter Description"
                          value={episode.langData[langIndex].desc}
                          onChange={(e) => handleLangChange(e, epIndex, langIndex, 'desc')}
                        />
                      </Grid>
                    </Grid>
                  </CustomTabPanel>
                ))}
              </MainCard>
            ))}

            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3, p: 3 }}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default AddEpisodePage;
