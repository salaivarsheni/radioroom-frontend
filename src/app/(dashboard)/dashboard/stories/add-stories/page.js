'use client';
import { useState, useEffect } from 'react';
import axiosServices from 'utils/axios';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';


// CONSTANTS
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
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const EpisodeForm = ({ index, data, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(index, name, value);
    };

    return (
        <MainCard title={`Episode ${index + 1}`} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
                {/* Chapter ID & Duration */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Chapter Id"
                        name="chapter_id"
                        value={data.chapter_id || ''}
                        onChange={handleChange}
                        placeholder="Enter Chapter Id"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Duration"
                        name="duration"
                        value={data.duration || ''}
                        onChange={handleChange}
                        placeholder="HH:MM"
                    />
                </Grid>

                {/* English */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Chapter Name (English)"
                        name="chapter_name_english"
                        value={data.chapter_name_english || ''}
                        onChange={handleChange}
                        placeholder="Enter Name"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Description (English)"
                        name="description_english"
                        value={data.description_english || ''}
                        onChange={handleChange}
                        placeholder="Enter Description"
                        multiline
                        rows={2}
                    />
                </Grid>

                {/* Tamil */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Chapter Name (Tamil)"
                        name="chapter_name_tamil"
                        value={data.chapter_name_tamil || ''}
                        onChange={handleChange}
                        placeholder="Enter Name"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Description (Tamil)"
                        name="description_tamil"
                        value={data.description_tamil || ''}
                        onChange={handleChange}
                        placeholder="Enter Description"
                        multiline
                        rows={2}
                    />
                </Grid>

                {/* Telugu */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Chapter Name (Telugu)"
                        name="chapter_name_telugu"
                        value={data.chapter_name_telugu || ''}
                        onChange={handleChange}
                        placeholder="Enter Name"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Description (Telugu)"
                        name="description_telugu"
                        value={data.description_telugu || ''}
                        onChange={handleChange}
                        placeholder="Enter Description"
                        multiline
                        rows={2}
                    />
                </Grid>

                {/* Kannada */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Chapter Name (Kannada)"
                        name="chapter_name_kannada"
                        value={data.chapter_name_kannada || ''}
                        onChange={handleChange}
                        placeholder="Enter Name"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Description (Kannada)"
                        name="description_kannada"
                        value={data.description_kannada || ''}
                        onChange={handleChange}
                        placeholder="Enter Description"
                        multiline
                        rows={2}
                    />
                </Grid>

                {/* Malayalam */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Chapter Name (Malayalam)"
                        name="chapter_name_malayalam"
                        value={data.chapter_name_malayalam || ''}
                        onChange={handleChange}
                        placeholder="Enter Name"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Description (Malayalam)"
                        name="description_malayalam"
                        value={data.description_malayalam || ''}
                        onChange={handleChange}
                        placeholder="Enter Description"
                        multiline
                        rows={2}
                    />
                </Grid>

                {/* Chapter Cover Img */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Chapter Cover Img"
                        name="chapter_cover_img"
                        value={data.chapter_cover_img || ''}
                        onChange={handleChange}
                        placeholder="Enter Image URL or Path"
                    />
                </Grid>
            </Grid>
        </MainCard>
    );
};

const AddStoriesPage = () => {
    const [value, setValue] = useState(0);
    const [storyGenre, setStoryGenre] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [bookType, setBookType] = useState([]);
    const [authorList, setAuthorList] = useState([]);
    const [narratorList, setNarratorList] = useState([]);
    const [languageList, setLanguageList] = useState([]);
    const [storyTitle, setStoryTitle] = useState('');
    const [storyWrapperUrl, setStoryWrapperUrl] = useState('');
    const [storyAuthor, setStoryAuthor] = useState('');
    const [storyNarrator, setStoryNarrator] = useState('');
    const [storyLanguage, setStoryLanguage] = useState('');
    const [storyBookType, setStoryBookType] = useState('');
    const [storyPriority, setStoryPriority] = useState('');
    const [storyExtraInfo, setStoryExtraInfo] = useState('');
    const [storyCredits, setStoryCredits] = useState('');
    const [storyDescription, setStoryDescription] = useState('');
    const [storyEpisodesCount, setStoryEpisodesCount] = useState('');
    const [storyDuration, setStoryDuration] = useState('');

    const [TamilstoryTitle, setTamilstoryTitle] = useState('');
    const [TamilstoryDescription, setTamilstoryDescription] = useState('');
    const [TamilstoryCredits, setTamilstoryCredits] = useState('');
    const [KannadastoryTitle, setKannadastoryTitle] = useState('');
    const [KannadastoryDescription, setKannadastoryDescription] = useState('');
    const [KannadastoryCredits, setKannadastoryCredits] = useState('');
    const [TelugustoryTitle, setTelugustoryTitle] = useState('');
    const [TelugustoryDescription, setTelugustoryDescription] = useState('');
    const [TelugustoryCredits, setTelugustoryCredits] = useState('');
    const [MalayalamstoryTitle, setMalayalamstoryTitle] = useState('');
    const [MalayalamstoryDescription, setMalayalamstoryDescription] = useState('');
    const [MalayalamstoryCredits, setMalayalamstoryCredits] = useState('');

    // [NEW] State for dynamic episodes
    const [numEpisodesInput, setNumEpisodesInput] = useState('');
    const [episodeList, setEpisodeList] = useState([]);

    const handleSetEpisodes = () => {
        const count = parseInt(numEpisodesInput, 10);
        if (isNaN(count) || count <= 0) {
            alert("Please enter a valid number of episodes.");
            return;
        }

        // Create new array with 'count' elements
        // Preserve existing data if increasing count, or slice if decreasing (optional, here we just resize)
        // Better UX: Preserve existing filled data
        setEpisodeList(prev => {
            const newArray = [...prev];
            if (count > prev.length) {
                for (let i = prev.length; i < count; i++) {
                    newArray.push({
                        chapter_id: '',
                        duration: '',
                        chapter_name_english: '',
                        description_english: '',
                        chapter_name_tamil: '',
                        description_tamil: '',
                        chapter_name_telugu: '',
                        description_telugu: '',
                        chapter_name_kannada: '',
                        description_kannada: '',
                        chapter_name_malayalam: '',
                        description_malayalam: '',
                        chapter_cover_img: ''
                    }); // Add object with empty fields
                }
            } else if (count < prev.length) {
                // If user reduces count, we can splice, but maybe warn? 
                // For simplicity, we just slice.
                newArray.splice(count);
            }
            return newArray;
        });
    };

    const handleEpisodeChange = (index, field, value) => {
        setEpisodeList(prev => {
            const newList = [...prev];
            newList[index] = { ...newList[index], [field]: value };
            return newList;
        });
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleNext = () => {
        setValue((prev) => prev + 1);
    };
    //a fxn has to be async  to use await
    const handleSubmit = async () => {
        const formData = {
            story_title: storyTitle,
            story_wrapper_url: storyWrapperUrl,
            story_author: storyAuthor,
            story_narrator: storyNarrator,
            story_genre: storyGenre,
            story_book_type: storyBookType,
            story_language: storyLanguage,

            story_description: storyDescription,
            story_extra_info: storyExtraInfo,
            story_credits: storyCredits,
            story_priority: storyPriority,
            story_episodes_count: episodeList.length > 0 ? episodeList.length : storyEpisodesCount,
            story_duration: storyDuration,
            story_episodes_nos: episodeList.length,
            tamil_story_title: TamilstoryTitle,
            tamil_story_description: TamilstoryDescription,
            tamil_story_credits: TamilstoryCredits,
            kannada_story_title: KannadastoryTitle,
            kannada_story_description: KannadastoryDescription,
            kannada_story_credits: KannadastoryCredits,
            telugu_story_title: TelugustoryTitle,
            telugu_story_description: TelugustoryDescription,
            telugu_story_credits: TelugustoryCredits,
            malayalam_story_title: MalayalamstoryTitle,
            malayalam_story_description: MalayalamstoryDescription,
            malayalam_story_credits: MalayalamstoryCredits,

            // [NEW] Add episodes to payload with explicit mapping
            episodes: episodeList.map(episode => ({
                chapter_id: episode.chapter_id || '',
                duration: episode.duration || '',
                chapter_name_english: episode.chapter_name_english || '',
                description_english: episode.description_english || '',
                chapter_name_tamil: episode.chapter_name_tamil || '',
                description_tamil: episode.description_tamil || '',
                chapter_name_telugu: episode.chapter_name_telugu || '',
                description_telugu: episode.description_telugu || '',
                chapter_name_kannada: episode.chapter_name_kannada || '',
                description_kannada: episode.description_kannada || '',
                chapter_name_malayalam: episode.chapter_name_malayalam || '',
                description_malayalam: episode.description_malayalam || '',
                chapter_cover_img: episode.chapter_cover_img || ''
            }))
        }
        console.log("--- SUBMITTING FORM ---");
        console.log("Full Form Payload:", formData);
        console.log("Episodes Data:", formData.episodes);

        const response = await axiosServices.post("", { method: "add_story", formData });
        if (response.data && response.data.status === 1) {
            alert("Story added successfully");
        } else {
            alert("Story added failed");
        }
        alert('Form submitted');
        console.log("submitted data", formData);

    };
    useEffect(() => {
        const fetchGenreData = async () => {
            try {
                const response = await axiosServices.post("", { method: "story_genre" });
                setGenreList(response.data);
            } catch (error) {
                console.error('Error fetching genre data:', error);
            }
        };
        fetchGenreData();
    }, []);
    useEffect(() => {
        const fetchBookTypeData = async () => {
            try {
                const response = await axiosServices.post("", { method: "book_type" });
                setBookType(response.data);
            } catch (error) {
                console.error('Error fetching book type data:', error);
            }
        };
        fetchBookTypeData();
    }, []);

    useEffect(() => {
        const fetchAuthorData = async () => {
            try {
                const response = await axiosServices.post("", { method: "author_list" });
                setAuthorList(response.data);
            } catch (error) {
                console.error('Error fetching author data:', error);
            }
        };
        fetchAuthorData();
    }, []);

    useEffect(() => {
        const fetchLanguageData = async () => {
            try {
                const response = await axiosServices.post("", { method: "language_list" });
                setLanguageList(response.data);
            } catch (error) {
                console.error('Error fetching language data:', error);
            }
        };
        fetchLanguageData();
    }, []);

    useEffect(() => {
        const fetchNarratorData = async () => {
            try {
                const response = await axiosServices.post("", { method: "narrator_list" });
                setNarratorList(response.data);
            } catch (error) {
                console.error('Error fetching narrator data:', error);
            }
        };
        fetchNarratorData();
    }, []);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <MainCard title="Add New Story">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="story tabs">
                            <Tab label="Basic Details" {...a11yProps(0)} />
                            <Tab label="Languagewise" {...a11yProps(1)} />
                            <Tab label="Chapter Details" {...a11yProps(2)} />
                        </Tabs>
                    </Box>

                    {/* Tab 1: Basic Details */}
                    <CustomTabPanel value={value} index={0}>
                        <Grid container spacing={3}>
                            {/* Left Column */}
                            <Grid item xs={12} md={6}>
                                <Stack spacing={3}>
                                    <TextField
                                        id="story-title"
                                        fullWidth
                                        label="Title"
                                        placeholder="Enter Title"
                                        value={storyTitle}
                                        onChange={(e) => setStoryTitle(e.target.value)}
                                    />
                                    <TextField
                                        id="story-wrapper-url"
                                        fullWidth
                                        label="Wrapper URL"
                                        placeholder="Enter Wrapper URL"
                                        value={storyWrapperUrl}
                                        onChange={(e) => setStoryWrapperUrl(e.target.value)}
                                    />
                                    <TextField
                                        id="story-author"
                                        select
                                        fullWidth
                                        label="Select Author"
                                        value={storyAuthor}
                                        onChange={(e) => setStoryAuthor(e.target.value)}
                                    >
                                        {authorList?.data?.map((item) => (
                                            <MenuItem key={item.author_id} value={item.author_id}>
                                                {item.author_name}
                                            </MenuItem>
                                        ))}
                                        {/* Add more authors dynamically later */}
                                    </TextField>
                                    <TextField
                                        id="story-narrator"
                                        select
                                        fullWidth
                                        label="Select Narrator"
                                        value={storyNarrator}
                                        onChange={(e) => setStoryNarrator(e.target.value)}
                                    >
                                        {narratorList?.data?.map((item) => (
                                            <MenuItem key={item.narrator_id} value={item.narrator_id}>
                                                {item.narrator_name}
                                            </MenuItem>
                                        ))}
                                        {/* Add more narrators dynamically later */}
                                    </TextField>

                                    <Box>
                                        <Typography variant="subtitle1" sx={{ mb: 1 }}>Select Genre</Typography>
                                        <Grid container>

                                            {genreList?.data?.map((genre, index) => (
                                                <Grid item xs={6} sm={4} key={index}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                name={genre.genre_name}
                                                                id={genre.genre_id}
                                                                value={genre.genre_id}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setStoryGenre((prev) => [...prev, genre.genre_id]);
                                                                    } else {
                                                                        setStoryGenre((prev) => prev.filter((id) => id !== genre.genre_id));
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        label={<Typography variant="body2">{genre.genre_name}</Typography>}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Stack>
                            </Grid>

                            {/* Right Column */}
                            <Grid item xs={12} md={6}>
                                <Stack spacing={3}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="story-episodes-count"
                                                fullWidth
                                                label="Number of Episodes"
                                                placeholder="Enter Count"
                                                value={storyEpisodesCount}
                                                onChange={(e) => setStoryEpisodesCount(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="story-duration"
                                                fullWidth
                                                label="Duration"
                                                placeholder="HH:MM"
                                                value={storyDuration}
                                                onChange={(e) => setStoryDuration(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="story-language"
                                                select
                                                fullWidth
                                                label="Language"
                                                value={storyLanguage}
                                                onChange={(e) => setStoryLanguage(e.target.value)}
                                            >
                                                {languageList?.data?.map((item) => (
                                                    <MenuItem key={item.language_id} value={item.language_id}>
                                                        {item.language_name_english}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="story-book-type"
                                                select
                                                fullWidth
                                                label="Book Type"
                                                value={storyBookType}
                                                onChange={(e) => setStoryBookType(e.target.value)}
                                            >
                                                {bookType?.data?.map((item) => (
                                                    <MenuItem value={item.type_id} id={item.type_id}>{item.type_name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    <TextField
                                        id="story-description"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Description"
                                        placeholder="Description in English"
                                        value={storyDescription}
                                        onChange={(e) => setStoryDescription(e.target.value)}
                                    />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="story-extra-info"
                                                fullWidth
                                                label="Extra Info"
                                                placeholder="Enter Extra Info"
                                                value={storyExtraInfo}
                                                onChange={(e) => setStoryExtraInfo(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="story-priority"
                                                fullWidth
                                                label="Priority Order"
                                                placeholder="Enter Priority"
                                                value={storyPriority}
                                                onChange={(e) => setStoryPriority(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>

                                    <TextField
                                        id="story-credits"
                                        fullWidth
                                        label="Credits"
                                        placeholder="Enter Credits"
                                        value={storyCredits}
                                        onChange={(e) => setStoryCredits(e.target.value)}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>

                        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                            <Button variant="contained" onClick={handleNext}>
                                Next
                            </Button>
                        </Stack>
                    </CustomTabPanel>

                    {/* Tab 2: Languagewise */}
                    <CustomTabPanel value={value} index={1}>
                        <Grid container spacing={4}>
                            {/* Tamil */}
                            <Grid item xs={12} md={6}>
                                <Stack spacing={2}>
                                    <Typography variant="h4" align="center">Tamil</Typography>
                                    <TextField id="tamil-title" fullWidth label="Title" value={TamilstoryTitle} onChange={(e) => setTamilstoryTitle(e.target.value)} placeholder="Enter Title" />
                                    <TextField id="tamil-description" fullWidth multiline rows={4} label="Description" value={TamilstoryDescription} onChange={(e) => setTamilstoryDescription(e.target.value)} placeholder="Description in Tamil" />
                                    <TextField id="tamil-credits" fullWidth label="Credits" value={TamilstoryCredits} onChange={(e) => setTamilstoryCredits(e.target.value)} placeholder="Enter Credits" />
                                </Stack>
                            </Grid>

                            {/* Kannada */}
                            <Grid item xs={12} md={6}>
                                <Stack spacing={2}>
                                    <Typography variant="h4" align="center">Kannada</Typography>
                                    <TextField id="kannada-title" fullWidth label="Title" value={KannadastoryTitle} onChange={(e) => setKannadastoryTitle(e.target.value)} placeholder="Enter Title" />
                                    <TextField id="kannada-description" fullWidth multiline rows={4} label="Description" value={KannadastoryDescription} onChange={(e) => setKannadastoryDescription(e.target.value)} placeholder="Description in Kannada" />
                                    <TextField id="kannada-credits" fullWidth label="Credits" value={KannadastoryCredits} onChange={(e) => setKannadastoryCredits(e.target.value)} placeholder="Enter Credits" />
                                </Stack>
                            </Grid>

                            {/* Telugu */}
                            <Grid item xs={12} md={6}>
                                <Stack spacing={2}>
                                    <Typography variant="h4" align="center">Telugu</Typography>
                                    <TextField id="telugu-title" fullWidth label="Title" value={TelugustoryTitle} onChange={(e) => setTelugustoryTitle(e.target.value)} placeholder="Enter Title" />
                                    <TextField id="telugu-description" fullWidth multiline rows={4} label="Description" value={TelugustoryDescription} onChange={(e) => setTelugustoryDescription(e.target.value)} placeholder="Description in Telugu" />
                                    <TextField id="telugu-credits" fullWidth label="Credits" value={TelugustoryCredits} onChange={(e) => setTelugustoryCredits(e.target.value)} placeholder="Enter Credits" />
                                </Stack>
                            </Grid>

                            {/* Malayalam */}
                            <Grid item xs={12} md={6}>
                                <Stack spacing={2}>
                                    <Typography variant="h4" align="center">Malayalam</Typography>
                                    <TextField id="malayalam-title" fullWidth label="Title" value={MalayalamstoryTitle} onChange={(e) => setMalayalamstoryTitle(e.target.value)} placeholder="Enter Title" />
                                    <TextField id="malayalam-description" fullWidth multiline rows={4} label="Description" value={MalayalamstoryDescription} onChange={(e) => setMalayalamstoryDescription(e.target.value)} placeholder="Description in Malayalam" />
                                    <TextField id="malayalam-credits" fullWidth label="Credits" value={MalayalamstoryCredits} onChange={(e) => setMalayalamstoryCredits(e.target.value)} placeholder="Enter Credits" />
                                </Stack>
                            </Grid>
                        </Grid>

                        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                            <Button variant="contained" onClick={handleNext}>
                                Next
                            </Button>
                        </Stack>
                    </CustomTabPanel>

                    {/* Tab 3: Chapter Details */}
                    <CustomTabPanel value={value} index={2}>
                        <Box sx={{ p: 5, bgcolor: 'grey.100', borderRadius: 2 }}>
                            <Grid container alignItems="center" spacing={3}>
                                <Grid item>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                        How many episodes would you like to add?
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <TextField
                                            id="chapter-episodes-to-add"
                                            fullWidth
                                            variant="outlined"
                                            sx={{ bgcolor: 'white' }}
                                            type="number"
                                            value={numEpisodesInput}
                                            onChange={(e) => setNumEpisodesInput(e.target.value)}
                                            placeholder="Count"
                                        />
                                        <Button variant="contained" onClick={handleSetEpisodes}>
                                            Set
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* [NEW] Dynamic Episode Forms */}
                        <Box sx={{ mt: 3 }}>
                            {episodeList.map((episodeData, index) => (
                                <EpisodeForm
                                    key={index}
                                    index={index}
                                    data={episodeData}
                                    onChange={handleEpisodeChange}
                                />
                            ))}
                        </Box>

                        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Stack>
                    </CustomTabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default AddStoriesPage;
