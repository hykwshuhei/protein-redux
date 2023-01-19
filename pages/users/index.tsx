import { GetServerSideProps } from 'next';
import { Item } from '../../types/type';
import { supabase } from '../../utils/supabase';
import { store, persistor } from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux"
import UserDetails from "../../components/UserDetails"

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const errors: string[] = [];

  const cookies = req.cookies;
  const cookie = Number(cookies.id);
  // console.log(cookie)
  // let user = { id: cookies.id };
  // try {
  const users = await supabase.from("users").select("*").eq("id", cookie);
  const user = users.data![0];

  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/users/${cookies.id}`
  // );
  // user = await res.json();
  // } catch (err) {
  //   console.error('failed to get user', err);
  //   errors.push('ユーザー情報の取得に失敗しました。リロードしてください。');
  // }

  //supabaseにて購入履歴(purchaseHistories)の情報を取得
  const itemsArray2 = await supabase.from('purchaseHistories').select("*").eq("userId", cookie);
  const itemsArray3 = itemsArray2.data!;
  const itemsArray4: Item[] = [];
  try {
    itemsArray3.forEach((element) => {
      const items = element.items;

      items.forEach((item: Item) => {
        itemsArray4.push(item);
      });
    });
  } catch (err) {
    // console.error('failed to get purchaseHistories', err);
    errors.push('履歴情報の取得に失敗しました。リロードしてください。');
  }


  //サブスク
  const subscriptionArray: Item[] = [];
  const subscriptionArray2 = await supabase.from('subscription').select("*").eq("userId", cookie);
  const subscriptionArray3 = subscriptionArray2.data!;

  try {
    // const regular = await fetch(
    //   `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/subscription?userId=${cookies.id}`
    // );
    // const leave = await regular.json();

    subscriptionArray3.forEach((element: Item) => {
      const items = element.items;
      subscriptionArray.push(items);
    });
  } catch (err) {
    // console.error('failed to get subscription', err);
    errors.push('サブスク情報の取得に失敗しました。リロードしてください。');
  }

  //サブスクの履歴
  const subscriptionHistoriesArray: Item[] = [];
  const subscriptionHistoriesArray2 = await supabase.from('subscriptionHistories').select("*").eq("userId", cookie);
  const subscriptionHistoriesArray3 = subscriptionHistoriesArray2.data!;

  try {
    // const past = await fetch(
    //   `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/subscriptionHistories?userId=${cookies.id}`
    // );
    // const remain = await past.json();
    subscriptionHistoriesArray3.forEach((element: Item) => {
      const items = element.items;
      subscriptionHistoriesArray.push(items);
    });
  } catch (err) {
    // console.error('failed to get subscriptionHistories', err);
    errors.push('サブスク履歴情報の取得に失敗しました。リロードしてください。');
  }

  return {
    props: {
      user,
      itemsArray4,
      subscriptionArray,
      subscriptionHistoriesArray,
      errors,
    },
  };
};

const index = (
  {
    user,
    subscriptionArray,
    itemsArray4,
    subscriptionHistoriesArray,
    errors
  }
) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserDetails user={user} subscriptionArray={subscriptionArray}
          itemsArray4={itemsArray4} subscriptionHistoriesArray={subscriptionHistoriesArray}
          errors={errors} />
      </PersistGate>
    </Provider>
  )
}

export default index;
