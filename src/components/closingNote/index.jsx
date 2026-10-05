import { FiHeart } from "react-icons/fi";
import styles from "./styles.module.css";

const ClosingNote = () => {
    return (
                <div className={`${styles.root} closing-note`}>
                    <span className="closing-icon">
                        <FiHeart />
                    </span>
                    <p>
                        Good relationships are built in the little moments.{" "}
                        <strong>Keep showing up.</strong>
                    </p>
                    <span className="closing-stamp">
                        KINFIELD NOTES <i>{"\u2733"}</i> NO. 01
                    </span>
                </div>
    );
};

export default ClosingNote;
