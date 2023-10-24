import Head from 'next/head';

export function Seo(props) {
  const {
    title = 'Gaming - Your favorite games',
    description = 'Your favorite games for Steam, PlayStation, Xbox, and Switch at the best prices.',
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}
