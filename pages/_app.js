import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head';

const theme = {
  colors: {
    primary: '#2E576D',
    secondary: '#09B4A1'
  } 
}

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <React.Fragment>
       <Head>
          <title>My page</title>
                <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
        />
        </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      </React.Fragment>

    )
  }
}