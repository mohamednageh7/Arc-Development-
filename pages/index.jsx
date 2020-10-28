import React from 'react';
import ReactGA from 'react-ga';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Link from '../src/Link';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useMediQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ArrowButton from '../src/ui/ArrowButton';
import Lottie from 'react-lottie';
import CallToAction from '../src/ui/CallToAction.jsx';
import animationData from '../src/animations/landinganimation/data';

const useStyles = makeStyles((theme) => ({
  animation: {
    maxWidth: '50em',
    minWidth: '21em',
    marginTop: '2em',
    marginLeft: '10%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '30em',
    },
  },
  estimateButton: {
    ...theme.typography.estimate,
    background: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 145,
    marginRight: 40,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: '1em',
  },
  LearnButtonHero: {
    ...theme.typography.learnButton,
    fontSize: '0.9rem',
    height: 45,
    width: 145,
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
  mainContainer: {
    marginTop: '5em',
    [theme.breakpoints.down('md')]: {
      marginTop: '3em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '2em',
    },
  },
  heroTextContainer: {
    minWidth: '21.5em',
    marginLeft: '1em',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
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
    marginTop: '12em',
    [theme.breakpoints.down('sm')]: {
      padding: 25,
    },
  },
  revolutionBackground: {
    backgroundImage: `url('/assets/repeatingBackground.svg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%',
  },
  revolutionCard: {
    position: 'absolute',
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    padding: '10em',
    [theme.breakpoints.down('sm')]: {
      padding: '8em 0 8em 0',
      borderRadius: 0,
      width: '100%',
    },
  },
  infoBackground: {
    backgroundImage: `url('/assets/infoBackground.svg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%',
  },
}));

const LandingPage = ({ setValue, setSelectedIndex }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediQuery(theme.breakpoints.down('sm'));
  const matchesXS = useMediQuery(theme.breakpoints.down('xs'));
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Grid container direction='column' className={classes.mainContainer}>
      <Head>
        <title key='title'>
          Custom Software, Mobile Apps, and Websites | Arc Development
        </title>
        <meta
          name='description'
          key='description'
          content='Pristine software custom-designed from the ground up with cutting-edge optimization. Use our free estimate calculator to check your project cost!'
        />
        <meta
          property='og:title'
          content='Bringing West Cost Technology to the Midwest | Arc Development'
          key='og:title'
        />
        <meta property='og:url' content='arc.com' key='og:url' />
        <link rel='canonical' key='canonical' href='arc.com' />
      </Head>
      {/* Hero Block */}
      <Grid item>
        <Grid container justify='flex-end' alignItems='center' direction='row'>
          <Grid sm item className={classes.heroTextContainer}>
            <Typography variant='h1' align='center'>
              Bringing West Cost Technology <br /> to the midwest
            </Typography>
            <Grid
              container
              justify='center'
              className={classes.buttonContainer}
            >
              <Grid item>
                <Button
                  component={Link}
                  onClick={() => {
                    setValue(5);
                    ReactGA.event({
                      category: 'Estimate',
                      action: 'Index Page Pressed',
                    });
                  }}
                  href='/estimate'
                  className={classes.estimateButton}
                  variant='contained'
                >
                  Free Estimate
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='outlined'
                  component={Link}
                  onClick={() => setValue(2)}
                  href='/revolution'
                  className={classes.LearnButtonHero}
                >
                  {' '}
                  <span style={{ marginRight: 10 }}>Learn More</span>
                  <ArrowButton
                    width={15}
                    height={15}
                    fill={theme.palette.common.blue}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid sm item className={classes.animation}>
            <Lottie options={defaultOptions} height={'100%'} width={'100%'} />
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

      {/* IOS/Android Block */}
      <Grid item>
        {' '}
        <Grid
          container
          justify={matchesSM ? 'center' : 'flex-end'}
          className={classes.servicesContainer}
          direction='row'
        >
          <Grid
            item
            style={{
              textAlign: matchesSM ? 'center' : undefined,
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
              alt='Mobile phone icon'
              src='/assets/mobileIcon.svg'
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Website Block */}
      <Grid item style={{ marginLeft: matchesSM ? 0 : '5em' }}>
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
              textAlign: matchesSM ? 'center' : undefined,
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
          <Grid item>
            <img
              className={classes.icon}
              alt='Web icon'
              src='/assets/websiteIcon.svg'
            />
          </Grid>
        </Grid>
      </Grid>
      {/* The revolution Block */}
      <Grid item>
        <Grid
          container
          alignItems='center'
          justify='center'
          style={{ height: '100em', marginTop: '12em' }}
        >
          <Card className={classes.revolutionCard}>
            <CardContent>
              <Grid
                container
                style={{ textAlign: 'center' }}
                direction='column'
              >
                <Grid item>
                  <Typography variant='h3' gutterBottom>
                    The Revolution
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle1'>
                    Visionary insights coupled with cutting-edge technology is a
                    recipe for revolution
                  </Typography>
                  <Button
                    component={Link}
                    onClick={() => setValue(2)}
                    href='/revolution'
                    variant='outlined'
                    className={classes.LearnButtonHero}
                  >
                    {' '}
                    <span style={{ marginRight: 10 }}>Learn More</span>
                    <ArrowButton
                      width={15}
                      height={15}
                      fill={theme.palette.common.blue}
                    />
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <div className={classes.revolutionBackground} />
        </Grid>
      </Grid>

      {/* Information Block */}
      <Grid item>
        <Grid
          container
          direction='row'
          alignItems='center'
          style={{ height: '80em' }}
          className={classes.infoBackground}
        >
          <Grid
            item
            container
            style={{
              textAlign: matchesXS ? 'center' : 'inherit',
            }}
            direction={matchesXS ? 'column' : 'row'}
          >
            <Grid
              item
              sm
              style={{ marginLeft: matchesXS ? 0 : matchesSM ? '2em' : '5em' }}
            >
              <Grid
                container
                style={{ marginBottom: matchesXS ? '10em' : 0 }}
                direction='column'
              >
                <Typography variant='h1' style={{ color: '#fff' }}>
                  About Us
                </Typography>
                <Typography variant='subtitle2'>Let's get persona</Typography>
                <Grid item>
                  <Button
                    component={Link}
                    href='/about'
                    onClick={() => setValue(3)}
                    variant='outlined'
                    style={{
                      color: '#fff',
                      borderColor: '#fff',
                    }}
                    className={classes.learnButton}
                  >
                    {' '}
                    <span style={{ marginRight: 10 }}>Learn More</span>
                    <ArrowButton width={10} height={10} fill='#fff' />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              sm
              style={{
                marginRight: matchesXS ? 0 : matchesSM ? '2em' : '5em',
                textAlign: matchesXS ? 'center' : 'right',
              }}
            >
              <Grid container direction='column'>
                <Typography variant='h1' style={{ color: '#fff' }}>
                  Contact Us
                </Typography>
                <Typography variant='subtitle2'>
                  Say hello
                  <span role='img' aria-label='waving hand'>
                    👋
                  </span>
                </Typography>
                <Grid item>
                  <Button
                    component={Link}
                    href='/contact'
                    onClick={() => setValue(4)}
                    variant='outlined'
                    style={{
                      color: '#fff',
                      borderColor: '#fff',
                    }}
                    className={classes.learnButton}
                  >
                    {' '}
                    <span style={{ marginRight: 10 }}>Learn More</span>
                    <ArrowButton width={10} height={10} fill='#fff' />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Call To Action block */}
      <Grid item>
        <CallToAction setValue={setValue} />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
