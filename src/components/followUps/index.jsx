import { FiArrowUpRight, FiChevronDown } from "react-icons/fi";
import FollowUpItem from "./followUpItem/index.jsx";
import WeekCard from "./weekCard/index.jsx";
import styles from "./styles.module.css";
import appStyles from "../../App.module.css";

const FollowUps = ({ upcoming, thisWeek, onOpenContact, onMarkDone, onToast, onNavChange, onAddContact }) => {
    return (
                <section className={styles["bottom-grid"]} id="follow-ups">
                    <article className={styles["followup-panel"]}>
                        <div className={styles["panel-heading"]}>
                            <div>
                                <div className={appStyles["eyebrow"]}>
                                    MAKE THE NEXT MOVE
                                </div>
                                <h2>
                                    Coming up
                                    <span className={appStyles["heading-period"]}>.</span>
                                </h2>
                            </div>
                            <button
                                type="button"
                                className={styles["text-button"]}
                                onClick={() =>
                                    onToast(
                                        `${thisWeek} follow-ups are scheduled this week`,
                                    )
                                }
                            >
                                This week <FiChevronDown />
                            </button>
                        </div>
                        <div className={styles["followup-list"]}>
                            {upcoming.map((contact) => (
                                <FollowUpItem
                                    key={contact.id}
                                    contact={contact}
                                    onOpenContact={onOpenContact}
                                    onMarkDone={onMarkDone}
                                />
                            ))}
                        </div>
                        <a
                            className={styles["panel-footer-link"]}
                            href="#contacts"
                            onClick={() => onNavChange("contacts")}
                        >
                            See everyone on your board <FiArrowUpRight />
                        </a>
                    </article>
                    <WeekCard thisWeek={thisWeek} upcoming={upcoming} onAddContact={onAddContact} />
                </section>
    );
};

export default FollowUps;
