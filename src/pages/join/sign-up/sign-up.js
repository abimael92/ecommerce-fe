import Link from 'next/link';
import { JoinLayout } from '@/layouts';
import { RegisterForm } from '@/components/Auth';
import { Seo } from '@/components/Shared';
import styles from './sign-up.module.scss';

export default function SignUpPage() {
  return (
    <>
      <Seo title="Register" />

      <JoinLayout>
        <div className={styles.signIn}>
          <h3>Sign up</h3>
          <RegisterForm />

          <div className={styles.actions}>
            <Link href="/join/sign-in">Back</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
