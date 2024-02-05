import React from "react";
import { User } from "firebase/auth";
import styles from "./ProfileBadge.module.css";

interface ProfileBadgeProps {
    user: User | null;
    onClick: () => void;
}

const ProfileBadge: React.FC<ProfileBadgeProps> = ({ user, onClick }) => {
    return (
        <button
            className={styles.profileBadge}
            onClick={onClick}
        >
            <img
                src="/profile.svg"
                alt="Profile"
            />
            {!user &&<span>Sign in</span>}
        </button>
    );
};

export default ProfileBadge;