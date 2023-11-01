import { Container, Button, Header, Image } from 'semantic-ui-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../layouts';
import Page from '../components/Page';
import { MotionContainer, varBounce } from '../components/animate';
import { ForbiddenIllustration } from '../assets';

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

Page403.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

export default function Page403() {
  return (
    <Page title="403 Forbidden">
      <Container as={MotionContainer}>
        <div style={ContentStyle}>
          <motion.div variants={varBounce().in}>
            <Header as="h3" content="No permission" />
          </motion.div>

          <motion.div variants={varBounce().in}>
            <p style={{ color: 'grey' }}>
              The page you're trying to access has restricted access.
              <br />
              Please refer to your system administrator.
            </p>
          </motion.div>

          <motion.div variants={varBounce().in}>
            <ForbiddenIllustration style={{ height: 260, margin: '5em 0' }} />
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
