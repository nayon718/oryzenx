import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import '@/styles/globals.css';
import Loading from '@/components/shared/Loading';
import { AuthProvider } from '@/contexts/AuthContext';

function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);

    // Router events would be imported from next/router
    // router.events.on('routeChangeStart', handleStart);
    // router.events.on('routeChangeComplete', handleStop);
    // router.events.on('routeChangeError', handleStop);

    return () => {
      // router.events.off('routeChangeStart', handleStart);
      // router.events.off('routeChangeComplete', handleStop);
      // router.events.off('routeChangeError', handleStop);
    };
  }, []);

  return (
    <AuthProvider>
      {isLoading && <Loading />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
