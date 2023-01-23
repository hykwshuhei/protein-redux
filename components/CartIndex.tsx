import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/cart.module.css';
import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../pages/layout/header';
import Footer from '../pages/layout/footer';
import { User, Item, Item2 } from '../types/type';
import { supabase } from "../utils/supabase";
import { useSelector, useDispatch } from "react-redux";
import { deliteItem } from "../redux/itemsSlice";
import { catchId } from "../redux/userIdSlice";


const CartIndex = ({ carts }) => {
    const userId = useSelector((state: any) => state.persistedReducer.id);
    const dispatch = useDispatch();

    const stateItems = useSelector((state: any) => state.persistedItemsReducer.items);
    const itemsDispatch = useDispatch();

    const [localData, setLocalData] = useState([]);
    const router = useRouter();

    // cookie取得【始まり】 ※なぜかredux-persistのstateが更新されてしまう為　クッキーからid取得
  useEffect(() => {
    const cookie = document.cookie;
    let userId = '';
    if (document.cookie.includes('; __stripe_mid=')) {
      userId = cookie.slice(3, 4);
    } else {
      userId = cookie.slice(-1);
    }
    const id = (Number(userId));
    dispatch(catchId(Number(id)))
  }, []);
  // cookie取得【終わり】

    // Local Storageからカートに追加した商品データ取得
    // useEffect(() => {
    //     if (carts === null) {
    //         const collection = Object.keys(localStorage).map((key) => {
    //             let keyJson = JSON.stringify(key);
    //             return {
    //                 key: JSON.parse(keyJson),
    //                 value: JSON.parse(localStorage.getItem(key) as string),
    //             };
    //         });
    //         setLocalData(collection as any);
    //     }
    // }, []);

    //"ally-supports-cache" を除外 (Local Storageの中の商品情報以外を削除)
    // const filteredData: any = localData.filter((object: any) => {
    //     return object.key == object.value.itemId;
    // });

    // cartsの削除【始まり】
    async function deleteItem(cart: Item) {
        await supabase.from("carts").delete().eq("id", cart.id)
        // fetch(`${process.env.NEXT_PUBLIC_PROTEIN}/api/carts/${cart.id}`, {
        //   method: 'DELETE',
        // });
        router.reload();
    }
    // cartsの削除【終わり】

    // localDataの削除【始まり】
    function deleteItemID(data: Item) {
        itemsDispatch(deliteItem(data));
        //     localStorage.removeItem(data.key);
        //     router.reload();
    }
    // localDataの削除【終わり】

    // cartsの合計【始まり】
    const priceArray: number[] = [];

    if (carts !== null) {
        carts.forEach((element: Item) => {
            const multiPrice = element.price * element.countity;
            priceArray.push(multiPrice);
        });
    }

    const initialValue = 0;
    const sumPrice = priceArray.reduce(
        (accumulator, currentPrice) => accumulator + currentPrice,
        initialValue
    );
    // cartsの合計【終わり】

    // localDataの合計【始まり】
    const priceArrayLocal: number[] = [];

    stateItems.forEach((element: any) => {
        const multiPriceLocal =
            element.price * element.countity;
        priceArrayLocal.push(multiPriceLocal);
    });

    const initialValueLocal = 0;
    const sumPriceLocal = priceArrayLocal.reduce(
        (accumulator, currentPrice) => accumulator + currentPrice,
        initialValueLocal
    );
    // localDataの合計【終わり】


    const routerHandler = () => {
        if (carts.length > 0) {
            router.push('/purchase');
        } else {
            alert('商品一覧から商品を選んでカートに入れてください');
            router.push('/items');
        }
    };

    const handlerWithLocal = () => {
        if (stateItems.length < 1) {
            alert('商品一覧から商品を選んでカートに入れてください');
            router.push('/items');
        } else {
            alert(
                'ログイン後に商品購入可能です（会員登録してない方は会員登録をお願いします）'
            );
            router.push('/login');
        }
    };

    return (
        <>
            <Header />

            <div className={styles.item_list}>
                <h4 className={styles.cart_title}>カート</h4>

                {userId !== 0 ? (
                    <div>
                        <section className={styles.cart_content}>
                            {carts.map((cart: Item) => (
                                <div key={cart.id} className={styles.cart_content2}>
                                    <Image
                                        priority
                                        className={styles.cart_img}
                                        src={cart.imageUrl}
                                        alt="商品画像"
                                        width={260}
                                        height={260}
                                    />
                                    <div className={styles.text_content}>
                                        <Link
                                            href={`../items/${encodeURIComponent(cart.id)}`}
                                            className={styles.a}
                                        >
                                            <div>{cart.name}</div>
                                        </Link>
                                        <p>
                                            <span className={styles.quantity}>数量</span>
                                            {cart.countity}個
                                        </p>
                                        <p>
                                            <span>価格(税込)</span>¥
                                            {(cart.price * cart.countity).toLocaleString()}
                                        </p>
                                        <button
                                            className={styles.delete_button}
                                            onClick={() => deleteItem(cart)}
                                        >
                                            削除
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section>
                            <div className={styles.cart_total}>
                                <p>合計金額:</p>
                                <p className={styles.total}>
                                    ¥&ensp;{sumPrice.toLocaleString()}
                                </p>
                            </div>
                            <div className={styles.buttons}>
                                <Link href="/items">
                                    <button className={styles.shopping}>
                                        買い物を続ける
                                    </button>
                                </Link>
                                <button
                                    className={styles.purchase}
                                    onClick={routerHandler}
                                >
                                    購入する
                                </button>
                            </div>
                        </section>
                    </div>
                ) : (
                    <div>
                        <section className={styles.cart_content}>
                            {stateItems.map((data: any) => (
                                <div
                                    key={data.itemId}
                                    className={styles.cart_content2}
                                >
                                    <Image
                                        priority
                                        className={styles.cart_img}
                                        src={data.imageUrl}
                                        alt="商品画像"
                                        width={260}
                                        height={260}
                                    />
                                    <div className={styles.text_content}>
                                        <Link
                                            href={`../items/${encodeURIComponent(data.itemId)}`}
                                            className={styles.a}
                                        >
                                            <p>{data.name}</p>
                                        </Link>
                                        <p>
                                            <span className={styles.quantity}>数量</span>
                                            {data.countity}個
                                        </p>
                                        <p>
                                            <span>価格(税込)</span>¥
                                            {(
                                                data.price * data.countity
                                            ).toLocaleString()}
                                        </p>
                                        <button
                                            className={styles.delete_button}
                                            onClick={() => deleteItemID(data)}
                                        >
                                            削除
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section>
                            <div className={styles.cart_total}>
                                <p>合計金額:</p>
                                <p className={styles.total}>
                                    ¥&ensp;{sumPriceLocal.toLocaleString()}
                                </p>
                            </div>
                            <div className={styles.buttons}>
                                <Link href="/items">
                                    <button className={styles.shopping}>
                                        買い物を続ける
                                    </button>
                                </Link>
                                <button
                                    className={styles.purchase}
                                    onClick={handlerWithLocal}
                                >
                                    購入する
                                </button>
                            </div>
                        </section>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CartIndex;
