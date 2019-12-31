import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head';
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
// import { initStore } from "../store";
import withReduxStore from "../lib/persistStore";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const theme = {
  colors: {
    primary: '#2E576D',
    secondary: '#09B4A1'
  } 
}








class MyApp extends App {
  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
  }

  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    };
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
        <React.Fragment>
          <Head>
            <title>Service Link Guyana</title>
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossOrigin="anonymous"
            />
          </Head>

          <ThemeProvider theme={theme}>
            <Provider store={reduxStore}>
              <PersistGate
                loading={<Component {...pageProps} />}
                persistor={this.persistor}
              >
                <Component {...pageProps} />
              </PersistGate>
            </Provider>
    </ThemeProvider>
  </React.Fragment>  

            
    );
  }
}

export default withReduxStore(MyApp);

































// export default withRedux(initStore)(
//   class MyApp extends App {
//     static async getInitialProps({ Component, ctx }) {
//       return {
//         pageProps: Component.getInitialProps
//           ? await Component.getInitialProps(ctx)
//           : {}
//       };
//     }

//     render() {
//       const { Component, pageProps, store } = this.props;
//       return (
//         <React.Fragment>
//           <Head>
//             <title>Service Link Guyana</title>
//             <link
//               rel="stylesheet"
//               href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
//               integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
//               crossOrigin="anonymous"
//             />
//           </Head>

//           <ThemeProvider theme={theme}>
//             <Provider store={store}>
//               <Component {...pageProps} />
//             </Provider>
//           </ThemeProvider>

//         </React.Fragment>
//       );
//     }
//   }
// );