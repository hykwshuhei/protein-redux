import Head from 'next/head';
import style from '../styles/index.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import HeaderLogin from '../components/HeaderMaterialLogin';
import Image from 'next/image';
import ItemDisplay from './imageDisplay';
import { GetServerSideProps } from 'next';
import { Item, User, Users } from './../types/type';
import { supabase } from "../utils/supabase";
import { useSelector, useDispatch } from "react-redux";
import { catchId } from "../redux/userIdSlice"
import { deliteItem } from "../redux/itemsSlice";


export default function UserLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [localData, setLocalData] = useState([]);
    // const [userId, setUserId] = useState(0);

    const stateUserId = useSelector((state: any) => state.persistedReducer.id);
    const dispatch = useDispatch();
    console.log(stateUserId, 'stateUserId');

    const stateItems = useSelector((state: any) => state.persistedItemsReducer.items);
    const itemsDispatch = useDispatch();
    console.log(stateItems)

    const arrCopy = [...stateItems];

    // Local Storageから商品データ取得
    // useEffect(() => {
    //     const collection = Object.keys(localStorage).map((key) => {
    //         let keyJson = JSON.stringify(key);
    //         return {
    //             key: JSON.parse(keyJson),
    //             value: JSON.parse(localStorage.getItem(key) as string),
    //         };
    //     });
    //     setLocalData(collection as React.SetStateAction<never[]>);
    // }, []);

    //"ally-supports-cache"などを除外 (Local Storageの中の商品情報以外を削除)
    // const filteredData = localData.filter((object: any) => {
    //     return object.key == object.value.itemId;
    // });

    // ユーザーIDの取得&POST(onSubmitのタイミングで発火)
    const postUserdata = async () => {
        let { data }: any = await supabase
            .from("users")
            .select()
            .eq("email", email)
            .eq("password", password);
        // const res = await fetch(
        //   `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/users?email=${email}&password=${password}`
        // );
        // const json = await res.json();
        const id = await data[0].id;
        // console.log(id) id出てくる OK
        return id;
        //　idを返す
    };

    const data = {
        email: email,
        password: password,
    };

    const handler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(data),
        })
            .then(async (response) => {
                response.json();
                if (response.status !== 200) {
                    setVisible(true);
                } else if (response.status === 200) {
                    let id = await postUserdata()
                    console.log(id, '###');
                    dispatch(catchId(id));
                    console.log(stateUserId, 'dispatch');
                    if (arrCopy) {
                        arrCopy.forEach(async (data: any) => {
                            let number = await postUserdata();
                            // Object.defineProperty(data, `${i}`, {
                            //     writable: true
                            // });
                            // let i = await postUserdata();
                            // Object.assign(data, { userId: i });

                            let userId = number;
                            let itemId = data.itemId;
                            let imageUrl = data.imageUrl;
                            let name = data.name;
                            let flavor = data.flavor;
                            let price = data.price;
                            let countity = data.countity;

                            console.log(number, userId, "data.userId");

                            await supabase.from('carts').insert({
                                userId,
                                itemId,
                                imageUrl,
                                name,
                                flavor,
                                price,
                                countity
                            });
                            itemsDispatch(deliteItem(data));
                        })
                        // localStorage.clear();
                    }
                    router.push('/items');
                }
            })
    }

    return (
        <div>
            <HeaderLogin />

            <div className={style.all}>
                <Head>
                    <title>ログイン</title>
                    <meta
                        name="description"
                        content="Generated by create next app"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={style.top}>
                    <Image
                        priority
                        src="/images/ocean.jpg"
                        width={950}
                        height={800}
                        alt="お気に入り"
                        className={style.image}
                    />
                    <main className={style.main}>
                        <hgroup className={style.hgroup}>
                            <h1 className={style.h1}>ログイン</h1>
                            <Link href="/users/new">
                                <h3 className={style.h3}>新規ユーザー登録はこちら</h3>
                            </Link>
                            <h3
                                className={style.login}
                                style={{ display: visible ? 'block' : 'none' }}
                            >
                                ユーザーが見つかりません。もう一度入力してください。
                            </h3>
                        </hgroup>
                        <form className={style.form} onSubmit={handler}>
                            <div className={style.group}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="メールアドレス"
                                    className={style.input}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setVisible(false);
                                    }}
                                    required
                                    autoComplete="off"
                                />
                                <span className={style.highlight}></span>
                                <span className={style.bar}></span>
                                <label className={style.label}></label>
                            </div>
                            <div className={style.group}>
                                <input
                                    type="password"
                                    name="password"
                                    id="password_validation"
                                    placeholder="パスワード&nbsp;(8文字以上16文字以下)"
                                    className={style.input}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setVisible(false);
                                    }}
                                    required
                                    pattern=".{8,16}"
                                    title="8文字以上16文字以下"
                                    autoComplete="off"
                                />
                                <span className={style.highlight}></span>
                                <span className={style.bar}></span>
                                <label className={style.label}></label>
                            </div>
                            <button
                                type="submit"
                                className={`${style.button} ${style.buttonBlue}`}
                            >
                                ログイン
                                <div
                                    className={`${style.ripples} ${style.buttonRipples}`}
                                >
                                    <span className={style.ripplesCircle}></span>
                                </div>
                            </button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}
