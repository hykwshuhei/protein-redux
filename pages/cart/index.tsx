import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/cart.module.css';
import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { User, Item, Item2 } from '../../types/type';
import { supabase } from "../../utils/supabase";
import { store, persistor } from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux"
import CartIndex from "../../components/CartIndex";


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.cookies;
  let { data }: { data: any } = await supabase.from("carts").select("*").eq("userId", cookies.id);
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/carts?userId=${cookies.id}`
  // );
  // const carts = await res.json();
  return {
    props: { carts: data }
  };
};


const index: NextPage = ({ carts }: any) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CartIndex carts={carts} />
      </PersistGate>
    </Provider>
  )
}

export default index;
