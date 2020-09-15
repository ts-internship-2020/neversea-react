import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { List, makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import menuConfig from 'constants/menuConfig'
import menuStyle from 'assets/jss/components/menuStyle'
import MenuItem from "./MenuItem";

const useStyles = makeStyles(menuStyle);

function Menu({ miniActive }) {
  const classes = useStyles();
  const location = useLocation();

  const activeRoute = useCallback(routeName => location.pathname.indexOf(routeName) > -1, [location.pathname]) 
    const menuItems = menuConfig

  return menuItems && <nav>
    <List className={classes.menuList}>
      {menuItems.map((menu, key) => {
        return <MenuItem key={key} menu={menu} miniActive={miniActive} activeRoute={activeRoute} />;
      })}
    </List>
  </nav>
}

Menu.propTypes = {
  miniActive: PropTypes.bool.isRequired
}

export default Menu;