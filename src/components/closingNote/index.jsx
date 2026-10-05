import { FiHeart } from "react-icons/fi";
import styles from "./styles.module.css";
import classNames from "../../utils/classNames.js";

const ClosingNote = () => {
    return (
                <div className={classNames(styles.root, styles["closing-note"])}>
                    <span className={styles["closing-icon"]}>
                        <FiHeart />
                    </span>
                    <p>
                        Good relationships are built in the little moments.{" "}
                        <strong>Keep showing up.</strong>
                    </p>
                    <span className={styles["closing-stamp"]}>
                        KINFIELD NOTES <i>{"\u2733"}</i> NO. 01
                    </span>
                </div>
    );
};

export default ClosingNote;
