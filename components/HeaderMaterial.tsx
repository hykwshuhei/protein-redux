import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { catchId } from "../redux/userIdSlice"
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';


// const pages = [ShoppingCartIcon, BookmarkBorderIcon, LogoutIcon];
// const settings = ['プロフィール', 'ログアウト'];

function ResponsiveAppBar() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOut = () => {
        if (document.cookie == '') {
            alert('ログインをしてください');
            router.push('/login');
        } else if (document.cookie.includes(`; id=`)) {
            var date = new Date('1999-12-31T23:59:59Z');
            document.cookie = `id=;path=/;expires=${date.toUTCString()};`;
            dispatch(catchId(0));
            alert('ログアウトしました');
            router.push('/login');
        }
        else if (document.cookie.includes('; __stripe_mid=')) {
            var date = new Date('1999-12-31T23:59:59Z');
            document.cookie = `id=;path=/;expires=${date.toUTCString()};`;
            dispatch(catchId(0));
            alert('ログアウトしました');
            router.push('/login');
        } else if (document.cookie.includes('__stripe_mid=')) {
            alert('ログインをしてください');
            router.push('/login');
        } else if (document.cookie !== '') {
            var date = new Date('1999-12-31T23:59:59Z');
            document.cookie = `id=;path=/;expires=${date.toUTCString()};`;
            dispatch(catchId(0));
            alert('ログアウトしました');
            router.push('/login');
        } else {
            alert('ログインをしてください');
            router.push('/login');
        }
    };

    const moveToCart = () => {
        router.push('/cart');
    };

    const moveToFavorite = () => {
        if (document.cookie == '') {
            alert('ログインをしてください');
            router.push('/login');
        } else if (document.cookie.includes(`; id=`)) {
            router.push('/users/favorite');
        } else if (document.cookie.includes('; __stripe_mid=')) {
            router.push('/users/favorite');
        } else if (document.cookie.includes('__stripe_mid=')) {
            alert('ログインをしてください');
            router.push('/login');
        } else if (document.cookie !== '') {
            router.push('/users/favorite');
        } else {
            alert('ログインをしてください');
            router.push('/login');
        }
    }

    const moveToUsers = () => {
        if (document.cookie == '') {
            alert('ログインをしてください');
            router.push('/login');
        } else if (document.cookie.includes(`; id=`)) {
            router.push('/users');
        } else if (document.cookie.includes('; __stripe_mid=')) {
            router.push('/users');
        } else if (document.cookie.includes('__stripe_mid=')) {
            alert('ログインをしてください');
            router.push('/login');
        } else if (document.cookie !== '') {
            router.push('/users');
        } else {
            alert('ログインをしてください');
            router.push('/login');
        }
    };

    const moveToItem = () => {
        router.push('/items');
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link href="/items">
                        <Typography
                            variant="h6"
                            noWrap
                            // component="a"
                            // href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            RAKUTEIN
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/* {pages.map((page) => ( */}
                            <MenuItem key="cart" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center" onClick={moveToCart}>カート</Typography>
                            </MenuItem>
                            <MenuItem key="favorite" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center" onClick={moveToFavorite}>お気に入り</Typography>
                            </MenuItem>
                            {/* ))} */}
                        </Menu>
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    {/* <Link href="/items"> */}
                    <Typography
                        variant="h5"
                        noWrap
                        // component="a"
                        // href=""
                        sx={{
                            justify: "center",
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={moveToItem}
                    >
                        RAKUTEIN
                    </Typography>
                    {/* </Link> */}

                    {/* アイコン[始まり] */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((page) => ( */}
                        <ShoppingCartIcon
                            // key={page}
                            onClick={() => {
                                handleCloseNavMenu();
                                moveToCart()
                            }}
                            sx={{ my: 2, color: 'white', display: 'block', margin: '2%', cursor: 'pointer' }}
                        >
                            {/* {page} */}
                        </ShoppingCartIcon>
                        <BookmarkBorderIcon
                            // key={page}
                            onClick={() => {
                                handleCloseNavMenu();
                                moveToFavorite()
                            }}
                            sx={{ my: 2, color: 'white', display: 'block', margin: '2%', cursor: 'pointer' }}
                        >
                            {/* {page} */}
                        </BookmarkBorderIcon>
                    </Box>
                    {/* アイコン[終わり] */}

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircle
                                    fontSize='large'
                                    sx={{ color: 'white' }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/* {settings.map((setting) => ( */}
                            <MenuItem onClick={() => {
                                handleCloseUserMenu();
                                moveToUsers()
                            }}
                            >
                                <Typography textAlign="center">プロフィール</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleCloseUserMenu();
                                logOut()
                            }}
                            >
                                <Typography textAlign="center">ログアウト</Typography>
                            </MenuItem>
                            {/* ))} */}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default ResponsiveAppBar;
