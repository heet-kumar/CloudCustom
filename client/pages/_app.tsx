import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { useEffect } from "react";
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const root = router.asPath;

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return(
    <div >
      <Header />
      <div className='d-flex'>
        {
            (root==='/' || root=='/signup')? <></>:<Sidebar />
        }
        <Component {...pageProps} />
      </div>
    </div>
  );
}
