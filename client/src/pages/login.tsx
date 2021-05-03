import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import Axios from "axios";
import InputGroup from "../components/InputGroup";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();
  const login = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await Axios.post("/auth/login", {
        password,
        username,
      });

      router.push("/");
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  return (
    <div className='flex bg-white'>
      <Head>
        <title>Login</title>
        <meta name='description' content='Generated by create next app' />
      </Head>

      <div
        className='h-screen bg-center bg-cover w-36'
        style={{ backgroundImage: "url('/images/textures.jpg')" }}
      ></div>
      <div className='flex flex-col justify-center pl-6 '>
        <div className='w-70'>
          <h1 className='mb-2 text-lg font-medium'>Login</h1>
          <p className='mb-8 text-xs'>
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
          <form onSubmit={login}>
            <InputGroup
              className='mb-2'
              type='text'
              value={username}
              setValue={setUsername}
              placeholder='USERNAME'
              error={errors.username}
            />
            <InputGroup
              className='mb-4'
              type='password'
              value={password}
              setValue={setPassword}
              placeholder='PASSWORD'
              error={errors.password}
            />
            <button
              type='submit'
              className='w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded'
            >
              Login
            </button>
          </form>
          <small>
            New to Readit?
            <Link href='/register'>
              <a className='ml-1 text-blue-500 uppercase'>Sing Up</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
