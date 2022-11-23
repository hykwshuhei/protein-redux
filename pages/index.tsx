import Head from 'next/head';
import style from '../styles/index.module.css';

export default function UserLogin() {
  return (
    <div className={style.all}>
      <Head>
        <title>ログイン</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.main}>
        <hgroup className={style.hgroup}>
          <h1 className={style.h1}>Login Form</h1>
          <h3 className={style.h3}>By ProteinTeam</h3>
        </hgroup>
        <form className={style.form}>
          <div className={style.group}>
            <input type="text" className={style.input} /><span className={style.highlight}></span><span className={style.bar}></span>
            <label className={style.label}>Name</label>
          </div>
          <div className={style.group}>
            <input type="email" className={style.input} /><span className={style.highlight}></span><span className={style.bar}></span>
            <label className={style.label}>Email</label>
          </div>
          <button type="button" className={`${style.button} ${style.buttonBlue}`}>Login
            <div className={`${style.ripples} ${style.buttonRipples}`}><span className={style.ripplesCircle}></span></div>
          </button>
        </form>
      </main>
    </div>
  );
}
