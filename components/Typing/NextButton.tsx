import React from 'react';
import styles from './NextButton.module.css';

interface NextButtonProps {
    onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
    return (
        <button
            className={styles.nextButton}
            onClick={onClick}>
            Next &gt;
        </button>
    );
};

export default NextButton;
