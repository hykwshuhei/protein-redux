// 商品一覧画面
// 表示の方でswrを書いて、PULLDOWNするとURLが変化するようにする。

import Link from 'next/link';
import { NextPage } from 'next';
import styles from '../../styles/items_index.module.css';
import ItemDisplayNew from '../../components/itemDisplayNew';
import Head from 'next/head';
import Header from '../layout/header';
import CategoryTypeSearch from '../../components/categoryTypeSearch';
import useSWR from 'swr';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import CategoryFlavorSearch from '../../components/categoryFlavorSearch';
import Image from 'next/image';
import Searching from '../../components/Searching';
import { Users, Users2, Users3, User, Item } from '../../types/type';
import TooltipButton from '../../components/tooltipButton';
import Footer from '../layout/footer';
import { supabase } from "../../utils/supabase";
import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { store, persistor } from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux"
import ItemIndex from "../../components/ItemIndex";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const category = context.query.category;
  const flavor = context.query.flavor;

  let query = supabase.from('items').select();

  if (flavor) {
    query = query.like('flavor', `%${flavor}%`);
  }
  if (category) {
    query = query.eq('category', category);
  }
  const data2 = await query;
  const data3 = data2.data!;

  return {
    props: {
      data3: data3
    },
  };
};


const index: NextPage = ({ data3 }: any) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ItemIndex data3={data3} />
      </PersistGate>
    </Provider>
  )
}

export default index;
