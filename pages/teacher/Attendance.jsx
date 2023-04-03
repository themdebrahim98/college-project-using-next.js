import { useState } from 'react';
import { Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Check, Close } from '@mui/icons-material';

const GreenCheckbox = styled(Checkbox)({
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '& .MuiSvgIcon-root': {
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 0.3s ease-in-out',
    color: '#4CAF50',
  },
  '& .Mui-checked .MuiSvgIcon-root': {
    transform: 'scale(0.8)',
    transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms, color 0.3s ease-in-out',
    color: '#4CAF50',
  },
});

const RedCheckbox = styled(Checkbox)({
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '& .MuiSvgIcon-root': {
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 0.3s ease-in-out',
    color: '#f44336',
  },
  '& .Mui-checked .MuiSvgIcon-root': {
    transform: 'scale(0.8)',
    transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms, color 0.3s ease-in-out',
    color: '#4CAF50',
  },
});

export default function App() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      {checked ? (
        <GreenCheckbox
          checked={checked}
          onChange={handleChange}
          icon={<Check />}
          checkedIcon={<Check />}
          inputProps={{ 'aria-label': 'green animated checkbox checked' }}
        />
      ) : (
        <RedCheckbox
          checked={checked}
          onChange={handleChange}
          icon={<Close />}
          checkedIcon={<Check />}
          inputProps={{ 'aria-label': 'red animated checkbox unchecked' }}
        />
      )}
    </div>
  );
}
