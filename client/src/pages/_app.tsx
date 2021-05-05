import Axios from "axios";
import { useRouter } from "next/router";
import { Fragment } from "react";

import Navbar from "../components/Navbar";

import "../styles/tailwind.css";
import "../styles/icons.css";

Axios.defaults.baseURL = "http://localhost:5000/api";
Axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);

  return (
    <Fragment>
      {!authRoute && <Navbar />}
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
