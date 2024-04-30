import Head from 'next/head';

export function Seo(props) {
  const {
    title = 'Gaming - Your Favorite Games',
    description = 'Your favorite games for Steam, PlayStation, Xbox, Switch at the best price.',
  } = props;

  return (
    <Head>
      <link rel="icon" href="/public/favicon-16x16.png" />
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}
