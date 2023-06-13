import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from '@/styles/globalStyle';
import Head from 'next/head';
import AppLayout from '@/components/layout/AppLayout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <Head>
          <title>One-Line</title>
          <meta charSet="utf-8" name="description" content="One-Line" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </RecoilRoot>
    </>
  );
}
