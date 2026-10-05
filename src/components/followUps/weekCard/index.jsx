import { FiCalendar, FiPlus } from "react-icons/fi";
import { relativeDate } from "../../../utils/dates.js";
import styles from "./styles.module.css";
import classNames from "../../../utils/classNames.js";

const WeekCard = ({ thisWeek, upcoming, onAddContact }) => {
    return (
<article className={classNames(styles.root, styles["week-card"])}>
                        <div className={styles["week-card-top"]}>
                            <span className={styles["week-badge"]}>
                                <FiCalendar /> WEEKLY RHYTHM
                            </span>
                            <span className={styles["week-spark"]} aria-hidden="true">
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                            </span>
                        </div>
                        <div className={styles["week-count"]}>
                            {thisWeek}
                            <span>planned</span>
                        </div>
                        <p>
                            A good week starts with a small, thoughtful hello.
                        </p>
                        <div className={styles["week-bottom"]}>
                            <span>
                                <i /> Your next touch is{" "}
                                {upcoming[0]
                                    ? relativeDate(
                                          upcoming[0].nextFollowUp,
                                      ).toLowerCase()
                                    : "all set"}
                            </span>
                            <button
                                type="button"
                                onClick={onAddContact}
                                aria-label="Create a reminder"
                            >
                                <FiPlus />
                            </button>
                        </div>
                    </article>
    );
};

export default WeekCard;
