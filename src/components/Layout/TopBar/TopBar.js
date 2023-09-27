import { Image } from 'semantic-ui-react';
import Link from 'next/link';
import { Account } from '../Account';
import { Menu } from '../Menu';
import styles from './TopBar.module.scss';

export function TopBar(props) {
	const { isOpenSearch } = props;

	return (
		<div className={styles.topBar}>
			<div className={styles.left}>
				<Link href='/'>
					<div className={styles.imageContainer}>
						<div className={styles.imageWrapper}>
							<Image
								src='/images/logo.png'
								alt='Game'
								height={50}
							/>
						</div>
						<div className={styles.imageWrapper}>
							<Image src='/images/gaming.png' alt='gaming' />
						</div>
					</div>
				</Link>
			</div>

			<div className={styles.center}>
				<Menu isOpenSearch={isOpenSearch} />
			</div>

			<div className={styles.right}>
				<Account />
			</div>
		</div>
	);
}
