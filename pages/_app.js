import "../styles/globals.css";

import Error from "next/error";

function MyApp({ Component, pageProps }) {
  if (pageProps.error) {
    return (
      <Error title={pageProps.error} statusCode={pageProps.statusCode || 500} />
    );
  }
  return <Component {...pageProps} />;
}

export default MyApp;
