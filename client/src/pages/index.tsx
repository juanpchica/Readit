import Head from "next/head";
import styles from "../styles/Home.module.css";

import logo from "../../public/images/logo.svg";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>

      <div className='fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12'>
        {/** Logo and title */}
        {/** Search  */}
        {/** Auth buttons */}
      </div>
    </div>
  );
}
