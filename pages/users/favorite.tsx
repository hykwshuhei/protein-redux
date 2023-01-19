import { GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';
import { Favorite, Item } from '../../types/type';
import { supabase } from "../../utils/supabase";

import FavoriteList from "../../components/FavoriteList"


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.cookies;
  let { data }: any = await supabase
    .from('favorites')
    .select('*')
    .eq('userId', cookies.id);

  let favs = data;
  let itemsArray = favs.map((fav: any) => {
    return fav.id;
  });

  itemsArray = await Promise.all(
    itemsArray.map(async (array: any) => {
      let { data }: any = await supabase
        .from("items")
        .select()
        .eq("id", array)
      return data[0];
    })
  );

  let itemsArray4 = [];
  if (itemsArray) {
    itemsArray4 = itemsArray;
  }

  return {
    props: { itemsArray4 },
  };
};

export default function favorite({ itemsArray4 }: Favorite) {
  return (
    <FavoriteList itemsArray4={itemsArray4} />
  )
}
