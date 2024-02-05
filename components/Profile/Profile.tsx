import React, { useState, useEffect, useRef } from 'react';
import ProfileBadge from './ProfileBadge';
import DropdownMenu from './DropdownMenu';
import { signInWithGoogle } from '@/lib/authentication';
import { auth } from '@/lib/firebase';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
    const user = auth.currentUser;
    const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
    const profileRef = useRef<HTMLDivElement>(null);

    const handleProfileClick = () => {
        if (user) setShowDropdownMenu(!showDropdownMenu);
        else {
            signInWithGoogle();
        }
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (
            profileRef.current &&
            !profileRef.current.contains(event.target as Node)
        ) {
            setShowDropdownMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <>
            <div ref={profileRef} className={styles.profile}>
                <ProfileBadge user={user} onClick={handleProfileClick} />
                {user && showDropdownMenu && <DropdownMenu />}
            </div>
        </>
    );
};

export default Profile;
