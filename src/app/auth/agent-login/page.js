import Link from "next/link";
import { FaHome } from "react-icons/fa";
import styles from "@/styles/pages/authpage.module.css";
import AgentLoginClient from "./AgnetLoinClient"; // Import the client-side logic

function AgentLogin({ setAgentLogin }) {
    return (
        <div className={styles.agentLogin}>
            <div className={styles.loginBlur}>
                <div className={`${styles.loginContainer} ${styles.activeCon}`}>
                    <div className={styles.loginCard}>
                        <Link className={styles.backToWeb} href="/">
                            <FaHome />&nbsp;
                            <span className={styles.tooltipText}>Home</span>
                        </Link>
                        <h2 className={styles.loginTitle}>Agent Login</h2>
                        {/* Client-specific logic is passed to the client component */}
                        <AgentLoginClient setAgentLogin={setAgentLogin} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgentLogin;
