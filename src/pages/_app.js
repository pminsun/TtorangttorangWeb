import Layout from '@/components/Layout';
import '@/styles/globals.css';
import '@/styles/main.css';
import '@/styles/gateway.css';
import '@/styles/fonts/notoSansKR.css';
import '@/styles/fonts/tmoneyRoundWind.css';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
