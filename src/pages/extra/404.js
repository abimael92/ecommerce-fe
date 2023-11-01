import { Container, Button, Header, Image } from 'semantic-ui-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../layouts';
import Page from '../components/Page';
import { MotionContainer, varBounce } from '../components/animate';
import { PageNotFoundIllustration } from '../assets';

// Semantic UI doesn't use 'styled' like Material UI
const ContentStyle = {
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '12em 0',
  textAlign: 'center',
};

Page404.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

export default function Page404() {
  return (
    <Page title="404 Page Not Found">
      <Container as={MotionContainer}>
        <div style={ContentStyle}>
          <motion.div variants={varBounce().in}>
            <Header as="h3" content="Sorry, page not found!" />
          </motion.div>

          <motion.div variants={varBounce().in}>
            <p style={{ color: 'grey' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
              Be sure to check your spelling.
            </p>
          </motion.div>

          <motion.div variants={varBounce().in}>
            <Image as={PageNotFoundIllustration} style={{ height: 260, margin: '5em 0' }} />
          </motion.div>

          <Link href="/" passHref>
            <Button size="large" color="blue">
              Go to Home
            </Button>
          </Link>
        </div>
      </Container>
    </Page>
  );
}
