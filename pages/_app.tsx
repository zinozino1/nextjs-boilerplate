import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import AppLayout from "../src/components/layout/AppLayout";
import { store } from "../src/store";
import "../src/style/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
}

export default MyApp;
