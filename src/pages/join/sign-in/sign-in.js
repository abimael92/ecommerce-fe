import Link from 'next/link'
import { JoinLayout } from '@/layouts'
import { LoginForm } from '@/components/Auth'
import { Seo } from '@/components/Shared'
import styles from './sign-in.module.scss'

export default function SignInPage() {
  return (
    <>
      <Seo title="Login" />

      <JoinLayout>
        <div className={styles.signIn}>
          <h3>Sign In</h3>
          <LoginForm />

          <div className={styles.actions}>
            Don't have an account?{' '}
            <Link href="/join/sign-up" legacyBehavior>
              <a className={styles.link}>Sign Up</a>
            </Link>
          </div>
        </div>
      </JoinLayout>
    </>
  )
}
