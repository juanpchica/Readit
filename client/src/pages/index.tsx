import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Post } from "../types";
import { PostCard } from "../components/PostCard";
import useSWR from "swr";
dayjs.extend(relativeTime);

export default function Home() {
  const { data: posts } = useSWR("/posts");

  return (
    <div className='pt-12'>
      <Head>
        <title>readit: the front page of the internet</title>
      </Head>
      <div className='container flex pt-4'>
        {/* Posts feed */}
        <div className='w-160'>
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
        {/* Sidebar */}
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await Axios.get('/posts')

//     return { props: { posts: res.data } }
//   } catch (err) {
//     return { props: { error: 'Something went wrong' } }
//   }
// }
