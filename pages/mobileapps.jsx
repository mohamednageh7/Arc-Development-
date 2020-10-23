import React from 'react';
import Grid from '@material-ui/core/Grid';
import Lottie from 'react-lottie';
import Link from '../src/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Head from 'next/head';
import integrationAnimation from '../src/animations/integrationAnimation/data.json';
import CallToAction from '../src/ui/CallToAction';

const useStyles = makeStyles((theme) => ({
  heading: {
    maxWidth: '40em',
  },
  arrowContainer: {
    marginTop: '0.5em',
  },
  rowContainer: {
    paddingLeft: '5em ',
    paddingRight: '5em',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '1.5em',
      paddingRight: '1.5em',
    },
  },
}));

const MobileApps = ({ setSelectedIndex, setValue }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: integrationAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Grid container direction='column'>
      <Head>
        <title key='title'>
          IOS/Andriod App Design Development | Arc Development
        </title>
        <meta
          name='description'
          key='description'
          content='Mobile Apps Made Easy | Our sutting-edge development process lets us build beautifully designed, carefully crafted apps for both IOS and Android.'
        />
        <meta
          property='og:title'
          content='Bringing West Cost Technology to the Midwest | iOS/Android App Development'
          key='og:title'
        />
        <meta property='og:url' key='og:url' content='arc.com/mobileapps' />
        <link rel='canonical' key='canonical' href='arc.com/mobileapps' />
      </Head>
      <Grid
        item
        container
        direction='row'
        justify={matchesMD ? 'center' : undefined}
        className={classes.rowContainer}
        style={{ marginTop: matchesXS ? '1em' : '2em' }}
      >
        <Hidden mdDown>
          <Grid
            item
            className={classes.arrowContainer}
            style={{ marginRight: '1em', marginLeft: '-3.5em' }}
          >
            <IconButton
              style={{ backgroundColor: 'transparent' }}
              component={Link}
              style={{ textDecoration: 'none' }}
              href='/customesoftware'
              onClick={() => setSelectedIndex(1)}
            >
              <img
                alt='Back to custom software page'
                src='/assets/backArrow.svg'
              />
            </IconButton>
          </Grid>
        </Hidden>
        <Grid item container direction='column' className={classes.heading}>
          <Grid item>
            <Typography variant='h1' align={matchesMD ? 'center' : undefined}>
              IOS/Android App Development
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='body1'
              align={matchesMD ? 'center' : undefined}
              paragraph
            >
              Mobile apps allow you to take your rools on the go.
            </Typography>
            <Typography
              variant='body1'
              align={matchesMD ? 'center' : undefined}
              paragraph
            >
              Whether you want an app or your customers, employees, or yourself,
              we can build cross-platform native solutions for any part of your
              business process. This opens you up to a whole new world of
              possibilities by taking advantage of phone features like the
              camera, GPS, push notifications, and more.
            </Typography>
            <Typography
              variant='body1'
              align={matchesMD ? 'center' : undefined}
              paragraph
            >
              Convenience. Connection.
            </Typography>
          </Grid>
        </Grid>
        <Hidden mdDown>
          <Grid item className={classes.arrowContainer}>
            <IconButton
              style={{ backgroundColor: 'transparent', textDecoration: 'none' }}
              component={Link}
              href='/websites'
              onClick={() => setSelectedIndex(3)}
            >
              <img
                src='/assets/forwardArrow.svg'
                alt='Forward to Website Development Page'
              />
            </IconButton>
          </Grid>
        </Hidden>
      </Grid>
      <Grid
        item
        container
        direction={matchesSM ? 'column' : 'row'}
        style={{ marginTop: '15em', marginBottom: '15em' }}
        className={classes.rowContainer}
      >
        <Grid item container direction='column' md>
          <Grid item>
            <Typography
              align={matchesSM ? 'center' : undefined}
              variant='h4'
              gutterBottom
            >
              Intergration
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              align={matchesSM ? 'center' : undefined}
              variant='body1'
              paragraph
            >
              Our technology enables an innate interconnection between web and
              mobile applications, putting everything you need right in one
              convenient place.
            </Typography>
            <Typography
              align={matchesSM ? 'center' : undefined}
              variant='body1'
              paragraph
            >
              This allows you to extend your reach, reinvent interaction, and
              develop a stronger relationship wiht your users than ever before.
            </Typography>
          </Grid>
        </Grid>
        <Grid item md>
          <Lottie
            style={{
              maxWidth: matchesMD ? '15em' : '20em',
              height: matchesMD ? '20em' : undefined,
            }}
            options={defaultOptions}
          />
        </Grid>
        <Grid item container direction='column' md>
          <Grid item>
            <Typography
              align={matchesSM ? 'center' : 'right'}
              variant='h4'
              gutterBottom
            >
              Simultaneous Platform Support
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              align={matchesSM ? 'center' : 'right'}
              variant='body1'
              paragraph
            >
              Our cutting-edge development process allows us to create apps for
              iphone, Android, and tablets - all at the same time.
            </Typography>
            <Typography
              align={matchesSM ? 'center' : 'right'}
              variant='body1'
              paragraph
            >
              This significantly reduces costs and creates a more unified brand
              experience across all devices.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction={matchesMD ? 'column' : 'row'}
        style={{
          marginBottom: '15em',
          display: matchesMD ? 'grid' : undefined,
        }}
        className={classes.rowContainer}
      >
        <Grid item container direction='column' alignItems='center' md>
          <Grid item>
            <Typography align='center' variant='h4' gutterBottom>
              Extend Functionality
            </Typography>
          </Grid>
          <Grid item>
            <img src='/assets/swissKnife.svg' alt='swiss army knife' />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction='column'
          style={{
            marginTop: matchesMD ? '10em' : 0,
            marginBottom: matchesMD ? '10em' : 0,
          }}
          alignItems='center'
          md
        >
          <Grid item>
            <Typography align='center' variant='h4' gutterBottom>
              Extend Access
            </Typography>
          </Grid>
          <Grid item>
            <img
              style={{ maxWidth: matchesXS ? '20em' : '28em' }}
              src='/assets/extendAccess.svg'
              alt='tear-one-off sign'
            />
          </Grid>
        </Grid>
        <Grid item container direction='column' alignItems='center' md>
          <Grid item>
            <Typography align='center' variant='h4' gutterBottom>
              Increase Ingagment
            </Typography>
          </Grid>
          <Grid item>
            <img
              src='/assets/increaseEngagement.svg'
              alt='app with notification'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <CallToAction setValue={setValue} />
      </Grid>
    </Grid>
  );
};

export default MobileApps;
