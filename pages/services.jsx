import React from 'react';
import Link from '../src/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import ArrowButton from '../src/ui/ArrowButton';
import Head from 'next/head';

const useStyles = makeStyles((theme) => ({
  specialText: {
    fontFamily: 'Pacifico',
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: '1em',
  },
  icon: {
    marginLeft: '2em',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  servicesContainer: {
    marginTop: '10em',
    [theme.breakpoints.down('sm')]: {
      padding: 25,
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: '0.7rem',
    height: 35,
    padding: 5,
    [theme.breakpoints.down('sm')]: {
      marginBottom: '2em',
    },
  },
}));

const Services = ({ setValue, setSelectedIndex }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container direction='column'>
      <Head>
        <title key='title'>
          Top Custom Software Development Services | Arc Development
        </title>
        <meta
          name='description'
          key='description'
          content='Cutting-edge software, mobile app, and website development services with sleek custom designs - get a free online estimate instantly!'
        />
        <meta
          property='og:title'
          content='Bringing West Cost Technology to the Midwest | Services'
          key='og:title'
        />
        <meta property='og:url' key='og:url' content='arc.com/services' />
        <link rel='canonical' key='canonical' href='arc.com/services' />
      </Head>
      <Grid
        item
        style={{
          marginLeft: matchesSM ? 0 : '5em',
          marginTop: matchesSM ? '1em' : '2em',
        }}
      >
        <Typography
          align={matchesSM ? 'center' : undefined}
          variant='h1'
          gutterButton
        >
          Services
        </Typography>
      </Grid>
      {/* IOS/Android Block */}
      <Grid item>
        {' '}
        <Grid
          container
          justify={matchesSM ? 'center' : 'flex-end'}
          className={classes.servicesContainer}
          style={{ marginTop: matchesSM ? '1em' : '5em' }}
          direction='row'
        >
          <Grid
            item
            style={{
              textAlign: matchesSM ? 'center' : undefined,
              width: matchesSM ? undefined : '35em',
            }}
          >
            <Typography variant='h4'>IOS/Android app Development</Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              Extend Functionality. Extend Access. Increase Engagement
            </Typography>
            <Typography variant='subtitle1'>
              Integrate your web experience or create a standalone app{' '}
              {matchesSM ? null : <br />} with either mobile platform
            </Typography>
            <Button
              component={Link}
              onClick={() => {
                setValue(1);
                setSelectedIndex(2);
              }}
              style={{ textDecoration: 'none' }}
              href='/mobileapps'
              variant='outlined'
              className={classes.learnButton}
            >
              {' '}
              <span style={{ marginRight: 10 }}>Learn More</span>
              <ArrowButton
                width={10}
                height={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid item style={{ marginRight: matchesSM ? 0 : '5em' }}>
            <img
              className={classes.icon}
              width='250em'
              alt='Mobile phone icon'
              src='/assets/mobileIcon.svg'
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Custome Software Block */}
      <Grid item>
        {' '}
        <Grid
          container
          justify={matchesSM ? 'center' : undefined}
          className={classes.servicesContainer}
          direction='row'
        >
          <Grid
            item
            style={{
              marginLeft: matchesSM ? 0 : '5em',
              textAlign: matchesSM ? 'center' : undefined,
            }}
          >
            <Typography variant='h4'>Custome Software Development</Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              Save Energy. Save Time. Save Money
            </Typography>
            <Typography variant='subtitle1'>
              Complete digital solution, from investigation to{' '}
              <span className={classes.specialText}>celebration.</span>
            </Typography>
            <Button
              variant='outlined'
              component={Link}
              onClick={() => {
                setValue(1);
                setSelectedIndex(1);
              }}
              style={{ textDecoration: 'none' }}
              href='/customesoftware'
              className={classes.learnButton}
            >
              {' '}
              <span style={{ marginRight: 10 }}>Learn More</span>
              <ArrowButton
                width={10}
                height={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid item>
            <img
              className={classes.icon}
              alt='custome software icon'
              src='/assets/customsoftware.svg'
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Website Block */}
      <Grid item>
        {' '}
        <Grid
          container
          justify={matchesSM ? 'center' : 'flex-end'}
          className={classes.servicesContainer}
          style={{ marginBottom: '10em' }}
          direction='row'
        >
          <Grid
            item
            style={{
              textAlign: matchesSM ? 'center' : undefined,
              width: matchesSM ? undefined : '35em',
            }}
          >
            <Typography variant='h4'>Website Development</Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              Reach More. Discover More. Sell More
            </Typography>
            <Typography variant='subtitle1'>
              Optimized for Search Engines,built for speed
            </Typography>
            <Button
              component={Link}
              onClick={() => {
                setValue(1);
                setSelectedIndex(3);
              }}
              style={{ textDecoration: 'none' }}
              href='/websites'
              variant='outlined'
              className={classes.learnButton}
            >
              {' '}
              <span style={{ marginRight: 10 }}>Learn More</span>
              <ArrowButton
                width={10}
                height={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid item style={{ marginRight: matchesSM ? 0 : '5em' }}>
            <img
              className={classes.icon}
              width='250em'
              alt='Web icon'
              src='/assets/websiteIcon.svg'
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Services;
