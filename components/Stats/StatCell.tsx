import React from 'react';
import styles from './StatCell.module.css';

interface StatCellProps {
    icon: string;
    label: string;
    value: number;
    unit: string;
}

const StatCell: React.FC<StatCellProps> = ({ icon, label, value, unit }) => {
    const renderUnit = () => {
        if (unit === 'WPM') {
            return (
                <span className={styles.unit} title="Words Per Minute">
                    {unit}
                </span>
            );
        }
        return <span className={styles.unit}>{unit}</span>;
    };

    return (
        <div className={styles.verticalContainer}>
            <p className={styles.label}>{label}</p>
            <div className={styles.horizontalContainer}>
                <img src={icon} alt={label} className={styles.icon} />
                <p>
                    <span className={styles.value}>{value}</span>
                    {renderUnit()}
                </p>
            </div>
        </div>
    );
};

export default StatCell;
