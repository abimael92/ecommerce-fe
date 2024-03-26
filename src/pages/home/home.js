import { default as LandingPageGuest } from '@/pages/landing/guest/landing-guest';
import LandingUserPage from '@/pages/landing/user/landing-user';
import { useAuth } from '@/hooks';

export default function HomePage() {
  const { user } = useAuth();

  if (user) {
    return <LandingUserPage />;
  } else {
    return <LandingPageGuest />;
  }
}
