import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>또랑또랑</title>
        <meta
          name="description"
          content="또랑또랑 AI 발표 도우미"
        />
        <link
          rel="icon"
          href="/images/favicon.ico"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
