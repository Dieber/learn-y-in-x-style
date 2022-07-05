import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-EJT8XG4364"
      ></Script>

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EJT8XG4364');
          `,
        }}
      ></Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
