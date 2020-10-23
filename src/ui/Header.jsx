import React, { useState, useEffect, Fragment } from 'react';
import ReactGA from 'react-ga';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Link from '../Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';

// for smooth scroll up
const ElevationScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

// Inline style
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  logo: {
    height: '8em',
    textTransform: 'none',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em',
    },
  },
  tabcontainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: '#fff',
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    marginLeft: 'auto',
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: '#fff',
    opacity: '0.7',
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: '1',
    },
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const Header = ({ value, setValue, selectedIndex, setSelectedIndex }) => {
  const classes = useStyles();

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [prevURL, setPrevURL] = useState('');
  // handle main menu
  const handleChange = (e, newvalue) => {
    setValue(newvalue);
  };

  // handle subMenu
  const handleMenuItemClick = (e, index) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(index);
  };

  // Menu control
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };
  const tab = [
    {
      to: '/',
      label: 'Home',
      val: 0,
    },
    {
      to: '/services',
      label: 'Services',
      val: 1,
      ariaOwns: anchorEl ? 'simple-menu' : undefined,
      ariaHasPopup: anchorEl ? 'true' : undefined,
      mouseOver: (e) => handleClick(e),
    },
    {
      label: 'The Revolution',
      to: '/revolution',
      val: 2,
    },
    {
      label: 'About Us',
      to: '/about',
      val: 3,
    },
    {
      label: 'Contact Us',
      to: '/contact',
      val: 4,
    },
  ];

  const subMenu = [
    {
      to: '/services',
      text: 'Services',
      selectedIndex: 0,
      val: 1,
    },
    {
      to: '/customesoftware',
      text: 'Custome software Development',
      selectedIndex: 1,
      val: 1,
    },
    {
      to: '/mobileapps',
      text: 'IOS/Android apps Development',
      selectedIndex: 2,
      val: 1,
    },
    {
      to: '/websites',
      text: 'websites Development',
      selectedIndex: 3,
      val: 1,
    },
  ];
  useEffect(() => {
    if (prevURL !== window.location.pathname) {
      setPrevURL(window.location.pathname);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
    [...tab, ...subMenu].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.to}`:
          if (value !== route.val) {
            setValue(route.val);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        case '/estimate':
          if (value !== 5) {
            setValue(5);
          }
          break;
        default:
          break;
      }
    });
  }, [value, selectedIndex, setSelectedIndex, setValue, tab, subMenu]);

  const tabs = (
    <Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabcontainer}
        indicatorColor='primary'
      >
        {tab.map((singleTab, index) => (
          <Tab
            key={`${singleTab}${index}largScreen`}
            aria-owns={singleTab.ariaOwns}
            aria-haspopup={singleTab.ariaHasPopup}
            onMouseOver={singleTab.mouseOver}
            className={classes.tab}
            component={Link}
            style={{ textDecoration: 'none' }}
            href={singleTab.to}
            label={singleTab.label}
          />
        ))}
      </Tabs>
      <Button
        variant='contained'
        onClick={(e) => {
          setValue(5);
          ReactGA.event({
            category: 'Estimate',
            action: 'Desktop Header Pressed',
          });
        }}
        color='secondary'
        style={{ textDecoration: 'none' }}
        component={Link}
        href='/estimate'
        className={classes.button}
      >
        Free Estimate
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted
      >
        {subMenu.map((singleTab, i) => (
          <MenuItem
            key={`${singleTab}${i}Sub`}
            onClick={(e) => {
              handleMenuItemClick(e, i);
              setValue(1);
              handleClose();
            }}
            component={Link}
            href={singleTab.to}
            classes={{ root: classes.menuItem }}
            selected={i === selectedIndex && value === 1}
          >
            {singleTab.text}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
  const drawer = (
    <Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{
          paper: classes.drawer,
        }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {tab.map((singleTab, i) => (
            <ListItem
              divider
              button
              onClick={() => {
                setOpenDrawer(false);
                setValue(singleTab.val);
              }}
              selected={value === singleTab.val}
              classes={{ selected: classes.drawerItemSelected }}
              key={`${singleTab}${i}drawer`}
              component={Link}
              href={singleTab.to}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {singleTab.label}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected,
            }}
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
              ReactGA.event({
                category: 'Estimate',
                action: 'Mobile Header Pressed',
              });
            }}
            selected={value === 5}
            component={Link}
            href='/estimate'
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </Fragment>
  );
  return (
    <>
      <ElevationScroll>
        <AppBar position='fixed' className={classes.appBar} color='primary'>
          <Toolbar disableGutters>
            <Button
              component={Link}
              href='/'
              disableRipple
              className={classes.logoContainer}
              style={{ textDecoration: 'none' }}
              onClick={() => setValue(0)}
            >
              <svg
                className={classes.logo}
                id='Layer_1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 480 139'
              >
                <style>{`.st0{fill:none}.st1{fill:#fff}.st2{font-family:Raleway;font-weight: 300;}.st6{fill:none;stroke:#000;stroke-width:3;stroke-miterlimit:10}`}</style>
                <path d='M448.07-1l-9.62 17.24-8.36 14.96L369.93 139H-1V-1z' />
                <path className='st0' d='M-1 139h479.92v.01H-1z' />
                <text
                  transform='translate(261.994 65.233)'
                  className='st1 st2'
                  fontSize='57'
                >
                  Arc
                </text>
                <text
                  transform='translate(17.692 112.015)'
                  className='st1 st2'
                  fontSize='54'
                >
                  Development
                </text>
                <path
                  className='st0'
                  d='M382.44 116.43l47.65-85.23 8.36-14.96M369.83 139l-.01.01L362 153'
                />
                <path
                  d='M438.76 15.76l-56.42 100.91c-12.52-10.83-20.45-26.82-20.45-44.67 0-32.58 26.42-59 59-59 6.23 0 12.24.97 17.87 2.76z'
                  fill='#0b72b9'
                />
                <path d='M479.89 72c0 32.58-26.42 59-59 59-14.73 0-28.21-5.4-38.55-14.33l56.42-100.91c23.85 7.57 41.13 29.89 41.13 56.24z' />
                <g id='Group_186' transform='translate(30.153 11.413)'>
                  <g id='Group_185'>
                    <g id='Words'>
                      <path
                        id='Path_59'
                        className='st1'
                        d='M405.05 14.4l-.09 80.38-7.67-.01.06-52.25-29.4 52.21-7.94-.01 45.04-80.32z'
                      />
                    </g>
                  </g>
                </g>
                <path
                  className='st0'
                  d='M457-17l-8.93 16-9.62 17.24-8.36 14.96L369.93 139l-.01.01L361 155'
                />
              </svg>
            </Button>
            <Hidden mdDown>{tabs}</Hidden>
            <Hidden lgUp>{drawer}</Hidden>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
