import Notifications from '@components/Notification/Notifications';
import Layout from '@/src/components/Layout';
import SEO from '@config/seo.config';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/src/redux/store';
import '@styles/globals.css'


function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <DefaultSeo
        {...SEO}
      />
      <Notifications />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default appWithTranslation(App)
