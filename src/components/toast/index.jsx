import { FiCheck } from "react-icons/fi";
import styles from "./styles.module.css";
import classNames from "../../utils/classNames.js";

const Toast = ({ message }) => {
    return (
        <div className={classNames(styles.root, styles["toast-message"])} role="status">
            <span>
                <FiCheck />
            </span>
            {message}
        </div>
    );
};

export default Toast;
