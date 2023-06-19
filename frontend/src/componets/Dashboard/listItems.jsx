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
import FactCheckIcon from '@mui/icons-material/FactCheck';
import {Link, NavLink} from "react-router-dom";
import classNames from 'classnames';

import styles from '../../styles/Navlink.module.css';
import {useSelector} from "react-redux";

///////////ADMIN//////////
export const AdminMainListItems = (
    <React.Fragment>
        <NavLink to='/subjects' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <LibraryBooksIcon/>
                    </ListItemIcon>
                    <ListItemText primary="ПРЕДМЕТИ"/>
                </ListItemButton>
            )}
        </NavLink>
        {/*<NavLink to='' className={*/}
        {/*    classNames(*/}
        {/*        styles['nav-link'],*/}
        {/*    )*/}
        {/*}>*/}
        {/*    {({isActive, isExact}) => (*/}
        {/*        <ListItemButton*/}
        {/*            // className={isActive ? classNames(styles.active) : ''}*/}
        {/*        >*/}
        {/*            <ListItemIcon>*/}
        {/*                <CalendarMonthIcon/>*/}
        {/*            </ListItemIcon>*/}
        {/*            <ListItemText primary="РОЗКЛАДИ"/>*/}
        {/*        </ListItemButton>*/}
        {/*    )}*/}
        {/*</NavLink>*/}
        <NavLink to='/classes' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <GroupsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="КЛАСИ"/>
                </ListItemButton>
            )}
        </NavLink>
        <NavLink to='/journal' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <BarChartIcon/>
                    </ListItemIcon>
                    <ListItemText primary="ЖУРНАЛИ"/>
                </ListItemButton>
            )}
        </NavLink>
    </React.Fragment>
);

export const AdminSecondaryListItems = (
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
                    <ListItemText primary='КОРИСТУВАЧІ'/>
                </ListItemButton>
            )}
        </NavLink>
        {/*<NavLink to='/roles' className={*/}
        {/*    classNames(*/}
        {/*        styles['nav-link'],*/}
        {/*    )*/}
        {/*}>*/}
        {/*    {({isActive, isExact}) => (*/}
        {/*        <ListItemButton*/}
        {/*            className={isActive ? classNames(styles.active) : ''}*/}
        {/*        >*/}
        {/*            <ListItemIcon>*/}
        {/*                <ContactEmergencyRoundedIcon/>*/}
        {/*            </ListItemIcon>*/}
        {/*            <ListItemText primary="РОЛІ"/>*/}
        {/*        </ListItemButton>*/}
        {/*    )}*/}
        {/*</NavLink>*/}
        {/*<NavLink to='/permissions' className={*/}
        {/*    classNames(*/}
        {/*        styles['nav-link'],*/}
        {/*    )*/}
        {/*}>*/}
        {/*    {({isActive, isExact}) => (*/}
        {/*        <ListItemButton*/}
        {/*            className={isActive ? classNames(styles.active) : ''}*/}
        {/*        >*/}
        {/*            <ListItemIcon>*/}
        {/*                <LockPersonRoundedIcon/>*/}
        {/*            </ListItemIcon>*/}
        {/*            <ListItemText primary="ДОЗВОЛИ"/>*/}
        {/*        </ListItemButton>*/}
        {/*    )}*/}
        {/*</NavLink>*/}
    </React.Fragment>
);


///////////TEACHER//////////
export const TeacherMainListItems = (
    <React.Fragment>
        <NavLink to='/subjects' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <LibraryBooksIcon/>
                    </ListItemIcon>
                    <ListItemText primary="ПРЕДМЕТИ"/>
                </ListItemButton>
            )}
        </NavLink>
        {/*<NavLink to='' className={*/}
        {/*    classNames(*/}
        {/*        styles['nav-link'],*/}
        {/*    )*/}
        {/*}>*/}
        {/*    {({isActive, isExact}) => (*/}
        {/*        <ListItemButton*/}
        {/*            // className={isActive ? classNames(styles.active) : ''}*/}
        {/*        >*/}
        {/*            <ListItemIcon>*/}
        {/*                <CalendarMonthIcon/>*/}
        {/*            </ListItemIcon>*/}
        {/*            <ListItemText primary="РОЗКЛАД"/>*/}
        {/*        </ListItemButton>*/}
        {/*    )}*/}
        {/*</NavLink>*/}
        <NavLink to='/classes' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <GroupsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="КЛАСИ"/>
                </ListItemButton>
            )}
        </NavLink>
        <NavLink to='/tests' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <FactCheckIcon/>
                    </ListItemIcon>
                    <ListItemText primary="ТЕСТИ"/>
                </ListItemButton>
            )}
        </NavLink>

    </React.Fragment>
);

export const TeacherSecondaryListItems = (
    <React.Fragment>
        {/*<ListSubheader component="div" inset>*/}
        {/*  Saved reports*/}
        {/*</ListSubheader>*/}
        {/*<NavLink to='/users' className={*/}
        {/*    classNames(*/}
        {/*        styles['nav-link'],*/}
        {/*    )*/}
        {/*}>*/}
        {/*    {({isActive, isExact}) => (*/}
        {/*        <ListItemButton*/}
        {/*            className={isActive ? classNames(styles.active) : ''}*/}
        {/*        >*/}
        {/*            <ListItemIcon>*/}
        {/*                <PeopleIcon/>*/}
        {/*            </ListItemIcon>*/}
        {/*            <ListItemText primary='КОРИСТУВАЧІ'/>*/}
        {/*        </ListItemButton>*/}
        {/*    )}*/}
        {/*</NavLink>*/}
        <NavLink to='/journal' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <BarChartIcon/>
                    </ListItemIcon>
                    <ListItemText primary="ЖУРНАЛИ"/>
                </ListItemButton>
            )}
        </NavLink>
         </React.Fragment>
);
///////////STUDENT//////////
export const StudentMainListItems = (
    <React.Fragment>
        <NavLink to='/subjects' className={
            classNames(
                styles['nav-link'],
            )
        }>
            {({isActive, isExact}) => (
                <ListItemButton
                    className={isActive ? classNames(styles.active) : ''}
                >
                    <ListItemIcon>
                        <LibraryBooksIcon/>
                    </ListItemIcon>
                    <ListItemText primary="ПРЕДМЕТИ"/>
                </ListItemButton>
            )}
        </NavLink>
        {/*<NavLink to='' className={*/}
        {/*    classNames(*/}
        {/*        styles['nav-link'],*/}
        {/*    )*/}
        {/*}>*/}
        {/*    {({isActive, isExact}) => (*/}
        {/*        <ListItemButton*/}
        {/*            // className={isActive ? classNames(styles.active) : ''}*/}
        {/*        >*/}
        {/*            <ListItemIcon>*/}
        {/*                <CalendarMonthIcon/>*/}
        {/*            </ListItemIcon>*/}
        {/*            <ListItemText primary="РОЗКЛАД"/>*/}
        {/*        </ListItemButton>*/}
        {/*    )}*/}
        {/*</NavLink>*/}
            </React.Fragment>
);

export const StudentSecondaryListItems = (
    <React.Fragment>
        {/*<NavLink to='/users' className={*/}
        {/*    classNames(*/}
        {/*        styles['nav-link'],*/}
        {/*    )*/}
        {/*}>*/}
        {/*    {({isActive, isExact}) => (*/}
        {/*        <ListItemButton*/}
        {/*            className={isActive ? classNames(styles.active) : ''}*/}
        {/*        >*/}
        {/*            <ListItemIcon>*/}
        {/*                <PeopleIcon/>*/}
        {/*            </ListItemIcon>*/}
        {/*            <ListItemText primary='КОРИСТУВАЧІ'/>*/}
        {/*        </ListItemButton>*/}
        {/*    )}*/}
        {/*</NavLink>*/}
        <NavLink to='/journal' className={classNames(styles['nav-link'])}>
            {({ isActive, isExact }) => (
                <ListItemButton className={isActive ? classNames(styles.active) : ''}>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary='ЖУРНАЛ' />
                </ListItemButton>
            )}
        </NavLink>
    </React.Fragment>
);