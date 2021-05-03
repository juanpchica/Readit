import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

import Post from "../types";

export default function Home() {
  const [posts, setPots] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        setPots(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div className='container'></div>
    </div>
  );
}
