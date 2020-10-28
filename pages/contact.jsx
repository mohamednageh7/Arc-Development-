import React, { useState } from 'react';
import ReactGA from 'react-ga';
import Link from '../src/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Head from 'next/head';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

import ArrowButton from '../src/ui/ArrowButton';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url('/assets/background.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-rpeat',
    height: '60em',
    paddingBottom: '10em',
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url('/assets/mobileBackground.jpg')`,
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
    [theme.breakpoints.down('md')]: {
      margin: 0,
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: '0.7rem',
    height: 35,
    padding: 5,
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
  },
  message: {
    border: `2px solid ${theme.palette.common.blue}`,
    marginTop: '5em',
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
      marginTop: '2em',
    },
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: '1rem',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 225,
    },
  },
}));

const ContactUs = ({ setValue }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneHelper, setPhoneHelper] = useState('');

  const [message, setMessage] = useState('');

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    backgroundColor: '',
  });

  const onChange = (e) => {
    let match;
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value);
        match = /^\w+([.-]?\w+)*@\w([.-]?\w+)*(\.\w{2,3})+$/.test(
          e.target.value
        );
        if (!match) {
          setEmailHelper('Invalid email');
        } else {
          setEmailHelper('');
        }

        break;
      case 'phone':
        setPhone(e.target.value);
        match = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
          e.target.value
        );
        if (!match) {
          setPhoneHelper('Invalid phone ');
        } else {
          setPhoneHelper('');
        }
        break;
      default:
        break;
    }
  };

  const onConfirm = () => {
    setLoading(true);
    ReactGA.event({
      category: 'Message',
      action: 'Sent Message',
    });
    axios
      .get(
        'https://us-central1-material-ui-project-d77ea.cloudfunctions.net/sendMail',
        {
          params: {
            name: name,
            email: email,
            phone: phone,
            message: message,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setOpen(false);
        setName('');
        setEmail('');
        setMessage('');
        setPhone('');
        setAlert({
          open: true,
          message: 'Message sent succefully',
          backgroundColor: '#4BB543',
        });
      })
      .catch((err) => {
        setLoading(false);
        setAlert({
          open: true,
          message: 'Something went wrong please try again',
          backgroundColor: '#FF3232',
        });
      });
  };
  const buttonContent = (
    <>
      Send Message
      <img
        src='/assets/send.svg'
        alt='air plane'
        style={{ marginLeft: '1em' }}
      />
    </>
  );

  return (
    <Grid container direction='row'>
      <Head>
        <title key='title'>Contact Us | Arc Development</title>
        <meta
          name='description'
          key='description'
          content='Let us guide you through the custome software design and development process. Send us a message with any of your ideas or questions to get started!'
        />
        <meta
          property='og:title'
          content='Bringing West Cost Technology to the Midwest | Contact Us'
          key='og:title'
        />
        <meta property='og:url' key='og:url' content='arc.com/contact' />
        <link rel='canonical' key='canonical' href='arc.com/contact' />
      </Head>
      <Grid
        item
        container
        direction='column'
        justify='center'
        alignItems='center'
        style={{
          marginBottom: matchesMD ? '5em' : 0,
          marginTop: matchesSM ? '1em' : matchesMD ? '5em' : 0,
        }}
        lg={4}
        xl={3}
      >
        <Grid item>
          <Grid container direction='column'>
            <Grid item>
              <Typography
                align={matchesMD ? 'center' : undefined}
                variant='h4'
                style={{
                  lineHeight: 1,
                }}
              >
                Contact Us
              </Typography>
              <Typography
                variant='body1'
                align={matchesMD ? 'center' : undefined}
                style={{ color: theme.palette.common.blue }}
              >
                We're waiting
              </Typography>
            </Grid>

            <Grid item container style={{ marginTop: '2em' }}>
              <Grid item>
                <img
                  src='/assets/phone.svg'
                  alt='phone'
                  style={{ marginRight: '0.5em' }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant='body1'
                  style={{ color: theme.palette.common.blue, fontSize: '1rem' }}
                >
                  <a
                    href='tel:0501086159'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    (555) 555-5555
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container syle={{ marginBottom: '2em' }}>
              <Grid item>
                <img
                  src='/assets/email.svg'
                  alt='envelop'
                  style={{ marginRight: '0.5em', verticalAlign: 'bottom' }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant='body1'
                  style={{ color: theme.palette.common.blue, fontSize: '1rem' }}
                >
                  <a
                    href='mailto:mohamednageh7@yahoo.com'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    mohamednageh7@yahoo.com
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction='column' style={{ width: '20em' }}>
              <Grid item style={{ marginBottom: '0.5em' }}>
                <TextField
                  label='Name'
                  id='name'
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item style={{ marginBottom: '0.5em' }}>
                <TextField
                  label='Email'
                  id='email'
                  error={emailHelper.length !== 0}
                  helperText={emailHelper}
                  fullWidth
                  value={email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item style={{ marginBottom: '0.5em' }}>
                <TextField
                  label='Phone'
                  id='phone'
                  error={phoneHelper.length !== 0}
                  helperText={phoneHelper}
                  fullWidth
                  value={phone}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Grid item style={{ width: '20em' }}>
              <TextField
                InputProps={{ disableUnderline: true }}
                value={message}
                className={classes.message}
                fullWidth
                placeholder='Tell us more about your project'
                multiline
                rows={10}
                id='message'
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
            <Grid item container justify='center' style={{ marginTop: '2em' }}>
              <Button
                disabled={
                  name.length === 0 ||
                  message.length === 0 ||
                  email.length === 0 ||
                  phone.length === 0 ||
                  phoneHelper.length !== 0 ||
                  emailHelper.length !== 0
                }
                variant='contained'
                className={classes.sendButton}
                onClick={() => setOpen(true)}
              >
                {buttonContent}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        style={{ zIndex: 1302 }}
        open={open}
        fullScreen={matchesSM}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? '0em' : '2em',
            paddingBottom: matchesXS ? '1em' : '3em',
            paddingLeft: matchesXS
              ? 0
              : matchesSM
              ? '5em'
              : matchesMD
              ? '10em'
              : '20em',
            paddingRight: matchesXS
              ? 0
              : matchesSM
              ? '5em'
              : matchesMD
              ? '10em'
              : '20em',
          },
        }}
      >
        <DialogContent>
          <Grid container direction='column'>
            <Grid item>
              <Typography
                align='center'
                variant='h4'
                style={{ fontSize: matchesSM ? '1.5rem' : '2.5em' }}
                gutterBottom
              >
                Confirm Message
              </Typography>
            </Grid>
            <Grid item style={{ marginBottom: '0.5em' }}>
              <TextField
                label='Name'
                id='name'
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item style={{ marginBottom: '0.5em' }}>
              <TextField
                label='Email'
                id='email'
                error={emailHelper.length !== 0}
                helperText={emailHelper}
                fullWidth
                value={email}
                onChange={onChange}
              />
            </Grid>
            <Grid item style={{ marginBottom: '0.5em' }}>
              <TextField
                label='Phone'
                id='phone'
                error={phoneHelper.length !== 0}
                helperText={phoneHelper}
                fullWidth
                value={phone}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Grid item style={{ width: matchesSM ? '100%' : '20em' }}>
            <TextField
              InputProps={{ disableUnderline: true }}
              value={message}
              className={classes.message}
              fullWidth
              placeholder='Tell us more about your project'
              multiline
              rows={5}
              id='message'
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid
            item
            container
            direction={matchesSM ? 'column' : 'row'}
            alignItems='center'
            style={{ marginTop: matchesXS ? '1em' : '2em' }}
          >
            <Grid item>
              <Button
                style={{ fontWeight: 300 }}
                color='primary'
                onClick={() => setOpen(false)}
              >
                Cancle
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={
                  name.length === 0 ||
                  message.length === 0 ||
                  email.length === 0 ||
                  phone.length === 0 ||
                  phoneHelper.length !== 0 ||
                  emailHelper.length !== 0
                }
                variant='contained'
                className={classes.sendButton}
                onClick={onConfirm}
              >
                {loading ? <CircularProgress size={30} /> : buttonContent}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
      <Grid
        item
        container
        direction={matchesMD ? 'column' : 'row'}
        justify={matchesMD ? 'center' : undefined}
        alignItems='center'
        className={classes.background}
        lg={8}
        xl={9}
      >
        <Grid
          item
          style={{
            marginLeft: matchesMD ? 0 : '3em',
            textAlign: matchesMD ? 'center' : 'inherit',
          }}
        >
          <Grid container direction='column'>
            <Grid item>
              <Typography align={matchesMD ? 'center' : undefined} variant='h1'>
                Simple Software <br />
                Revolutionary Result
              </Typography>
              <Typography
                align={matchesMD ? 'center' : undefined}
                variant='subtitle2'
                style={{ fontSize: '1.25rem' }}
              >
                Take Advantage of 12st century
              </Typography>
              <Grid container item justify={matchesMD ? 'center' : undefined}>
                <Button
                  component={Link}
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
                action: 'Conatct Page Pressed',
              });
            }}
            variant='contained'
            className={classes.estimateButton}
          >
            Free Estimate
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactUs;
