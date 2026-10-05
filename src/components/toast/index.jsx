import { FiCheck } from "react-icons/fi";
import styles from "./styles.module.css";

const Toast = ({ message }) => {
    return (
        <div className={styles["toast-message"]} role="status">
            <span>
                <FiCheck />
            </span>
            {message}
        </div>
    );
};

export default Toast;
