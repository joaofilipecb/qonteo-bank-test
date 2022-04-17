import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { insertInformationService } from '../../services/transactions';
function InsertInformation() {
  const [spending, setSpending] = useState({
    amount: ''
  });

  const [category, setCategory] = useState('Food');

  const handleChange = (prop) => (event) => {
    setSpending({ ...setSpending, [prop]: event.target.value });
  };

  const sendTransaction = () => {
    insertInformationService({
      "category": category,
      "spending": spending.amount
    });
  }

  return (
    <Card variant="outlined" sx={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 10, paddingTop: 6 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ marginBottom: '30px', marginTop: '30px' }} fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Your spending</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={setSpending.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Your spending"
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
            <MenuItem value="House">House</MenuItem>
          </Select>
        </FormControl>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
          mt="30px"
        >
          <Button onClick={() => sendTransaction()} variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Grid>
      </Box>
    </Card >
  );
}

export { InsertInformation }