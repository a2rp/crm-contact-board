import { FiCalendar, FiPlus } from "react-icons/fi";
import { relativeDate } from "../../../utils/dates.js";
import styles from "./styles.module.css";

const WeekCard = ({ thisWeek, upcoming, onAddContact }) => {
    return (
<article className={`${styles.root} week-card`}>
                        <div className="week-card-top">
                            <span className="week-badge">
                                <FiCalendar /> WEEKLY RHYTHM
                            </span>
                            <span className="week-spark" aria-hidden="true">
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                            </span>
                        </div>
                        <div className="week-count">
                            {thisWeek}
                            <span>planned</span>
                        </div>
                        <p>
                            A good week starts with a small, thoughtful hello.
                        </p>
                        <div className="week-bottom">
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
