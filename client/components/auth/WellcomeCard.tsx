import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import router from 'next/router';
import { FunctionComponent } from 'react';

interface AuthWellComeCardProps {
  title: string;
  message: string;
}

const AuthWellComeCard: FunctionComponent<AuthWellComeCardProps> = ({ title, message }) => {
  return (
    <Card sx={{ padding: '1em', borderBottom: '1px solid black', margin: '0 0 10px 0' }}>
      <CardMedia
        component="img"
        image="/sevendao-logo-row.png"
        alt="sevnedao-logo"
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          router.push('/');
        }}
      ></CardMedia>
      <Typography sx={{ fontSize: '1.5em', padding: '18px' }}>{title}</Typography>
      <CardContent>{message}</CardContent>
    </Card>
  );
};

export default AuthWellComeCard;
