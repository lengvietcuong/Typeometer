import React from 'react';
import Link from "next/link"
import styles from './BackButton.module.css';

const BackButton: React.FC = () => {
    return (
        <Link className={styles.backButton} href="/">&#x2b05;</Link>
    );
};

export default BackButton;
