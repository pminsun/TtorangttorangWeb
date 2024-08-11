import Head from 'next/head';

export default function Seo() {
  return (
    <Head>
      <title>또랑또랑</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
      />
      <meta
        name="author"
        content="발표명장"
      />
      <meta
        name="description"
        content="또랑또랑 AI 발표 도우미"
      />
      <meta
        property="og:title"
        content="또랑또랑"
      />
      <meta
        property="og:site_name"
        content="또랑또랑"
      />
      <meta
        property="og:description"
        content="또랑또랑 AI 발표 도우미"
      />
      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:url"
        content="https://www.ttorang.site/"
      />
      <link
        rel="icon"
        href="/images/favicon.ico"
      />
    </Head>
  );
}
