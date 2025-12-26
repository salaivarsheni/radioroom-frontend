// MATERIAL - UI
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// ASSETS
import { SearchNormal1 } from 'iconsax-react';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/dashboard/users/details?id=${searchValue}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 2 } }}>
      <FormControl sx={{ width: { xs: '100%', md: 400 } }}>
        <OutlinedInput
          id="header-search"
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchNormal1 size={16} />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'weight'
          }}
          placeholder="Enter user id / Email / Mobile number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ '& .MuiOutlinedInput-input': { p: 1.5 } }}
        />
      </FormControl>
    </Box>
  );
};

export default Search;
