import { Icon, Image } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import styles from './JoinLayout.module.scss';

export function JoinLayout(props) {
	const { children } = props;
	const { user } = useAuth();
	const router = useRouter();

	if (user) {
		router.push('/');
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.topBar}>
				<Link href='/'>
					<div>
						{' '}
						<Image src='/images/logo.png' alt='Game' />
						<Image src='/images/gaming.png' alt='Gaming' />
					</div>
				</Link>

				<Link href='/'>
					<Icon name='close' />
				</Link>
			</div>

			<div className={styles.blockLeft}>{children}</div>

			<div className={styles.blockRight} />
		</div>
	);
}
