import Image from 'next/image';
import { NextPage } from 'next';
import styles from '../../styles/item_detail.module.css';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import React, { useEffect } from 'react';
import Header from '../layout/header';
import { useRouter } from 'next/router';
import { Item, Event } from '../../types/type';
import Footer from '../layout/footer';
import { supabase } from '../../utils/supabase'; // supabaseをコンポーネントで使うときはかく
import { store } from '../../redux/store'
import { Provider } from "react-redux"
import { useSelector, useDispatch } from "react-redux";
import ItemDetail from "../../components/itemDetail";


export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: any = await supabase.from('items').select('*');
  const paths = data.map((item: Item) => ({
    params: {
      id: item.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  let { data }: any = await supabase
    .from('items')
    .select()
    .eq('id', params!.id);

  const detail = data[0];
  console.log(detail);
  return {
    props: { detail },
    revalidate: 10,
  };
};

// detail getStaticPropsから取得
const Something: NextPage<{ detail: Item }> = ({ detail }) => {
  return (
    <Provider store={store}>
      <ItemDetail detail={detail}/>
    </Provider >
    );
};

export default Something;
