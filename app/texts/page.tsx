import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import AddText from "@/components/Texts/AddText";
import RemoveText from "@/components/Texts/RemoveText";

const TextsManager: React.FC = () => {
    return (
        <>
            <Link className="backButton" href="/">&#x2b05;</Link>
            <div className={styles.textsManagerContainer}>
                <AddText />
                <RemoveText />
            </div>
        </>
    )
};

export default TextsManager;