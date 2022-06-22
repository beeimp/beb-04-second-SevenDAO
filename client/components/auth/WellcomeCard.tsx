import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import router from 'next/router';
import { FunctionComponent } from 'react';

interface AuthWellComeCardProps {
  title: string;
  message: string;
}

const AuthWellComeCard: FunctionComponent<AuthWellComeCardProps> = ({ title, message }) => {
  return (
    <Card sx={{ padding: '1em', borderBottom: '1px solid black' }}>
      <CardMedia
        component="img"
        image="/sevendao-logo-row.png"
        alt="sevnedao-logo"
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          router.push('/');
        }}
      ></CardMedia>
      <Typography sx={{ fontSize: '1.5em' }}>Hello Again!</Typography>
      <CardContent>Wellcom back you&apos;ve been missed!</CardContent>
    </Card>
  );
};

export default AuthWellComeCard;
