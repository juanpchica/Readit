import Axios from "axios";
import "../styles/globals.css";

Axios.defaults.baseURL = "http://localhost:5000/api";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
