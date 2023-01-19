import Image from 'next/image';
import styles from '../styles/detail_user.module.css';
import Link from 'next/link';
import Header from '../pages/layout/header';
import Footer from '../pages/layout/footer';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Favorite, Item } from '../types/type';
import { supabase } from "../utils/supabase";


const FavoriteList = ({ itemsArray4 }: any) => {
    const router = useRouter();
    // お気に入り情報の削除
    async function deleteItem(favoriteItem: Favorite) {
        await supabase.from("favorites").delete().eq("id", favoriteItem.id)
        router.reload();
    }

    return (
        <>
            <Header />

            <div className={styles.main}>
                <section className={styles.element}>
                    <h2 className={styles.title_favorite} id="user_favorites">
                        お気に入りリスト
                    </h2>

                    {itemsArray4.map((favoriteItem: any) => {
                        return (
                            <div key={favoriteItem.id}>
                                <br />
                                <div>
                                    <div className={styles.list}>
                                        <Image
                                            priority
                                            src={favoriteItem.imageUrl}
                                            width={260}
                                            height={260}
                                            alt="商品画像"
                                            className={styles.img}
                                        />
                                        <div className={styles.itemDetail}>
                                            <Link
                                                href={`../items/${encodeURIComponent(
                                                    favoriteItem.id
                                                )}`}
                                                className={styles.a}
                                            >
                                                <div className={styles.itemA}>
                                                    {favoriteItem.name}
                                                </div>
                                            </Link>

                                            <div>
                                                価格 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                                                <span className={styles.style}>
                                                    &nbsp;{favoriteItem.price}
                                                    &nbsp;
                                                </span>
                                            </div>
                                            <div className={styles.rightSide}>
                                                <button
                                                    className={styles.delete_button}
                                                    onClick={() => deleteItem(favoriteItem)}
                                                >
                                                    <a>削除</a>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <hr />
                                </div>
                            </div>
                        );
                    })}
                </section>
                <Link href="/items">←HOMEへ戻る</Link>
            </div>
            <Footer />
        </>
    );
}

export default FavoriteList;
