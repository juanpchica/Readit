import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import useSWR from "swr";
import { PostCard } from "../../components/PostCard";

function Sub() {
  const router = useRouter();
  const subName = router.query.sub;

  //Fetching data from server
  const { data: sub, error } = useSWR(subName ? "/subs/" + subName : null);

  //If error then redirect to home page
  if (error) router.push("/");

  let postsMarkup;
  if (!sub) {
    postsMarkup = <p className='text-lg text-center'>Loading..</p>;
  } else if (sub.posts.length === 0) {
    postsMarkup = <p className='text-lg text-center'>No posts submitted yet</p>;
  } else {
    postsMarkup = sub.posts.map((post) => (
      <PostCard key={post.identifier} post={post} />
    ));
  }

  return (
    <Fragment>
      <Head>{sub && <title>{sub.title}...</title>}</Head>
      <div className='container flex pt-5'>
        <div className='w-160'>{postsMarkup}</div>
      </div>
    </Fragment>
  );
}

export default Sub;
