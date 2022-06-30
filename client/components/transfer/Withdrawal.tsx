import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TransferWithdrawalProps {
  tab1: React.ReactNode;
  tab2?: React.ReactNode;
}

const TransferWithdrawal: React.FunctionComponent<TransferWithdrawalProps> = ({ tab1, tab2 }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <h2 style={{ textAlign: 'center' }}>SDAO 출금</h2>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="출금하기" {...a11yProps(0)} />
          {tab2 ? <Tab label="선물하기" {...a11yProps(1)} /> : undefined}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {tab1}
      </TabPanel>
      {tab2 ? (
        <TabPanel value={value} index={1}>
          {tab2}
        </TabPanel>
      ) : undefined}
    </Box>
  );
};

export default TransferWithdrawal;
