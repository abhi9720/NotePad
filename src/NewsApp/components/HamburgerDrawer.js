import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import './HamburgerDrawer.css'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import categories from '../data/categories';
import { SwipeableDrawer } from '@material-ui/core';


const useStyles = makeStyles({
  list: {
    width: 200,
    paddingtop: 10,
    paddingRight: 5
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({ setCategory }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,

  });

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 700);

  useEffect(() => {
    function resizehappend() {
      if (window.innerWidth <= 700) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener("resize", resizehappend, false);
  }, []);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === isMobile ? "top" : "left",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          Categories
        </ListItem>

      </List>
      <Divider />
      <List>
        {categories.map((text, index) => (
          <ListItem style={{ height: 40, borderRadius: 3 }} button key={text} onClick={() => setCategory(text)}>

            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={isMobile ? "top" : "left"}>
        <Button onClick={toggleDrawer(isMobile ? "top" : "left", true)}><MenuIcon /></Button>
        <ThemeProvider theme={theme}>
          <SwipeableDrawer anchor={isMobile ? "top" : "left"} open={state[isMobile ? "top" : "left"]} onClose={toggleDrawer(isMobile ? "top" : "left", false)}>
            {list(isMobile ? "top" : "left")}
          </SwipeableDrawer>
        </ThemeProvider>
      </React.Fragment>

    </div>
  );
}
