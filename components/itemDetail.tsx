import Image from 'next/image';
import { NextPage } from 'next';
import styles from '../styles/item_detail.module.css';
import React, { useEffect } from 'react';
import Header from '../pages/layout/header';
import { useRouter } from 'next/router';
import { Item, Event } from '../types/type';
import Footer from '../pages/layout/footer';
import { supabase } from '../utils/supabase';
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../redux/counterSlice";
import { catchItem } from "../redux/itemsSlice";


const ItemDetail = ({ detail }: any) => {
    const router = useRouter();
    const [count, setCount] = React.useState(1);
    const [total, setTotal] = React.useState(detail.price);
    // const [userId, setUserId] = React.useState('');

    const flavor2: any = detail.flavor;
    let strChangeFlavor = flavor2.replace(/{|"|\\|}|/g, "");
    const arrFlavor = strChangeFlavor.split(',');

    const [flavor, setFlavor] = React.useState(arrFlavor[0]);


    const userId = useSelector((state: any) => state.persistedReducer.id);
    console.log(userId, '@@@');

    const stateItems = useSelector((state: any) => state.persistedItemsReducer.items);
    const itemsDispatch = useDispatch();
    console.log(stateItems, '@@@');

    const stateCount = useSelector((state: any) => state.counter.value);
    const dispatch = useDispatch();
    console.log(stateCount, total, '@@@');


    //　数量変更
    const addHandlerNext = (sub: number) => {
        setTotal(total + sub);
    };
    const addHandlerPrev = (sub: number) => {
        if (total <= detail.price) {
            setTotal(detail.price);
        } else {
            setTotal(total - sub);
        }
    };

    const clickHandlerNext = () => {
        // const nextCount = count + 1;
        // setCount(nextCount);
        dispatch(increment());
        // setCount(stateCount);

        // const nextTotal = detail.price * nextCount;
        const nextTotal = detail.price * stateCount;
        setTotal(nextTotal);
        addHandlerNext(detail.price);
    };

    const clickHandlerPrev = () => {
        // const prevCount = stateCount - 1;
        // if (prevCount <= 1) {
        // } else {
        //     setCount(prevCount);
        // }
        if (stateCount > 1) {
            dispatch(decrement());
            const prevTotal = detail.price * stateCount;
            setTotal(prevTotal);
            addHandlerPrev(detail.price);
        }
    };
    // 数量変更【終わり】

    // カート情報をsupabaseへ追加
    const itemId = detail.id;
    const imageUrl = detail.imageUrl;
    const name = detail.name;
    const price = detail.price;
    const countity = stateCount;

    // カートへ追加【始まり】
    const carts = {
        userId: userId,
        itemId: detail.id,
        imageUrl: detail.imageUrl,
        name: detail.name,
        flavor: flavor,
        price: detail.price,
        countity: stateCount,
    };
    // カートへ追加【終わり】

    // ローカルストレージへ追加【始まり】
    const cartsForStrage = {
        userId: 0,
        itemId: detail.id,
        imageUrl: detail.imageUrl,
        name: detail.name,
        flavor: flavor,
        price: detail.price,
        countity: stateCount,
    };
    // ローカルストレージへ追加【終わり】

    // cookie取得【始まり】
    useEffect(() => {
        dispatch(reset());
        // const user = document.cookie;
        // let userId = '';
        // if (document.cookie.includes('; __stripe_mid=')) {
        //     userId = user.slice(3, 4);
        // } else {
        //     userId = user.slice(-1);
        // }
        // setUserId(userId);
    }, []);
    // cookie取得【終わり】


    const handler = async () => {
        if (!document.cookie) {
            itemsDispatch(catchItem(cartsForStrage))
            // localStorage.setItem(
            //     carts.itemId as any,
            //     JSON.stringify(cartsForStrage)
            // );
            router.push('/cart');
        } else if (document.cookie.includes(`; id=`)) {
            await supabase.from('carts').insert({
                userId,
                itemId,
                imageUrl,
                name,
                flavor,
                price,
                countity,
            });
            router.push('/cart');
        } else if (document.cookie.includes('; __stripe_mid=')) {
            await supabase.from('carts').insert({
                userId,
                itemId,
                imageUrl,
                name,
                flavor,
                price,
                countity,
            });
            router.push('/cart');
        } else if (document.cookie.includes('__stripe_mid=')) {
            itemsDispatch(catchItem(cartsForStrage))
            // localStorage.setItem(
            //     carts.itemId as any,
            //     JSON.stringify(cartsForStrage)
            // );
            router.push('/cart');
        } else {
            await supabase.from('carts').insert({
                userId,
                itemId,
                imageUrl,
                name,
                flavor,
                price,
                countity,
            });
        }
        router.push('/cart');
    }

    //サブスクリプション
    const Subscription = async () => {
        const subscriptionCart = {
            userId: Number(userId),
            itemId: detail.id,
            imageUrl: detail.imageUrl,
            name: detail.name,
            flavor: flavor,
            price: detail.price,
            countity: stateCount,
        };
        if (stateCount === 0) {
            return;
            // 数量0の場合はカートへ入れない
        } else if (Number(userId) == 0) {
            alert(
                'ログイン後に商品購入可能です（会員登録してない方は会員登録をお願いします）'
            );
            router.push('/login');
        } else {
            await supabase.from('subscriptionCart').insert({
                userId,
                itemId,
                imageUrl,
                name,
                flavor,
                price,
                countity,
            });
            router.push(`/items/subscription`);
            // });
        }
    };

    // お気に入り情報をsupabaseへ追加
    const itemIdFav = [detail.id];
    const id = detail.id;

    const addFavoritesHandler = async (e: {
        preventDefault: () => void;
    }) => {
        e.preventDefault();
        if (Number(userId) == 0) {
            alert('ログイン後に追加可能です（会員登録してない方は会員登録をお願いします）');
            router.push('/login');
        } else {
            await supabase.from('favorites').insert({
                userId,
                itemIdFav,
                id,
            });
            router.push('/users/favorite');
        }
    };

    return (
        <>
            <Header />
            <div className={styles.detail_page}>
                <div>
                    <Image
                        priority
                        className={styles.detail_img}
                        src={detail.imageUrl}
                        alt="商品画像"
                        width={450}
                        height={450}
                    />
                </div>

                <div className={styles.details}>
                    <div className={styles.detail_title}>
                        <h4>{detail.name}</h4>
                    </div>
                    <div className={styles.explain}>
                        <p className={styles.explain_title}>商品説明</p>
                        <p className={styles.explain_text}>
                            {detail.description}
                        </p>
                    </div>
                    <div className={styles.ingredient}>
                        <p className={styles.ingredient_title}>成分</p>
                        <p className={styles.ingredient_text}>{detail.content}</p>
                    </div>

                    <div className={styles.flavor}>
                        <p className={styles.flavor_title}>フレーバー</p>
                        <select
                            className={styles.select}
                            onChange={(e) => setFlavor(e.target.value)}
                        >
                            <option>{arrFlavor[0]}</option>
                            <option>{arrFlavor[1]}</option>
                            <option>{arrFlavor[2]}</option>
                            <option>{arrFlavor[3]}</option>
                            <option>{arrFlavor[4]}</option>
                        </select>
                    </div>
                    <div className={styles.quantity}>
                        <p className={styles.quantity_title}>数量</p>
                        <button
                            className={styles.plus}
                            type="button"
                            onClick={clickHandlerNext}
                        >
                            +
                        </button>
                        <p>&nbsp;{stateCount}&nbsp;</p>
                        <button
                            className={styles.minus}
                            type="button"
                            onClick={clickHandlerPrev}
                        >
                            -
                        </button>
                        <p>&nbsp;個&nbsp;</p>
                    </div>
                    <div className={styles.total}>
                        <p className={styles.total_title}>合計金額</p>
                        <p>¥{total.toLocaleString()}</p>
                    </div>
                    <div>
                        <button
                            onClick={Subscription}
                            className={styles.button05}
                        >
                            <a>今すぐ定期購入を開始</a>
                        </button>
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.buttonsRight}>
                            <button
                                type="button"
                                onClick={addFavoritesHandler}
                                className={styles.fav_button}
                            >
                                <a>
                                    &nbsp;
                                    <Image
                                        priority
                                        src="/images/null_heart.png"
                                        width={20}
                                        height={20}
                                        alt="お気に入り"
                                        className={styles.favIcon}
                                    />
                                    お気に入りに追加&nbsp;
                                </a>
                            </button>

                            <button
                                className={styles.cart_button}
                                onClick={handler}
                            >
                                <a>カートに追加</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};


export default ItemDetail;
