import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactEmergencyRoundedIcon from '@mui/icons-material/ContactEmergencyRounded';
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupsIcon from '@mui/icons-material/Groups';
import {Link, NavLink} from "react-router-dom";
import classNames from 'classnames';

import styles from '../../styles/Navlink.module.css';


export const mainListItems = (
    <React.Fragment>
        <NavLink to='' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    // className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <LibraryBooksIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Course"/>
                </ListItemButton>
            )}
        </NavLink>
        <NavLink to='' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    // className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <CalendarMonthIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Schedule"/>
                </ListItemButton>
            )}
        </NavLink>
        <NavLink to='' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    // className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <GroupsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Groups"/>
                </ListItemButton>
            )}
        </NavLink>
        <NavLink to='' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    // className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <BarChartIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Reports"/>
                </ListItemButton>
            )}
        </NavLink>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        {/*<ListSubheader component="div" inset>*/}
        {/*  Saved reports*/}
        {/*</ListSubheader>*/}
        <NavLink to='/users' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Users'/>
                </ListItemButton>
            )}
        </NavLink>
        <NavLink to='/roles' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <ContactEmergencyRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Role"/>
                </ListItemButton>
            )}
        </NavLink>
        <NavLink to='/permissions' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <LockPersonRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Permissions"/>
                </ListItemButton>
            )}
        </NavLink>
    </React.Fragment>
);
