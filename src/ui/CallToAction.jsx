import React from 'react';
import ReactGA from 'react-ga';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowButton from './ArrowButton';
import useMediaQeury from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: '0.7rem',
    height: 35,
    padding: 5,
    [theme.breakpoints.down('sm')]: {
      marginBottom: '2em',
    },
  },
  background: {
    backgroundImage: `url("/assets/background.jpg")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '60em',
    width: '100%',
    backgroundAttachment: 'fixed',
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url("/assets/mobileBackground.jpg")`,
      backgroundAttachment: 'inherit',
    },
  },
  estimateButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 80,
    width: 205,
    backgroundColor: theme.palette.common.orange,
    fontSize: '1.5rem',
    marginRight: '5em',
    marginLeft: '2em',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
}));

const CallToAction = ({ setValue }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQeury(theme.breakpoints.down('sm'));
  return (
    <Grid
      container
      justify={matchesSM ? 'center' : 'space-between'}
      alignItems='center'
      className={classes.background}
      direction={matchesSM ? 'column' : 'row'}
    >
      <Grid
        item
        style={{
          marginLeft: matchesSM ? 0 : '5em',
          textAlign: matchesSM ? 'center' : 'inherit',
        }}
      >
        <Grid container direction='column'>
          <Grid item>
            <Typography
              variant='h1'
              gutterBottom
              style={{ lineHeight: matchesSM ? 1.1 : null }}
            >
              Simple Software <br />
              {matchesSM && <br />}
              Revolutionary Result
            </Typography>
            <Typography
              variant='subtitle2'
              style={{ fontSize: matchesSM ? '1.25rem' : '1.5rem' }}
            >
              Take Advantage of 12st century
            </Typography>
            <Grid container item justify={matchesSM ? 'center' : undefined}>
              <Button
                component={Link}
                underline='none'
                href='/revolution'
                onClick={() => setValue(2)}
                variant='outlined'
                className={classes.learnButton}
              >
                {' '}
                <span style={{ marginRight: 5 }}>Learn More</span>
                <ArrowButton
                  width={10}
                  height={10}
                  fill={theme.palette.common.blue}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          component={Link}
          href='/estimate'
          onClick={() => {
            setValue(5);
            ReactGA.event({
              category: 'Estimate',
              action: 'Call To Action Pressed',
            });
          }}
          variant='contained'
          className={classes.estimateButton}
        >
          Free Estimate
        </Button>
      </Grid>
    </Grid>
  );
};

export default CallToAction;
