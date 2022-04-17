import { ListInformation, InsertInformation } from "../../components";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { getTransactionsService } from '../../services/transactions';

const TabPanel = (props) => {
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
        <Box sx={{ mt: 5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
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
export const Transactions = () => {
  const [value, setValue] = useState(0);
  const [transactions, setTransactions] = React.useState();

  useEffect(() => {
    !transactions && getTransactionsService().then((value) => setTransactions(value));
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          marginTop: '40px',
        }}
      >
        <Box sx={{ maxWidth: 1000, margin: '0 auto' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Transações" {...a11yProps(1)} />
              <Tab label="Nova transação" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <TabPanel sx={{ margin: '0 !important' }} value={value} index={1}>
            <InsertInformation />
          </TabPanel>
          <TabPanel value={value} index={0}>
            <ListInformation data={transactions} />
          </TabPanel>
        </Box>
      </Box>
    </Container >
  );
}
