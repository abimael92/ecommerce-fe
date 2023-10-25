import Link from 'next/link';
import { Container, Button, Header } from 'semantic-ui-react'; // Import Semantic UI components
import { JoinLayout } from '@/layouts'; // Import JoinLayout

// Define your styles here or include a CSS file
const contentStyle = {
  maxWidth: '480px',
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '12rem 0',
};

export default function Page403() {
  return (
    <JoinLayout title="403 Forbidden">
      <Container>
        <div style={contentStyle}>
          <Header as="h3" style={{ marginBottom: '1rem' }}>
            No permission
          </Header>

          <p style={{ color: 'grey' }}>
            The page you're trying to access has restricted access.
            <br />
            Please refer to your system administrator.
          </p>

          <Link href="/" passHref>
            <Button size="large" primary>
              Go to Home
            </Button>
          </Link>
        </div>
      </Container>
    </JoinLayout>
  );
}
