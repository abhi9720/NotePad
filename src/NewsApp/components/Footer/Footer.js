import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
    color: theme.palette.common.white,
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} spacing={6}>
          <Link href="https://github.com/abhi9720" target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </Link>
          <Link href="https://www.linkedin.com/in/abhi9720" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </Link>
          <Link href="https://www.instagram.com/abhi9720_" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </Link>
        </Grid>
      </Grid>
    </footer>
  )
}

