import Layout from '@/components/Layout';
import '@/styles/globals.css';
import '@/styles/main.css';
import '@/styles/fonts/notoSansKR.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
