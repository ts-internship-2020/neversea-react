import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

import { List, ListItem, Collapse, ListItemText, makeStyles, Tooltip } from '@material-ui/core';

import userMenuStyle from 'assets/jss/components/userMenuStyle'
import cx from "classnames";
import LanguageSelector from "./LanguageSelector"
import Person from "@material-ui/icons/Person";
import avatar_default from "assets/img/default-avatar.png";
import { useTranslation } from 'react-i18next';
import { useEmail } from 'hooks/useEmail';

const useStyles = makeStyles(userMenuStyle);

function UserMenu({ miniActive, avatar, language, changeLanguage }) {
    const [openAvatar, setOpenAvatar] = useState(false);
    const [currentMiniActive] = useState(true);
    const classes = useStyles();
    const { t } = useTranslation();
    const [email] = useEmail();

    const openCollapseAvatar = useCallback(e => {
        setOpenAvatar(!openAvatar);
        e.preventDefault();
    }, [openAvatar])


    const itemText = classes.itemText +
        " " +
        cx({
            [classes.itemTextMini]: miniActive && currentMiniActive
        });
    
     const displayName = email || "User"
    return (
        <div className={classes.user}>
            <div className={classes.photo}>
                <img src={avatar ? avatar : avatar_default} className={classes.avatarImg} alt="..." />
            </div>
            <List className={classes.list}>
                <ListItem className={classes.item + " " + classes.userItem}>
                    <NavLink
                        to={"/"}
                        className={classes.itemLink + " " + classes.userCollapseButton}
                        onClick={openCollapseAvatar}
                    >
                        <ListItemText
                            primary={displayName}
                            secondary={
                                <b
                                    className={
                                        classes.caret + " " + classes.userCaret +
                                        " " +
                                        (openAvatar ? classes.caretActive : "")
                                    }
                                />
                            }
                            disableTypography={true}
                            className={itemText + " " + classes.userItemText}
                        />
                    </NavLink>
                    <Collapse in={openAvatar} unmountOnExit classes={{ wrapper: classes.collapseWrapper }}>
                        <List className={classes.list + classes.collapseList}>
                            <Tooltip disableHoverListener={!miniActive} title={t('MyProfile')}>
                                <ListItem className={classes.collapseItem}>
                                    <NavLink to="/myProfile" className={classes.itemLink}>
                                        <span className={classes.collapseItemMini}>
                                            <Person />
                                        </span>
                                        <ListItemText
                                            primary={t('MyProfile')}
                                            disableTypography={true}
                                            className={itemText}
                                        />
                                    </NavLink>
                                </ListItem>
                            </Tooltip>

                            <ListItem className={classes.selectorItem}>
                                <LanguageSelector
                                    language={language}
                                    changeLanguage={changeLanguage}
                                    miniActive={miniActive}
                                />
                            </ListItem>
                                                    </List>
                    </Collapse>
                </ListItem>
            </List>
        </div >
    );
}

UserMenu.propTypes = {
    avatar: PropTypes.string,
    miniActive: PropTypes.bool.isRequired,
    changeLanguage: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired
};

export default UserMenu;