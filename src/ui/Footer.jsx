import React from 'react';
import Link from '../Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: '100%',
    zIndex: 1302,
    position: 'relative',
  },
  adornment: {
    width: '25em',
    verticalAlign: 'bottom',
    [theme.breakpoints.down('md')]: {
      width: '21em',
    },
    [theme.breakpoints.down('xs')]: {
      width: '15em',
    },
  },
  mainContainer: {
    position: 'absolute',
  },
  link: {
    color: '#fff',
    fontFamily: 'Arial',
    fontSize: '0.75rem',
    fontWight: 'bold',
  },
  gridItem: {
    margin: '3em',
  },
  icon: {
    height: '2em',
    width: '2em',
    [theme.breakpoints.down('xs')]: {
      height: '2.5em',
      width: '2.5em',
    },
  },
  socialContainer: {
    position: 'absolute',
    marginTop: '-4em',
    right: '1.5em',
    [theme.breakpoints.down('xs')]: {
      right: '0.6em',
    },
  },
}));

const Footer = ({ setValue, setSelectedIndex }) => {
  const classes = useStyles();

  const bottomLink = [
    [{ text: 'Home', to: '/', index: 0 }],
    [
      { text: 'Services', to: '/services', index: 1, selectedIndex: 0 },
      {
        text: 'Custom Software Development',
        to: '/customesoftware',
        selectedIndex: 1,
      },
      {
        text: 'IOS/Android app Development',
        to: '/mobileapps',
        selectedIndex: 2,
      },
      { text: 'Web Development', to: '/websites', selectedIndex: 3 },
    ],
    [
      { text: 'The Revolution', to: '/revolution', index: 2 },
      { text: 'Vision', to: '/revolution', index: 2 },
      { text: 'Technology', to: '/revolution', index: 2 },
      { text: 'Process', to: '/revolution', index: 2 },
    ],
    [
      { text: 'About Us', to: '/about', index: 3 },
      { text: 'History', to: '/about', index: 3 },
      { text: 'Team', to: '/about', index: 3 },
    ],
    [{ text: 'Contact Us', to: '/contact', index: 4 }],
  ];

  const icons = [
    {
      name: '/assets/facebook.svg',
      alt: 'facebook',
      link: 'https://www.facebook.com/',
    },
    {
      name: '/assets/twitter.svg',
      alt: 'twitter',
      link: 'https://www.twitter.com',
    },
    {
      name: '/assets/instagram.svg',
      alt: 'instagram',
      link: 'https://www.instagram.com',
    },
  ];
  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
        <Grid container justify='center' className={classes.mainContainer}>
          {bottomLink.map((rows) => (
            <Grid key={`${rows[0].text}rows`} item className={classes.gridItem}>
              <Grid
                container
                spacing={2}
                style={{ margin: 0 }}
                direction='column'
              >
                {rows.map((link) => (
                  <Grid
                    key={`${link}${link.text}link`}
                    item
                    className={classes.link}
                    component={Link}
                    href={link.to}
                    onClick={(e) => {
                      setValue(link.index);
                      setSelectedIndex(link.selectedIndex);
                    }}
                  >
                    {link.text}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Hidden>
      <img
        alt='black decorative slash'
        src='/assets/footerAdornment.svg'
        className={classes.adornment}
      />
      <Grid
        container
        justify='flex-end'
        spacing={2}
        className={classes.socialContainer}
      >
        {icons.map((icon) => (
          <Grid
            item
            key={icon.name}
            component={'a'}
            href={icon.link}
            rel='noopener noreferrer'
            target='_blank'
          >
            <img alt={icon.alt} src={icon.name} className={classes.icon} />
          </Grid>
        ))}
      </Grid>
    </footer>
  );
};

export default Footer;
