import React, { Fragment, useState } from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';
import { cloneDeep } from 'lodash';
import Lottie from 'react-lottie';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Head from 'next/head';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import estimateAnimation from '../src/animations/estimateAnimation/data.json';

const useStyle = makeStyles((theme) => ({
  icon: {
    width: '12em',
    height: '10em',
  },
  estimateButton: {
    ...theme.typography.estimate,
    borderRadius: 15,
    backgroundColor: theme.palette.common.orange,
    height: 50,
    width: 225,
    fontSize: '1.25rem',
    marginTop: '5em',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  message: {
    border: `2px solid ${theme.palette.common.blue}`,
    marginTop: '3em',
    marginBottom: '3em',
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
      marginTop: '2em',
    },
  },
  specialText: {
    fontFamily: 'Railway',
    fontWight: 700,
    fontSize: '1.5rem',
    color: theme.palette.common.orange,
  },
}));

const defaultQuestions = [
  {
    id: 1,
    title: 'Which service are you interested in?',
    active: true,
    options: [
      {
        id: 1,
        title: 'Custom Software Development',
        subtitle: null,
        icon: '/assets/software.svg',
        iconAlt: 'three floating screen',
        selected: false,
        cost: 0,
      },
      {
        id: 2,
        title: 'iOS/Andriod App Development',
        subtitle: null,
        icon: '/assets/mobile.svg',
        iconAlt: 'phones and tablet outline',
        selected: false,
        cost: 0,
      },
      {
        id: 3,
        title: 'Website Development',
        subtitle: null,
        icon: '/assets/website.svg',
        iconAlt: 'computer outline',
        selected: false,
        cost: 0,
      },
    ],
  },
];

const softwareQuestions = [
  { ...defaultQuestions[0], active: false },
  {
    id: 2,
    title: 'Which platforms do you supported?',
    subtitle: 'Select all that apply.',
    options: [
      {
        id: 1,
        title: 'Web Application',
        subtitle: null,
        icon: '/assets/website.svg',
        iconAlt: 'computer outline',
        selected: false,
        cost: 100,
      },
      {
        id: 2,
        title: 'iOS Application',
        subtitle: null,
        icon: '/assets/iphone.svg',
        iconAlt: 'outline of iphone',
        selected: false,
        cost: 100,
      },
      {
        id: 3,
        title: 'Android Application',
        subtitle: null,
        icon: '/assets/android.svg',
        iconAlt: 'outlines of android phone',
        selected: false,
        cost: 100,
      },
    ],
    active: true,
  },
  {
    id: 3,
    title: 'Which features do you expect to use?',
    subtitle: 'Select all that apply.',
    options: [
      {
        id: 1,
        title: 'Photo/Video',
        subtitle: null,
        icon: '/assets/camera.svg',
        iconAlt: 'camera outline',
        selected: false,
        cost: 25,
      },
      {
        id: 2,
        title: 'GPS',
        subtitle: null,
        icon: '/assets/gps.svg',
        iconAlt: 'gps pin',
        selected: false,
        cost: 25,
      },
      {
        id: 3,
        title: 'File Transfer',
        subtitle: null,
        icon: '/assets/upload.svg',
        iconAlt: 'outline of cloud with arrow pointing up',
        selected: false,
        cost: 25,
      },
    ],
    active: false,
  },
  {
    id: 4,
    title: 'Which features do you expect to use?',
    subtitle: 'Select all that apply.',
    options: [
      {
        id: 1,
        title: 'Users/Authentication',
        subtitle: null,
        icon: '/assets/users.svg',
        iconAlt: 'outline of a person with a plus sign',
        selected: false,
        cost: 25,
      },
      {
        id: 2,
        title: 'Biometrics',
        subtitle: null,
        icon: '/assets/biometrics.svg',
        iconAlt: 'fingerprint',
        selected: false,
        cost: 25,
      },
      {
        id: 3,
        title: 'Push Notifications',
        subtitle: null,
        icon: '/assets/bell.svg',
        iconAlt: 'outline of a bell',
        selected: false,
        cost: 25,
      },
    ],
    active: false,
  },
  {
    id: 5,
    title: 'What type of custom features do you expect to need?',
    subtitle: 'Select one.',
    options: [
      {
        id: 1,
        title: 'Low Complexity',
        subtitle: '(Informational)',
        icon: '/assets/info.svg',
        iconAlt: "'i' inside a circle",
        selected: false,
        cost: 25,
      },
      {
        id: 2,
        title: 'Medium Complexity',
        subtitle: '(Interactive, Customizable, Realtime)',
        icon: '/assets/customized.svg',
        iconAlt: 'two toggle switches',
        selected: false,
        cost: 50,
      },
      {
        id: 3,
        title: 'High Complexity',
        subtitle: '(Data Modeling and Computation)',
        icon: '/assets/data.svg',
        iconAlt: 'outline of line graph',
        selected: false,
        cost: 100,
      },
    ],
    active: false,
  },
  {
    id: 6,
    title: 'How many users do you expect?',
    subtitle: 'Select one.',
    options: [
      {
        id: 1,
        title: '0-10',
        subtitle: null,
        icon: '/assets/person.svg',
        iconAlt: 'person outline',
        selected: false,
        cost: 1,
      },
      {
        id: 2,
        title: '10-100',
        subtitle: null,
        icon: '/assets/persons.svg',
        iconAlt: 'outline of two people',
        selected: false,
        cost: 1.25,
      },
      {
        id: 3,
        title: '100+',
        subtitle: null,
        icon: '/assets/people.svg',
        iconAlt: 'outline of three people',
        selected: false,
        cost: 1.5,
      },
    ],
    active: false,
  },
];

const websiteQuestions = [
  { ...defaultQuestions[0], active: false },
  {
    id: 2,
    title: 'Which type of website are you wanting?',
    subtitle: 'Select one.',
    options: [
      {
        id: 1,
        title: 'Basic',
        subtitle: '(Informational)',
        icon: '/assets/info.svg',
        iconAlt: 'person outline',
        selected: false,
        cost: 100,
      },
      {
        id: 2,
        title: 'Interactive',
        subtitle: "(Users, API's, Messaging)",
        icon: '/assets/customized.svg',
        iconAlt: 'outline of two people',
        selected: false,
        cost: 200,
      },
      {
        id: 3,
        title: 'E-Commerce',
        subtitle: '(Sales)',
        icon: '/assets/globe.svg',
        iconAlt: 'outline of three people',
        selected: false,
        cost: 250,
      },
    ],
    active: true,
  },
];

const Estimate = () => {
  const classes = useStyle();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [questions, setQuestion] = useState(defaultQuestions);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneHelper, setPhoneHelper] = useState('');

  const [message, setMessage] = useState('');

  const [total, setTotal] = useState(0);

  const [service, setService] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [customeFeatures, setCustomeFeatures] = useState('');
  const [category, setCategory] = useState('');
  const [users, setUsers] = useState('');
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    backgroundColor: '',
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: estimateAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const nextQuestion = () => {
    const newQuestions = cloneDeep(questions);
    const currentlyActive = newQuestions.filter((question) => question.active);
    const activeIndex = currentlyActive[0].id - 1;

    const nextIndex = activeIndex + 1;

    newQuestions[activeIndex] = { ...currentlyActive[0], active: false };

    newQuestions[nextIndex] = { ...newQuestions[nextIndex], active: true };

    setQuestion(newQuestions);
  };

  const previousQuestion = () => {
    const newQuestions = cloneDeep(questions);
    const currentlyActive = newQuestions.filter((question) => question.active);
    const activeIndex = currentlyActive[0].id - 1;

    const prevIndex = activeIndex - 1;

    newQuestions[activeIndex] = { ...currentlyActive[0], active: false };

    newQuestions[prevIndex] = { ...newQuestions[prevIndex], active: true };

    setQuestion(newQuestions);
  };

  const navigationPreviousDisabled = () => {
    const currentlyActive = questions.filter((question) => question.active);
    if (currentlyActive[0].id === 1) {
      return true;
    } else {
      return false;
    }
  };

  const navigationNextDisabled = () => {
    const currentlyActive = questions.filter((question) => question.active);
    if (currentlyActive[0].id === questions[questions.length - 1].id) {
      return true;
    } else {
      return false;
    }
  };

  const handleSelect = (id) => {
    const newQuestions = cloneDeep(questions);
    const currentlyActive = newQuestions.filter((question) => question.active);
    const activeIndex = currentlyActive[0].id - 1;

    const newSelected = newQuestions[activeIndex].options[id - 1];
    const previousSelected = currentlyActive[0].options.filter(
      (option) => option.selected
    );

    switch (currentlyActive[0].subtitle) {
      case 'Select one.':
        if (previousSelected[0]) {
          previousSelected[0].selected = !previousSelected[0].selected;
        }
        newSelected.selected = !newSelected.selected;
        break;
      default:
        newSelected.selected = !newSelected.selected;
        break;
    }

    switch (newSelected.title) {
      case 'Custom Software Development':
        setQuestion(softwareQuestions);
        setService(newSelected.title);
        setPlatforms([]);
        setFeatures([]);
        setCustomeFeatures('');
        setCategory('');
        setUsers('');
        break;
      case 'iOS/Andriod App Development':
        setQuestion(softwareQuestions);
        setService(newSelected.title);
        setPlatforms([]);
        setFeatures([]);
        setCustomeFeatures('');
        setCategory('');
        setUsers('');
        break;
      case 'Website Development':
        setQuestion(websiteQuestions);
        setService(newSelected.title);
        setPlatforms([]);
        setFeatures([]);
        setCustomeFeatures('');
        setCategory('');
        setUsers('');
        break;
      default:
        setQuestion(newQuestions);
    }
  };

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

  const getTotal = () => {
    let cost = 0;

    const selection = questions
      .map((question) => question.options.filter((option) => option.selected))
      .filter((question) => question.length > 0);

    selection.map((options) => options.map((option) => (cost += option.cost)));

    if (questions.length > 2) {
      const userCost = questions
        .filter(
          (question) => question.title === 'How many users do you expect?'
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0][0];

      setUsers(userCost.title);

      cost -= userCost.cost;
      cost *= userCost.cost;
    }
    setTotal(cost);
  };

  const getPlatforms = () => {
    let newPlatforms = [];

    if (questions.length > 2) {
      questions
        .filter(
          (question) => question.title === 'Which platforms do you supported?'
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0]
        .map((option) => newPlatforms.push(option.title));

      setPlatforms(newPlatforms);
    }
  };

  const getFeatures = () => {
    let newFeatures = [];

    if (questions.length > 2) {
      questions
        .filter(
          (question) =>
            question.title === 'Which features do you expect to use?'
        )
        .map((question) => question.options.filter((option) => option.selected))
        .map((option) =>
          option.map((newFeature) => newFeatures.push(newFeature.title))
        );

      setFeatures(newFeatures);
    }
  };

  const getCategory = () => {
    if (questions.length === 2) {
      const newCategory = questions
        .filter(
          (question) =>
            question.title === 'Which type of website are you wanting?'
        )[0]
        .options.filter((option) => option.selected)[0].title;

      setCategory(newCategory);
    }
  };

  const sendEstimate = () => {
    setLoading(true);
    ReactGA.event({
      category: 'Estimate',
      action: 'Estimate Sent',
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
            total: total,
            category: category,
            service: service,
            platforms: platforms,
            features: features,
            customeFeatures: customeFeatures,
            users: users,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setDialogOpen(false);

        setAlert({
          open: true,
          message: 'Estimate placed succefully',
          backgroundColor: '#4BB543',
        });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setAlert({
          open: true,
          message: 'Something went wrong please try again',
          backgroundColor: '#FF3232',
        });
      });
  };

  const getCustomFeatures = () => {
    if (questions.length > 2) {
      const newCustomeFeatures = questions
        .filter(
          (question) =>
            question.title ===
            'What type of custom features do you expect to need?'
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0][0].title;

      setCustomeFeatures(newCustomeFeatures);
    }
  };

  const estimateDisabled = () => {
    let disabled = true;

    const emptySelection = questions
      .map((question) => question.options.filter((option) => option.selected))
      .filter((question) => question.length === 0);

    if (questions.length === 2) {
      if (emptySelection.length === 1) {
        disabled = false;
      }
    } else if (questions.length === 1) {
      disabled = true;
    } else if (
      emptySelection.length < 3 &&
      questions[questions.length - 1].options.filter(
        (option) => option.selected
      ).length > 0
    ) {
      disabled = false;
    }
    return disabled;
  };

  const softwareSelection = (
    <Grid container direction='column'>
      <Grid
        item
        container
        alignItems='center'
        style={{ marginBottom: '1.25em' }}
      >
        <Grid item xs={2}>
          <img src='/assets/check.svg' alt='check mark' />
        </Grid>
        <Grid item xs={10}>
          <Typography variant='body1'>
            You want {service}
            {platforms.length > 0
              ? ` for ${
                  //if only web application is selected...
                  platforms.indexOf('Web Application') > -1 &&
                  platforms.length === 1
                    ? //then finish sentence here
                      'a Web Application.'
                    : //otherwise, if web application and another platform is selected...
                    platforms.indexOf('Web Application') > -1 &&
                      platforms.length === 2
                    ? //then finish the sentence here
                      `a Web Application and an ${platforms[1]}.`
                    : //otherwise, if only one platform is selected which isn't web application...
                    platforms.length === 1
                    ? //then finish the sentence here
                      `an ${platforms[0]}`
                    : //otherwise, if other two options are selected...
                    platforms.length === 2
                    ? //then finish the sentence here
                      'an iOS Application and an Android Application.'
                    : //otherwise if all three are selected...
                    platforms.length === 3
                    ? //then finish the sentence here
                      'a Web Application, an iOS Application, and an Android Application.'
                    : null
                }`
              : null}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        alignItems='center'
        style={{ marginBottom: '1.25em' }}
      >
        <Grid item xs={2}>
          <img src='/assets/check.svg' alt='check mark' />
        </Grid>
        <Grid item xs={10}>
          <Typography variant='body1'>
            {'with '}
            {/* if we have features... */}
            {features.length > 0
              ? //...and there's only 1...
                features.length === 1
                ? //then end the sentence here
                  `${features[0]}.`
                : //otherwise, if there are two features...
                features.length === 2
                ? //...then end the sentence here
                  `${features[0]} and ${features[1]}.`
                : //otherwise, if there are three or more features...
                  features
                    //filter out the very last feature...
                    .filter((feature, index) => index !== features.length - 1)
                    //and for those features return their name...
                    .map((feature, index) => (
                      <span key={index}>{`${feature}, `}</span>
                    ))
              : null}
            {features.length > 2
              ? //...and then finally add the last feature with 'and' in front of it
                ` and ${features[features.length - 1]}.`
              : null}
          </Typography>
        </Grid>
      </Grid>

      <Grid item container alignItems='center'>
        <Grid item xs={2}>
          <img src='/assets/check.svg' alt='check mark' />
        </Grid>
        <Grid item xs={10}>
          <Typography variant='body1'>
            The custom features will be of {customeFeatures.toLocaleLowerCase()}{' '}
            {`, and the project will be used by about ${users} users.`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  const websiteSelection = (
    <Grid container direction='column' style={{ marginTop: '14em' }}>
      <Grid item container alignItems='center'>
        <Grid item xs={2}>
          <img src='/assets/check.svg' alt='check mark' />
        </Grid>
        <Grid item xs={10}>
          <Typography variant='body1'>
            You want{' '}
            {category === 'Basic'
              ? 'a Basic Website.'
              : `an ${category} Website.`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
  return (
    <Grid container direction='row'>
      <Head>
        <title key='title'>
          Free Custom Software Estimate | Arc Development
        </title>
        <meta
          name='description'
          key='description'
          content='Use our free online estimate calculator to instantly check the cost of your custome software, mobile app, or website design and development project!'
        />
        <meta
          property='og:title'
          content='Bringing West Cost Technology to the Midwest | Free Estimate'
          key='og:title'
        />
        <meta property='og:url' content='arc.com/estimate' key='og:url' />
        <link rel='canonical' key='canonical' href='arc.com/estimate' />
      </Head>
      <Grid
        item
        container
        direction='column'
        lg
        alignItems={matchesMD ? 'center' : undefined}
      >
        <Grid
          item
          style={{ marginTop: '2em', marginLeft: matchesMD ? 0 : '5em' }}
        >
          <Typography variant='h1' align={matchesMD ? 'center' : undefined}>
            Estimate
          </Typography>
        </Grid>
        <Grid
          item
          style={{
            marginRight: matchesMD ? 0 : '10em',
            maxWidth: '50em',
            marginTop: '14.5em',
          }}
        >
          <Lottie options={defaultOptions} height={'100%'} width={'100%'} />
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction='column'
        alignItems='center'
        lg
        style={{ marginRight: matchesMD ? 0 : '2em', marginBottom: '25em' }}
      >
        {questions
          .filter((question) => question.active)
          .map((question, index) => (
            <Fragment key={index}>
              <Grid item>
                <Typography
                  variant='h1'
                  align='center'
                  style={{
                    fontWeight: 500,
                    marginTop: '5em',
                    fontSize: '2.25rem',
                    lineHeight: 1.25,
                    marginLeft: matchesSM ? '1em' : 0,
                    marginRight: matchesSM ? '1em' : 0,
                  }}
                >
                  {question.title}
                </Typography>
                <Typography
                  variant='body1'
                  align='center'
                  style={{ marginBottom: '2.5em' }}
                  gutterBottom
                >
                  {question.subtitle}
                </Typography>
              </Grid>

              {/* options */}
              <Grid item container>
                {question.options.map((option) => (
                  <Grid
                    key={option.id}
                    item
                    container
                    direction='column'
                    md
                    component={Button}
                    onClick={() => handleSelect(option.id)}
                    style={{
                      display: 'grid',
                      textTransform: 'none',
                      marginBottom: matchesSM ? '1.5em' : 0,
                      backgroundColor: option.selected
                        ? theme.palette.common.orange
                        : null,
                      borderRadius: 0,
                    }}
                  >
                    <Grid item style={{ maxWidth: '14em' }}>
                      <Typography
                        variant='h6'
                        align='center'
                        style={{ marginBottom: '1em' }}
                      >
                        {option.title}
                      </Typography>
                      <Typography variant='caption' align='center'>
                        {option.subtitle}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <img
                        src={option.icon}
                        className={classes.icon}
                        alt={option.iconAlt}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Fragment>
          ))}

        <Grid
          item
          container
          justify='space-between'
          style={{ width: '18em', marginTop: '3em' }}
        >
          <Grid item>
            <IconButton
              disabled={navigationPreviousDisabled()}
              onClick={previousQuestion}
            >
              <img
                src={
                  navigationPreviousDisabled()
                    ? '/assets/backArrowDisabled.svg'
                    : '/assets/backArrow.svg'
                }
                alt='previou question'
              />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              disabled={navigationNextDisabled()}
              onClick={nextQuestion}
            >
              <img
                src={
                  navigationNextDisabled()
                    ? '/assets/forwardArrowDisabled.svg'
                    : '/assets/forwardArrow.svg'
                }
                alt='next question'
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            className={classes.estimateButton}
            disabled={estimateDisabled()}
            onClick={() => {
              setDialogOpen(true);
              getTotal();
              getPlatforms();
              getFeatures();
              getCustomFeatures();
              getCategory();
              ReactGA.event({
                category: 'Estimate',
                action: 'Estimate Checked',
              });
            }}
          >
            Get Estimate
          </Button>
        </Grid>
      </Grid>
      <Dialog
        style={{ zIndex: 1302 }}
        fullScreen={matchesSM}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth='lg'
      >
        <Grid container justify='center'>
          <Grid item>
            <Typography
              variant='h1'
              align='center'
              style={{ marginTop: '1em', marginBottom: '1em' }}
            >
              Estimate
            </Typography>
          </Grid>
        </Grid>
        <DialogContent>
          <Grid
            container
            justify='space-around'
            direction={matchesSM ? 'column' : 'row'}
            alignItems={matchesSM ? 'center' : undefined}
          >
            <Grid
              item
              container
              direction='column'
              md={7}
              style={{ maxWidth: '20em' }}
            >
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
              <Grid item style={{ maxWidth: '20em' }}>
                <TextField
                  InputProps={{ disableUnderline: true }}
                  value={message}
                  className={classes.message}
                  fullWidth
                  multiline
                  rows={10}
                  placeholder='Tell us more about your project'
                  id='message'
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Typography
                  align={matchesSM ? 'center' : undefined}
                  variant='body1'
                  style={{ lineHeight: 1.25 }}
                  paragraph
                >
                  We can create this digital solution for an estimated{' '}
                  <span className={classes.specialText}>
                    ${total.toFixed(2)}
                  </span>
                </Typography>
                <Typography
                  align={matchesSM ? 'center' : undefined}
                  variant='body1'
                  paragraph
                >
                  Fill out your name, phone number, and email, place your
                  request, and we'll get back to you with details moving forward
                  and a final price.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction='column'
              md={5}
              alignItems={matchesSM ? 'center' : undefined}
              style={{ maxWidth: '30em' }}
            >
              <Hidden smDown>
                <Grid item>
                  {questions.length > 2 ? softwareSelection : websiteSelection}
                </Grid>
              </Hidden>

              <Grid item>
                <Button
                  variant='contained'
                  className={classes.estimateButton}
                  onClick={sendEstimate}
                  disabled={
                    name.length === 0 ||
                    message.length === 0 ||
                    email.length === 0 ||
                    phone.length === 0 ||
                    phoneHelper.length !== 0 ||
                    emailHelper.length !== 0
                  }
                >
                  {loading ? (
                    <CircularProgress size={30} />
                  ) : (
                    <>
                      Place Request
                      <img
                        src='/assets/send.svg'
                        alt='paper airplane'
                        style={{ marginLeft: '0.5em' }}
                      />
                    </>
                  )}
                </Button>
              </Grid>
              <Hidden mdUp>
                <Grid
                  item
                  style={{
                    marginBottom: matchesSM ? '5em' : 0,
                    marginTop: matchesSM ? '1em' : 0,
                  }}
                >
                  <Button
                    style={{ fontWeight: 300 }}
                    color='primary'
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Hidden>
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
    </Grid>
  );
};

export default Estimate;
