import React from "react";
import styles from "./page.module.css";
import AddText from "@/components/Texts/AddText";
import RemoveText from "@/components/Texts/RemoveText";
import BackButton from "@/components/Buttons/BackButton";

const TextsManager: React.FC = () => {
    return (
        <>
            <BackButton />
            <div className={styles.textsManagerContainer}>
                <AddText />
                <RemoveText />
            </div>
        </>
    )
};

export default TextsManager;