import Layout from '@/components/Layout';
import '@/styles/globals.css';
import '@/styles/main.css';
import '@/styles/gateway.css';
import '@/styles/saveqa.css';
import '@/styles/fonts/notoSansKR.css';
import '@/styles/fonts/tmoneyRoundWind.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  );
}
