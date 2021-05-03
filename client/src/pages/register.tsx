import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";

import Axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState<any>(false);

  const register = async (e: FormEvent) => {
    e.preventDefault();

    console.log(email, username, password, agreement);
    try {
      const res = await Axios.post("/auth/register", {
        email,
        password,
        username,
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex'>
      <Head>
        <title>Register</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div
        className='h-screen bg-center bg-cover w-36'
        style={{ backgroundImage: "url('/images/textures.jpg')" }}
      ></div>
      <div className='flex flex-col justify-center pl-6 '>
        <div className='w-70'>
          <h1 className='mb-2 text-lg font-medium'>Sing Up</h1>
          <p className='mb-8 text-xs'>
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
          <form onSubmit={register}>
            <div className='mb-6'>
              <input
                type='checkbox'
                className='mr-1 cursor-pointer'
                id='agreement'
                checked={agreement}
                onChange={() => {
                  setAgreement(!agreement);
                }}
              />
              <label htmlFor='agreement' className='text-xs cursor-pointer'>
                I agree to get emails about cool stuff on Readit
              </label>
            </div>
            <div className='mb-2'>
              <input
                type='email'
                className='w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <input
                type='text'
                className='w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <input
                type='password'
                className='w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded'
            >
              Sign Up
            </button>
          </form>
          <small>
            Already a readitor?
            <Link href='/login'>
              <a className='ml-1 text-blue-500 uppercase'>Log In</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
