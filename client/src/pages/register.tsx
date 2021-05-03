import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import Axios from "axios";
import InputGroup from "../components/InputGroup";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState<any>(false);
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();
  const register = async (e: FormEvent) => {
    e.preventDefault();

    if (!agreement) {
      setErrors({ ...errors, agreement: "You must agree to T&Cs" });
      return;
    }

    try {
      await Axios.post("/auth/register", {
        email,
        password,
        username,
      });

      router.push("/login");
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  return (
    <div className='flex'>
      <Head>
        <title>Register</title>
        <meta name='description' content='Generated by create next app' />
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
              <small className='block font-medium text-red-600'>
                {errors.agreement}
              </small>
            </div>
            <InputGroup
              className='mb-2'
              type='email'
              value={email}
              setValue={setEmail}
              placeholder='EMAIL'
              error={errors.email}
            />
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
