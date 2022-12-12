import Head from 'next/head';
import ItemData from '../../components/itemData';
import styles from '../../styles/purchase.module.css';
import { GetServerSideProps } from 'next';
import Header from '../layout/header';

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const cookies = req.cookies;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/users?id=${cookies.id}`
  );
  const users = await res.json();
  const user = users[0];

  const resCarts = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/carts?userId=${cookies.id}`
  );
  const carts = await resCarts.json();

  return {
    props: {
      user: user,
      carts: carts,
    },
  };
};

export default function PurchaseDisplay({
  user,
  carts,
}: {
  user: any;
  carts: any;
}) {
  // const {user,carts} = props

  return (
    <>
      <div className={styles.container}>
        <Header />
        <hr className={styles.hr}></hr>
        <Head>
          <title>ご注文内容確認</title>
          <meta name="turbolinks-visit-control" />
        </Head>
        <ItemData user={user} carts={carts} />
      </div>
      <footer className={styles.footer}>
        <h1>RAKUTEIN</h1>
      </footer>
    </>
  );
}
