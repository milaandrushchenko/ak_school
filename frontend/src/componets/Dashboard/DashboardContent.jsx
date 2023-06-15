import * as React from "react";
import {styled, createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import {
    AdminMainListItems,
    AdminSecondaryListItems,
    StudentMainListItems,
    StudentSecondaryListItems,
    TeacherMainListItems,
    TeacherSecondaryListItems
} from "./listItems";
import Chart from "./Chart";
import {NavLink, Outlet} from "react-router-dom";
import {Avatar, Menu, MenuItem} from "@mui/material";
import {Logout, PersonAdd, Settings} from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../store/user/currentUserSlice.js";
import {createUser, reset} from "../../store/user/usersSlice.js";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"AK SCHOOL © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));
export default function DashboardContent() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openEl = Boolean(anchorEl);

    const {user, userToken} = useSelector((state) => state.currentUser)

    let mainListItems;
    let secondaryListItems;

    switch (user.role) {
        case 'admin':
            mainListItems = AdminMainListItems;
            secondaryListItems = AdminSecondaryListItems;
            break;
        case 'student':
            mainListItems = StudentMainListItems;
            secondaryListItems = StudentSecondaryListItems;
            break;
        case 'teacher':
            mainListItems = TeacherMainListItems;
            secondaryListItems = TeacherSecondaryListItems;
            break;
        default:
            mainListItems = null;
            secondaryListItems = null;
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const logout = async (e) => {
        e.preventDefault();

        await dispatch(logoutUser());
        dispatch(reset());
    };

    return (
            <Box sx={{display: "flex"}}>
                <CssBaseline/>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: "24px", // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                                ...(open && {display: "none"}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        {/* <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            AK SCHOOL
                        </Typography> */}
                        <Grid sx={{flexGrow: 8}}>
                            <Box
                                component="img"
                                sx={{
                                    maxWidth: 200
                                }}
                                alt="AK school"
                                src="/logo.png"
                            />
                        </Grid>
                        {/*<IconButton color="inherit">*/}
                        {/*    <Badge badgeContent={4} color="secondary">*/}
                        {/*        <NotificationsIcon/>*/}
                        {/*    </Badge>*/}
                        {/*</IconButton>*/}
                        <IconButton color="inherit"
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ml: 2}}
                                    aria-controls={openEl ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}>
                            <AccountCircleRoundedIcon/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={openEl}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={handleClose}>
                                <Avatar/> <NavLink to="/" style={{textDecoration: 'none', color: "black"}}>Мій профіль</NavLink>
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <Logout fontSize="small"/>
                                </ListItemIcon>
                                Вийти
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{my: 1}}/>
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="xl" sx={{mt: 2, mb: 4}}>
                        {/*    <Grid container spacing={3}>*/}
                        {/*<Grid item xs={12}>*/}
                        {/*    <Paper sx={{p: 2, display: "flex", flexDirection: "column"}}>*/}
                        {/*        <Outlet/>*/}
                        {/*    </Paper>*/}
                        {/*</Grid>*/}
                        {/*</Grid>*/}
                        {/*/!* Recent Deposits *!/*/}
                        {/*<Grid item xs={12} md={4} lg={3}>*/}
                        {/*  <Paper*/}
                        {/*    sx={{*/}
                        {/*      p: 2,*/}
                        {/*      display: "flex",*/}
                        {/*      flexDirection: "column",*/}
                        {/*      height: 240,*/}
                        {/*    }}*/}
                        {/*  >*/}
                        {/*    /!*<Deposits />*!/*/}
                        {/*  </Paper>*/}
                        {/*</Grid>*/}
                        {/*/!* Recent Orders *!/*/}
                        {/*<Grid item xs={44}>*/}
                        <Outlet/>
                        {/*</Grid>*/}
                        {/*    </Grid>*/}
                        {/*    <Copyright sx={{pt: 4}}/>*/}
                    </Container>
                </Box>
            </Box>
    );
}
