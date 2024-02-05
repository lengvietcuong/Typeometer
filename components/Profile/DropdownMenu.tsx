import React from 'react';
import Link from 'next/link';
import { logOut } from '@/lib/authentication';
import styles from './DropdownMenu.module.css';

const DropdownMenu: React.FC = () => {
	return (
		<div className={styles.dropdownMenu}>
			<Link href="/texts" className={styles.menuItem}>
				<img
					src="/manage-texts.svg"
					alt="Manage Texts"
					className={styles.menuItemIcon}
				/>
				Texts
			</Link>
			<button className={styles.menuItem} onClick={logOut}>
				<img
					src="/log-out.svg"
					alt="Log Out"
					className={styles.menuItemIcon}
				/>
				Log Out
			</button>
		</div>
	);
};

export default DropdownMenu;