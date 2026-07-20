import React from 'react';
import style from './ProgressBar.module.css'
import { CircularProgress, Box, Typography } from '@mui/material';

export default function ProgressBar({ value }) {

  return (
    <Box className={style.progressContainer} >
      <CircularProgress size={80} variant="determinate" color="success" value={value} />
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'white', fontWeight: '800' }}
        >
          {`${value}%`}
        </Typography>
      </Box>
    </Box>
  );
}