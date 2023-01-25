import Link from 'next/link';
import style from '../pages/layout/header.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { catchId } from "../redux/userIdSlice"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';


export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();

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

  return (
    <div className={style.all}>
      <div className={style.logo}>
        <Link href="/items">
          <Image
            priority
            src="/images/rakutein.jpg"
            width={140}
            height={90}
            alt="logout"
          />
        </Link>
      </div>

      <div className={style.iconlist}>
        <div className={style.icon} onClick={moveToFavorite}>
          <BookmarkBorderIcon
            sx={{ fontSize: 70 }}
          >
          </BookmarkBorderIcon>
          {/* <Image
            priority
            src="/images/fav.jpg"
            width={45}
            height={45}
            alt="favorite"
            className={style.iconHover}
          /> */}
        </div>
        <div className={style.icon} onClick={moveToCart}>
          <ShoppingCartIcon
            sx={{ fontSize: 70 }}
          >
          </ShoppingCartIcon>
          {/* <Image
            priority
            src="/images/cart.jpg"
            width={45}
            height={45}
            alt="cart"
          /> */}
        </div>
        <div className={style.icon} onClick={moveToUsers}>
          <PersonIcon
            sx={{ fontSize: 75 }}
          >
          </PersonIcon>
          {/* <Image
            priority
            src="/images/human.jpg"
            width={45}
            height={45}
            alt="user"
          /> */}
        </div>
        <div className={style.icon} onClick={logOut}>
          <Link href="/login">
            <LogoutIcon
              sx={{ fontSize: 75 }}
            >
            </LogoutIcon>
            {/* <Image
              priority
              src="/images/logout.jpg"
              width={45}
              height={45}
              alt="logout"
            /> */}
          </Link>
        </div>
      </div>
    </div>
  );
}
