import Axios from "axios";
import { useRouter } from "next/router";
import { Fragment } from "react";

import Navbar from "../components/Navbar";

import "../styles/tailwind.css";
import "../styles/icons.css";
import { AuthProvider } from "../context/Auth";

Axios.defaults.baseURL = "http://localhost:5000/api";
Axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);

  return (
    <AuthProvider>
      {!authRoute && <Navbar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
